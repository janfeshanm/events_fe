<template>
  <q-page @keydown.esc="sEvents?.focusSearchInput()">
    <q-header elevated>
      <q-toolbar
        ><q-btn
          v-if="isHearing"
          aria-label="Hearing"
          size="lg"
          flat
          :icon="isHearing ? 'hearing' : 'hearing_disabled'"
          @click="handleHearing"
          :color="isHearing ? 'green-3' : 'red-3'"
        />
        <h1 style="font-size: 24px; line-height: 1rem">Events</h1>
        <q-space />
        <div ref="div1"></div>
        <a-search-events
          ref="sEvents"
          v-model="searchContext"
          :shadow-text="shadowText"
          @update:date="onDateRangeChange"
          :filterList="eventsStore.filterList"
        />
        <q-space /><q-btn style="display: none" label="Test" @click="testNewCmnd" />
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
      <h2 v-if="eventsStore.filteredEvents.length < 1">No events found</h2>
    </div>
    <audio-controller v-if="isHearing" ref="acntrlr" v-on:run-command="notifyCmd" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useEventsStore } from './events-store';
import EventItem from './components/EventItem.vue';
import ASearchEvents from './components/ASearchEvents.vue';
import type { QPopupProxy } from 'quasar';
import type { EventEntry } from './entities';
import AudioController from './components/AudioController.vue';

onMounted(async () => {
  if (await checkMicrophonePermission(() => {})) isHearing.value = true;
});

async function handleHearing() {
  // if (isHearing.value) isHearing.value = !isHearing.value;
  // else
  //   await checkMicrophonePermission(() => {
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true })
  //       .then(async () => {
  //         const ado = new Audio('intro.mp3');
  //         ado.addEventListener('ended', function () {
  //           isHearing.value = true;
  //           setTimeout(function () {
  //             acntrlr.value.handleClick();
  //           }, 1000);
  //           console.log('Audio playback finished!');
  //         });
  //         await ado.play();
  //       })
  //       .catch(() => {});
  //   });
}

async function checkMicrophonePermission(fn: () => void) {
  if (navigator.permissions) {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: <PermissionName>'microphone',
      });

      if (permissionStatus.state === 'granted') {
        console.log('Microphone access granted.');
        return true;
      } else if (permissionStatus.state === 'denied') {
        console.log('Microphone access denied.');
        return false;
      } else if (permissionStatus.state === 'prompt') {
        console.log('Microphone access not yet requested or user needs to be prompted.');
        fn();
        return false;
      }
    } catch (error) {
      console.error('Error querying microphone permission:', error);
      return false;
    }
  } else {
    console.warn('Permissions API not supported in this browser.');
    // Fallback: Attempt to use getUserMedia and handle potential errors
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access implicitly granted via getUserMedia.');
      return true;
    } catch (error) {
      console.error('Error attempting getUserMedia:', error);
      return false;
    }
  }
}

const sEvents = ref(<typeof ASearchEvents>(<unknown>null));
const eventsStore = useEventsStore();
const shadowText = ref('');
const searchContext = ref({ text: '', date: eventsStore.dateRange });
const acntrlr = ref(<typeof AudioController>(<unknown>null));
const isHearing = ref(false);
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

function onEventFocused(event: EventEntry) {
  console.log('Event Focused ' + event.event);
}
function onEventSelected(event: EventEntry) {
  //if (event.event != '') return;
  console.log('Event Selected ' + event.event);
  if (isHearing.value) {
    if (event.audio != '') {
      console.log(event.audio);
      new Audio(event.audio)
        .play()
        .then(() => {})
        .catch(() => {});
    } else {
      //const filename = acntrlr.value.speak(
      //  `${event.event} by ${event.organisation} for ${event.type} in ${event.district}, ${event.location} on ${event.date}`,
      //);
      //if (filename) {
      //  event.audio = filename;
      //}
    }
  }
}

function notifyCmd(cmd: string) {
  console.log(cmd);
  const resultString = cmd.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  console.log(resultString);
  const wArray = resultString.split(' ');
  console.log(wArray);
  const itemsToRemove = ['', 'find', 'all', 'with', 'word', 'filter', 'and'];
  const newArray = wArray.filter((item) => !itemsToRemove.includes(item));
  console.log(newArray);
  eventsStore.filter2(newArray);
}

function testNewCmnd() {
  console.log('Q. 123 wer, am)'.toLowerCase().replace(/[^a-z0-9]/g, ' '));
}
</script>
