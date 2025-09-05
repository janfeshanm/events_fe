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
    >
      <q-card-section class="q-pa-none">
        <q-img
          :src="'https://picsum.photos/300/200?random=' + Math.floor(Math.random() * 10 + 1)"
          height="200px"
          ><div class="absolute-bottom text-h6">{{ event.event }}</div></q-img
        >
      </q-card-section>
      <q-card-section>
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
