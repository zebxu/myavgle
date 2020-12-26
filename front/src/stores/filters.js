import { writable } from 'svelte/store';

const store = () => {
  const initState = {
    o: "mr",
    t: "a",
    limit: 100
  }

  const { subscribe, set, update } = writable(initState)

  const methods = {
    init() {
      set({ ...initState })
    },

    updateFilterValue(obj) {
      update(state => {
        Object.keys(state).forEach((key) => {
          if (obj[key]) state[key] = obj[key]
        })
        return state
      })
    },
  }

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store()