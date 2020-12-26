<script>
  import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "sveltestrap";
  import filterStore from "@src/stores/filters.js";
  import FilterIcon from "@src/icons/filter.svelte";

  const filterConfig = {
    ordering: {
      key: "o",
      header: "ordering(desc)",
      defaultValue: "mr",
      options: [
        { label: "last viewed", value: "bw" },
        { label: "latest", value: "mr" },
        { label: "most viewed", value: "mv" },
        { label: "top rated", value: "tr" },
        { label: "most favoured", value: "tf" },
        { label: "longest", value: "lg" },
      ],
    },
    time: {
      key: "t",
      header: "time frame",
      defaultValue: "a",
      options: [
        { label: "1 day", value: "t" },
        { label: "1 week", value: "w" },
        { label: "1 month", value: "m" },
        { label: "forever", value: "a" },
      ],
    },
  };

  let dropdownOpen = false;
  function onChange(key, val) {
    filterStore.updateFilterValue({ [key]: val });
    window.document
      .getElementsByTagName("svelte-virtual-list-viewport")[0]
      .scroll(0, 0);
  }

  function toggle() {
    dropdownOpen = !dropdownOpen;
  }
</script>

<style>
</style>

<Dropdown size="sm" isOpen={dropdownOpen} {toggle}>
  <DropdownToggle caret>
    <div class="inline-block">
      <FilterIcon size={16} />
    </div>
  </DropdownToggle>
  <DropdownMenu>
    {#each Object.keys(filterConfig) as key (key)}
      <DropdownItem header>{filterConfig[key].header}</DropdownItem>
      {#each filterConfig[key].options as option (option.label)}
        <DropdownItem
          active={$filterStore[filterConfig[key].key] === option.value}
          on:click={() => onChange(filterConfig[key].key, option.value)}>
          {option.label}
        </DropdownItem>
      {/each}
    {/each}
  </DropdownMenu>
</Dropdown>
