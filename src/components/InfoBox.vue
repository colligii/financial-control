<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps(['value', 'name'])

</script>

<template>
    <div class="flex flex-1 flex-col justify-center bg-white text-center p-4 border-2 ">
        <span class="font-bold text-2xl">{{  props.name }}</span>
        <span>{{ props.value }}</span>
    </div>
</template>