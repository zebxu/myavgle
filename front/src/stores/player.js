import { writable } from 'svelte/store';

const store = () => {
  const state = {
    showModal: false,
    videoUrl: ''
  }
  const { subscribe, set, update } = writable(state)

  const methods = {
    init () {
			set({ ...state })
    },
    openModal(url) {
      update(state => {
        state.showModal = true
        state.videoUrl = url
        return state
      })
    },
    closeModal() {
      set({...state})
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
