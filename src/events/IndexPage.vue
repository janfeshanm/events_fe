<template>
  <q-page @keydown.esc="sEvents?.focusSearchInput()">
    <q-header elevated>
      <q-toolbar
        ><q-btn flat round icon="arrow_back" @click="runCmnd" />
        <q-space />
        <div ref="div1"></div>
        <a-search-events
          ref="sEvents"
          v-model="searchContext"
          :shadow-text="shadowText"
          @update:date="onDateRangeChange"
          :filterList="eventsStore.filterList"
        />
        <q-space />
      </q-toolbar>
    </q-header>
    <div class="row">
      <event-item
        ref="itemRefs"
        v-for="event in eventsStore.filteredEvents"
        :key="event.event"
        :event="event"
        @eventFocused="onEventFocused(event)"
        @eventSelected="onEventSelected(event)"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEventsStore } from './events-store';
import EventItem from './components/EventItem.vue';
import ASearchEvents from './components/ASearchEvents.vue';
import type { QPopupProxy } from 'quasar';
import type { EventEntry } from './entities';

const sEvents = ref(<typeof ASearchEvents>(<unknown>null));
const eventsStore = useEventsStore();
const shadowText = ref('');
const searchContext = ref({ text: '', date: eventsStore.dateRange });
watch(
  searchContext,
  (newValue) => {
    eventsStore.searchText = newValue.text;
    filterFn(newValue.text);
    if (typeof newValue.date == 'string') {
      eventsStore.dateRange = { from: newValue.date, to: newValue.date };
    } else {
      eventsStore.dateRange = newValue.date;
    }
    eventsStore.filter();
  },
  { deep: true },
);

//const eiref = ref(new Map<EventEntry, typeof EventItem>());
const itemRefs = ref([]);

const ref1 = ref(<QPopupProxy>(<unknown>null));
function onDateRangeChange(newRange: { from: string; to: string }) {
  ref1.value.hide();
  if (typeof newRange == 'string') {
    eventsStore.dateRange = { from: newRange, to: newRange };
  } else {
    eventsStore.dateRange = newRange;
  }
  eventsStore.filter();
}

function filterFn(val: string) {
  const needle = val.toLocaleLowerCase();
  const ab = eventsStore.filterList.event.filter((v) => v.toLocaleLowerCase().indexOf(needle) == 0);
  shadowText.value = '';
  if (ab.length > 0 && ab[0] != undefined && val.length > 0)
    shadowText.value = ab[0].substring(val.length);
}

let counter = -1;
function runCmnd() {
  counter++;
  const element = <typeof EventItem>(<unknown>itemRefs.value[counter]);
  element.focusEvent();
}

function onEventFocused(event: EventEntry) {
  console.log('Event Focused ' + event.event);
}
function onEventSelected(event: EventEntry) {
  console.log('Event Selected ' + event.event);
}
</script>
