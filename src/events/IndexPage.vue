<template>
  <q-page class="row items-center justify-evenly">
    <q-header elevated>
      <q-toolbar>
        <q-space />
        <div ref="div1"></div>
        <q-input
          tabindex="1"
          :shadow-text="shadowText"
          dark
          debounce="10"
          label-color="white"
          v-model="text"
          label="Find Events"
          color="white"
        >
          <template v-slot:after>
            <q-btn icon="event" flat color="white" tabindex="1">
              <q-popup-proxy ref="ref1" cover transition-show="scale" transition-hide="scale">
                <q-date
                  default-year-month="2016/10"
                  v-model="date"
                  minimal
                  :events="eventsFn"
                  range
                  @update:model-value="onDateRangeChange"
                />
              </q-popup-proxy>
            </q-btn>
          </template>

          <template v-slot:append>
            <q-icon
              color="white"
              v-if="text !== ''"
              name="close"
              @click="text = ''"
              class="cursor-pointer"
            />
            <q-icon name="search" color="white" />
          </template> </q-input
        ><q-space />
      </q-toolbar>
    </q-header>
    <event-item
      style="max-width: 100%"
      v-for="event in eventsStore.filteredEvents"
      :key="event.event"
      :event="event"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEventsStore } from './events-store';
import EventItem from './components/EventItem.vue';
import { QPopupProxy } from 'quasar';
const eventsStore = useEventsStore();
const shadowText = ref('');
const text = ref('');
const date = ref(eventsStore.dateRange);
watch(text, (newValue) => {
  eventsStore.searchText = newValue;
  filterFn(newValue);
  eventsStore.filter();
});

function eventsFn(dt: string): boolean {
  return eventsStore.filterList.dt.includes(Date.parse(dt), 0);
}

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
</script>
