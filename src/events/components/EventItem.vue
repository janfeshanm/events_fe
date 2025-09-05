<template>
  <div class="col q-pb-xs-sm q-pa-sm-xs q-pa-md-sm col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <q-card
      style="height: 100%"
      tabindex="1"
      v-ripple
      class="my-card cursor-pointer q-hoverable"
      flat
      bordered
      clickable
      @keydown.enter="console.log('Enter pressed')"
      @click="console.log('Card clicked')"
      ><q-card-section style="min-height: 200px">
        <h4>{{ event.event }}</h4>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-img src="https://placehold.co/300x180" />
      </q-card-section>
      <q-card-section>
        <h5>{{ event.district }}</h5>

        <h6>{{ event.type }}</h6>
      </q-card-section>

      <q-card-section style="bottom: 0px; position: absolute">
        <div>{{ event.date }}</div>
      </q-card-section>
    </q-card>
  </div>
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
.my-card:focus {
  background: linear-gradient(to right, #ecebeb, #b8b8b6);
}
</style>
