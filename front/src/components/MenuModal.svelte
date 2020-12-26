<script>
  import DownIcon from "@src/icons/chevron-down.svelte";
  import { fly } from "svelte/transition";
  import menuList from "@src/config/menu.js";
  import menuStore from "@src/stores/menu.js";
  import router from "page";

  const linkTo = (route) => {
    router(route);
    window.document
      .getElementsByTagName("svelte-virtual-list-viewport")[0]
      .scroll(0, 0);
  };

  function close() {
    menuStore.closeMenu();
  }
</script>

<style>
  /* your styles go here */
</style>

{#if $menuStore}
  <div class="fixed top-0 left-0 w-full h-full">
    <div on:click|self={close} class="opacity-90 bg-gray-800 w-full h-full" />
    <div
      transition:fly={{ y: 200, duration: 400, opacity: 1 }}
      class="fixed bottom-0 left-0 w-full flex flex-col z-10 bg-gray-900 pb-10 pt-4 px-4 text-gray-100">
      {#each menuList as menuItem (menuItem.value)}
        <button
          class="bg-gray-600 rounded p-2 hover:text-pink-400 mb-2"
          on:click={() => {
            linkTo(`/${menuItem.value}`);
            close();
          }}>{menuItem.label}</button>
      {/each}
      <button class="p-2 hover:text-pink-400" on:click={close}>
        <div class="inline-block">
          <DownIcon />
        </div>
      </button>
    </div>
  </div>
{/if}
