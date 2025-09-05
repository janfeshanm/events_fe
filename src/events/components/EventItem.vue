<template>
  <div class="col q-pb-xs-sm q-pa-sm-xs q-pa-md-sm col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <q-card
      ref="cardRef"
      style="height: 100%"
      tabindex="1"
      v-ripple
      class="event-card cursor-pointer q-hoverable"
      flat
      bordered
      clickable
      @keydown.enter="eventSelected()"
      @dblclick:pre="eventSelected()"
      @focus="eventFocused()"
    >
      <q-card-section class="q-pa-none">
        <q-img
          :aria-label="event.event"
          :alt="event.event"
          :src="'https://picsum.photos/300/200?random=' + Math.floor(Math.random() * 10 + 1)"
          height="200px"
          ><div class="absolute-bottom text-h6">{{ event.event }}</div></q-img
        >
      </q-card-section>
      <q-card-section>
        <h6><q-icon name="home" color="amber" /> {{ event.organisation }}</h6>
        <h5>
          <q-icon name="location_on" color="teal" /> {{ event.district }}-{{ event.location }}
        </h5>

        <h6><q-icon name="category" color="amber" /> {{ event.type }}</h6>
      </q-card-section>

      <q-card-section style="bottom: 0px; position: absolute">
        <div><q-icon name="calendar_today" size="20px" /> {{ event.date }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { QCard } from 'quasar';
import type { EventEntry } from '../entities';
import { ref } from 'vue';
const cardRef = ref(<QCard>(<unknown>null));
interface Props {
  event: EventEntry;
}

withDefaults(defineProps<Props>(), {
  event: () => ({}) as EventEntry,
});

function focusEvent() {
  cardRef.value?.$el.focus();
}

defineExpose({
  focusEvent,
});

const emits = defineEmits({
  eventFocused: null,
  eventSelected: null,
});

function eventFocused() {
  emits('eventFocused');
}

function eventSelected() {
  emits('eventSelected');
}
</script>
<style lang="scss" scoped>
.event-card:focus {
  background: linear-gradient(to right, #d3d3d3, #acacaa);
}

h6 {
  margin-block-start: 0.2em;
  margin-block-end: 1.8em;
}
h5 {
  margin-block-start: 0.2em;
  margin-block-end: 1em;
}
</style>
