<template>
  <q-page class="row items-center justify-evenly">
    <div>{{ pname }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const pname = ref('index3');
</script>
