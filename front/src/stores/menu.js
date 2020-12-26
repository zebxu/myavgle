import { writable } from 'svelte/store';
const menu = writable(false);

const showMenu = () => menu.set(true)
const closeMenu = () => menu.set(false)

export default { ...menu, showMenu, closeMenu}
