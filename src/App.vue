<script setup lang="ts">
import { ref } from "vue"
import Error from './components/shared/Error.vue'
import { RouterView } from 'vue-router'

const message = ref();
const timesExecuted = ref(0);

function toggleError(msg: string) {
  message.value = msg;
  timesExecuted.value++;
}
</script>

<template>
  <Error :message="message" :timesExecuted="timesExecuted"></Error>
  <RouterView @toggle-error="toggleError"/>
</template>
