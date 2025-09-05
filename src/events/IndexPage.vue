<template>
  <q-page class="row items-center justify-evenly">
    <event-item v-for="event in eventsStore.filteredEvents" :key="event.event" :event="event" />
  </q-page>
</template>

<script setup lang="ts">
import { useEventsStore } from './events-store';
import EventItem from './components/EventItem.vue';

const eventsStore = useEventsStore();
</script>
