import { defineStore, acceptHMRUpdate } from 'pinia';
import evntsData from 'src/assets/work-task-test.json';
import type { EventEntry, FilterEntry } from './entities';
import { generateEventPool } from './utils';

const evnts = generateEventPool((<unknown>evntsData) as EventEntry[]);

export const useEventsStore = defineStore('events', {
  state: () => ({
    origEvents: evnts,
    filteredEvents: evnts,
    searchText: '',
    dateRange: <{ from: string; to: string }>(<unknown>null),
    filterList: generateFilter(evnts),
  }),

  getters: {},

  actions: {
    filter() {
      this.filteredEvents = this.origEvents.filter((event) =>
        event.json.includes(this.searchText.toLocaleLowerCase()),
      );
      if (this.dateRange != null)
        this.filteredEvents = this.filteredEvents.filter(
          (event) =>
            event.dt >= Date.parse(this.dateRange.from) &&
            event.dt <= Date.parse(this.dateRange.to),
        );
      //this.filterList = generateFilter(this.filteredEvents);
    },
    filter2(searchTerms: string[]) {
      this.filteredEvents = this.origEvents.filter((event) =>
        searchTerms.some((substring) => event.json.includes(substring.toLocaleLowerCase())),
      );
      if (this.dateRange != null)
        this.filteredEvents = this.filteredEvents.filter(
          (event) =>
            event.dt >= Date.parse(this.dateRange.from) &&
            event.dt <= Date.parse(this.dateRange.to),
        );
      //this.filterList = generateFilter(this.filteredEvents);
    },
  },
});

function generateFilter(events: EventEntry[]) {
  const filter: FilterEntry = {
    event: [],
    date: [],
    dt: [],
  };

  events.forEach((event) => {
    filter.event.push(event.event);
    filter.date.push(event.date);
    filter.dt.push(event.dt);
  });

  filter.event = [...new Set(filter.event)];
  filter.date = [...new Set(filter.date)];
  filter.dt = [...new Set(filter.dt)];

  return filter;
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
