<script>
  import router from "page";
  import Navbar from "./Navbar.svelte";
  import VideoList from "./VideoList.svelte";
  import VideoPlayer from "./VideoPlayer.svelte";
  import playerStore from "@src/stores/player.js";
  import MenuModal from "./MenuModal.svelte";
  import MenuButton from "./MenuButton.svelte";

  let page;
  let keyword = "";
  let isFavorite = false;
  router(
    "/",
    (ctx, next) => {
      keyword = "";
      isFavorite = false;
      next();
    },
    () => (page = VideoList)
  );
  router(
    "/fav",
    (ctx, next) => {
      isFavorite = true;
      next();
    },
    () => (page = VideoList)
  );
  router("/search", () => (page = VideoList));
  router(
    "/cn",
    (ctx, next) => {
      isFavorite = false;
      keyword = encodeURI("中文字幕");
      next();
    },
    () => (page = VideoList)
  );
  router(
    "/search/:keyword",
    (ctx, next) => {
      isFavorite = false;
      keyword = ctx.params.keyword;
      next();
    },
    () => (page = VideoList)
  );

  router.start();

  playerStore.init();
</script>

<style>
  /* your styles go here */
</style>

<div class="bg-gray-800 relative min-h-full">
  <Navbar />
  <svelte:component this={page} searchKeyword={keyword} {isFavorite} />
  <VideoPlayer />
  <MenuButton />
  <MenuModal />
  <!-- <Footer /> -->
</div>
