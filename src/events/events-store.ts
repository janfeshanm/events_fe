import { defineStore, acceptHMRUpdate } from 'pinia';
import evntsData from 'src/assets/work-task-test.json';
import type { EventEntry } from './entities';
import { generateEventPool } from './utils';

const evnts = generateEventPool((<unknown>evntsData) as EventEntry[]);

export const useEventsStore = defineStore('events', {
  state: () => ({
    origEvents: evnts,
    filteredEvents: evnts,
  }),

  getters: {},

  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
