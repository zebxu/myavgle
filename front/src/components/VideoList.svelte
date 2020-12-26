<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import "firebase/database";

  import Video from "./Video.svelte";
  import filterStore from "@src/stores/filters.js";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import favoritesStore from "@src/stores/favorites.js";

  export let searchKeyword;
  export let isFavorite;

  let videos = [];
  let data = [];
  let page = 0;
  let url;

  $: searchKeyword, getData($filterStore, $favoritesStore.favoritesSet);
  $: data = isFavorite ? $favoritesStore.favorites : videos;

  filterStore.init();
  favoritesStore.init();

  onMount(async () => {
    await favoritesStore.fetchFavorites();
  });

  async function getData(filters, favSet) {
    const queries = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join("&");
    url = `https://api.avgle.com/v1/videos/${page}?${queries}`;
    if (searchKeyword?.length) {
      url = `https://api.avgle.com/v1/search/${searchKeyword}/${page}?${queries}`;
    }
    const { data } = await axios.get(url);
    const videoWithSaved =
      data?.success === true &&
      data?.response?.videos.map((video) => ({
        ...video,
        saved: favSet.has(video.vid),
      }));
    videos = videoWithSaved ?? [];
  }
</script>

<div class="w-full" style="height: calc(100vh - 4rem);">
  <VirtualList id="virtual-list" itemHeight={488} items={data} let:item>
    <div class="mt-4 sm:px-24 md:px-40 w-full min-h-full bg-grey-200">
      <Video data={item} />
    </div>
  </VirtualList>
</div>
