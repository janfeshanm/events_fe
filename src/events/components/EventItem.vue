<template>
  <q-card
    tabindex="1"
    v-ripple
    class="my-card cursor-pointer q-hoverable"
    flat
    bordered
    clickable
    @keydown.enter="console.log('Enter pressed')"
    @click="console.log('Card clicked')"
  >
    <q-card-section class="col-5 flex flex-center"
      ><h4>{{ event.event }}</h4>
      <q-img style="border: 1px salmon solid" src="https://placehold.co/300x180" />
    </q-card-section>
    <q-card-section class="q-pt-xs">
      <h5>{{ event.district }}</h5>

      <h6>{{ event.type }}</h6>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div>{{ event.date }}</div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { EventEntry } from '../entities';
interface Props {
  event: EventEntry;
}

withDefaults(defineProps<Props>(), {
  event: () => ({}) as EventEntry,
});
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
  margin: 5px;
}
.my-card:focus {
  outline: 2px solid blue;
}
</style>
