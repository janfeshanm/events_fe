<template>
  <q-input
    ref="qinput"
    tabindex="0"
    :shadow-text="shadowText"
    dark
    debounce="10"
    label-color="white"
    v-model="model.text"
    label="Find Events"
    color="white"
    class="custom-search-input"
  >
    <template v-slot:after>
      <q-btn icon="event" size="lg" flat color="white" tabindex="0">
        <q-popup-proxy
          ref="ref1"
          cover
          transition-show="scale"
          transition-hide="scale"
          style="scale: 1.3; transform-origin: 0 0"
        >
          <q-date
            default-year-month="2016/10"
            v-model="model.date"
            minimal
            :events="eventsFn"
            range
          />
        </q-popup-proxy>
      </q-btn>
    </template>

    <template v-slot:append>
      <q-icon
        color="white"
        v-if="model.text !== ''"
        name="close"
        @click="model.text = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" color="white" />
    </template>
  </q-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { SearchContext } from '../entities';
const model = defineModel<SearchContext>('modelValue', {
  type: Object as () => SearchContext,
  default: () => ({ text: '', date: { from: '', to: '' } }),
  required: true,
});

const props = defineProps({
  shadowText: {
    type: String,
    default: '',
    required: true,
  },
  filterList: {
    type: Object as () => { dt: number[] },
    default: () => ({ dt: [] }),
    required: true,
  },
});

const qinput = ref(<HTMLInputElement>(<unknown>null));
function focusSearchInput() {
  qinput.value?.focus();
}

defineExpose({ focusSearchInput });

function eventsFn(dt: string): boolean {
  return props.filterList.dt.includes(Date.parse(dt), 0);
}
</script>

<style scoped>
.custom-search-input {
  height: 60px;
  font-size: 16px;
}
</style>
