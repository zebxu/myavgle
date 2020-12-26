<script>
  import { Input, InputGroup, InputGroupAddon, Button } from "sveltestrap";
  import menuList from "@src/config/menu.js";
  import SearchIcon from "../icons/search.svelte";
  import Filter from "./Filter.svelte";
  import router from "page";

  let userInput = "";

  function search() {
    linkTo("/search/" + userInput);
  }

  const linkTo = (route) => {
    router(route);
    window.document
      .getElementsByTagName("svelte-virtual-list-viewport")[0]
      .scroll(0, 0);
  };

  function inputChange(event) {
    if (event?.code === "Enter") {
      search();
    }
  }
</script>

<style>
</style>

<div
  class="h-16 w-full flex justify-between items-center px-8 bg-gray-600 text-gray-200 sticky top-0 z-10">
  <div class="flex">
    <logo
      class="text-2xl text-pink-400 rounded p-2 cursor-pointer"
      on:click={() => linkTo('/')}>
      MyAvgle
    </logo>
    <div class="hidden sm:flex ml-4">
      {#each menuList as menuItem, i}
        <button
          class:mr-2={i !== menuList.length - 1}
          class=" hover:text-pink-400"
          on:click={() => linkTo(`/${menuItem.value}`)}>{menuItem.label}</button>
      {/each}
    </div>
  </div>
  <div class="w-40 flex sm:w-60">
    <div class="mr-2">
      <Filter />
    </div>
    <div class="flex-1">
      <InputGroup size="sm">
        <Input
          placeholder="搜索..."
          bind:value={userInput}
          on:keyup={inputChange} />
        <InputGroupAddon addonType="prepend">
          <Button on:click={search}>
            <SearchIcon size={16} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</div>
