import { writable } from 'svelte/store';
import firebase from "firebase/app";

const store = () => {
  const state = {
    favorites: [],
    favoritesSet: new Set()
  }
  const { subscribe, set, update } = writable(state)

  const methods = {
    init() {
      set({ ...state })
    },
    setFavorites(favs) {
      set({
        favorites: favs,
        favoritesSet: new Set(favs.map((video) => video.vid))
      })
    },
    async fetchFavorites() {
      return firebase
        .database()
        .ref("movies")
        .once("value", (snap) => {
          const videos = snap.val();
          const favorites = Object.keys(videos)
            .reverse()
            .map((key) => ({ ...videos[key], saved: true, saveId: key }));
          this.setFavorites(favorites)
        });
    }
  }
  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store()
