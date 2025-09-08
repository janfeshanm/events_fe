<template>
  <div class="col q-pb-xs-sm q-pa-sm-xs q-pa-md-sm col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <q-card
      ref="cardRef"
      style="height: 100%"
      tabindex="0"
      class="event-card cursor-pointer q-hoverable"
      flat
      bordered
      clickable
      @keydown.enter="eventSelected()"
      @dblclick="eventSelected()"
      @focus="eventFocused()"
    >
      <q-card-section class="q-pa-none">
        <q-img :aria-label="event.event" :alt="event.event" src="926-300x200.jpg" height="200px"
          ><div class="absolute-bottom text-h6">{{ event.event }}</div></q-img
        >
      </q-card-section>
      <q-card-section>
        <h2 style="font-size: 24px; line-height: 1rem">
          <q-icon name="home" color="amber" /> {{ event.organisation }}
        </h2>
        <h3 style="font-size: 24px; line-height: 1rem" data-cy="location">
          <q-icon name="location_on" color="teal" /> {{ event.district }}-{{ event.location }}
        </h3>

        <h3 style="font-size: 24px; line-height: 2rem; margin-bottom: 36px">
          <q-icon name="category" color="amber" /> {{ event.type }}
        </h3>
      </q-card-section>

      <q-card-section style="bottom: 0px; position: absolute">
        <div style="font-size: larger">
          <q-icon name="calendar_today" size="20px" /> {{ event.date }}
        </div>
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
