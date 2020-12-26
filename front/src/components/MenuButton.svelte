<script>
  import MenuIcon from '@src/icons/menu.svelte'
  import menuStore from '@src/stores/menu.js'
  function open() {
    menuStore.showMenu()
  }
</script>

<style>
  /* your styles go here */
</style>

<div class="fixed sm:hidden bottom-10 right-10 bg-gray-300 rounded p-2 cursor-pointer" on:click={open}>
  <MenuIcon size="24"/>
</div>
