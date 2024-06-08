<script setup lang="ts">
import Chart from 'chart.js/auto';

const props = defineProps(['labels', 'fee', 'withoutFee'])

import { ref, watch } from "vue";
const chartRef = ref()

watch(() => chartRef.value, () => {
    if (chartRef.value)
        new Chart(chartRef.value, {
            type: 'line',
            data: {
                labels: props.labels,
                datasets: [
                    {
                        label: 'Total de Dinhero com juros',
                        data: props.fee,
                        borderWidth: 1
                    },
                    {
                        label: 'Total de Dinhero sem juros',
                        data: props.withoutFee,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
})

</script>


<template>
    <div class="bg-white w-[80%] mt-10 md:max-w-[900px] flex justify-center mx-auto">
        <canvas ref="chartRef" id="chart"></canvas>
    </div>
</template>