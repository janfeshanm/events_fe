import { defineStore, acceptHMRUpdate } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    counter: 0,
  }),

  getters: {},

  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
