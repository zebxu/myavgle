<script>
  import playerStore from "@src/stores/player.js";
</script>

<style>
</style>

<div
  class="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-90"
  on:click|self={() => {
    playerStore.closeModal();
  }}
  hidden={!$playerStore.showModal}>
  <iframe
    title=""
    class="w-9/12 h-1/2"
    src={$playerStore.videoUrl}
    allowfullscreen
    referrerpolicy="origin" />
</div>
