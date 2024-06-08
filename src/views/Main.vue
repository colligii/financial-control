<script setup lang="ts">
    import { useRoute } from 'vue-router';
import SimulatorFrame from '../components/SimulatorFrame.vue'
import { watch } from 'vue';

    const emit = defineEmits(['toggle-error'])

    if(typeof localStorage.error == 'string') {
        toggleError(localStorage.error);
        localStorage.removeItem('error')
    } else {
        localStorage.removeItem('error')
    }
    
    function toggleError(msg: string) {
        emit('toggle-error', msg)
    }
</script>

<template>
    <div class="h-[100vh] flex justify-center flex-col items-center normal-bg relative">
        <span class="text-center mb-10 text-white font-bold text-2xl">Calculadora de Juros Compostos</span>
        <SimulatorFrame @toggle-error="toggleError"></SimulatorFrame>
    </div>
</template>

<style scoped>
.normal-bg {
  background: rgb(9, 9, 121);
  background: linear-gradient(180deg, rgba(9, 9, 121, 1) 50%, rgba(255, 255, 255, 1) 35%);
}
</style>