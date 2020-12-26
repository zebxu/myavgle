<script>
  import { formatDuration } from "@src/utils/tool.js";
  import { Spinner } from "sveltestrap";
  import playerStore from "@src/stores/player.js";
  import { onMount, tick } from "svelte";
  import router from "page";
  import LikeIcon from "@src/icons/heart.svelte";
  import firebase from "firebase/app";
  import favoritesStore from "@src/stores/favorites.js";

  export let data;

  let isSaving = false;
  const likeIconColor = data.saved ? "#999999" : "#F9FAFB";

  $: video = getVideoElem(data.preview_video_url);
  $: updatePreview(data);

  onMount(() => {
    updatePreview(data);
  });

  function openModal() {
    playerStore.openModal(data.embedded_url);
  }
  async function removeMovie(saved_id) {
    isSaving = true;
    try {
      await firebase
        .database()
        .ref("movies/" + saved_id)
        .remove()
        .then(() => {});
    } catch (e) {}
    isSaving = false;
    data.saved = false;
  }
  async function saveMovie(video) {
    isSaving = true;
    try {
      await firebase.database().ref("movies").push(video);
    } catch (err) {
      console.error(err);
    }
    isSaving = false;
    data.saved = true;
  }
  async function handleClick(video) {
    if (video.saved) {
      await removeMovie(video.saveId);
    } else {
      await saveMovie(video);
    }
    favoritesStore.fetchFavorites();
  }
  function getVideoElem(url) {
    const video = document.createElement("video");
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.style = "height:100%;width:100%;";
    return video;
  }
  async function updatePreview(data) {
    await tick();
    const container = document.getElementById(data.vid);
    if (container) {
      container.contentDocument.body.innerHTML = "";
      container.contentDocument.body.style =
        "background-color: black;margin:0;";
      container.contentDocument.body.appendChild(video);
      container.contentDocument.body
        .querySelector("video")
        .setAttribute("playsinline", true);
    }
  }
  function linkTo(route) {
    router(route);
    window.scrollTo(0, 0);
  }
</script>

<style>
  /* your styles go here */
</style>

<div class="flex flex-column text-gray-200 bg-gray-700 rounded">
  <video-preview class="relative">
    <iframe
      id={data.vid}
      src=""
      frameborder="0"
      scrolling="no"
      class="w-full h-80 rounded"
      onload="resizeIframe(this)" />
    <box-shadow
      class="w-full h-full absolute top-0 left-0"
      style="box-shadow: inset 0 -10px 30px 0px rgba(0,0,0,1);" />
    <overlay class="absolute right-4 bottom-2">
      <div class="duration">{formatDuration(data.duration, 1)}</div>
    </overlay>
  </video-preview>
  <div class="p-3">
    <div
      class="text-xl font-semibold cursor-pointer hover:text-pink-600"
      on:click={openModal}>
      {data.title}
    </div>
    <div class="flex flex-wrap mt-2 text-sm">
      {#each data.keyword.split(' ') as keyword}
        <span
          class="mr-2 active:bg-pink-700 hover:bg-pink-700 cursor-pointer rounded bg-pink-900 p-1 mb-2"
          on:click={() => linkTo(`/search/${keyword}`)}>{keyword}</span>
      {/each}
    </div>
    <footer class="flex justify-between">
      <div class="viewnumber">{data.viewnumber} views</div>
      <like-button
        class="h-10 w-10 rounded bg-gray-500 text-center"
        class:bg-pink-900={data.saved}>
        <button class="h-10" on:click={() => handleClick(data)}>
          {#if isSaving}
            <Spinner size="sm" color="light" />
          {:else}
            <LikeIcon
              size="20"
              strokeColor={likeIconColor}
              fillColor={likeIconColor} />
          {/if}
        </button>
      </like-button>
    </footer>
  </div>
</div>
