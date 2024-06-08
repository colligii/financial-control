<script setup lang="ts">
import InfoBox from "@/components/InfoBox.vue"

const { total, totalInvested, totalInFees } = defineProps(['total', 'totalInvested', 'totalInFees'])

</script>

<template>
    <div class="flex mx-10 flex-col w-full md:flex-row md:w-[900px] md:h-[150px] gap-2">
        <InfoBox :name="'Valor Total'" :value="total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })">
        </InfoBox>
        <InfoBox :name="'Total Investido'"
            :value="totalInvested.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })">
        </InfoBox>
        <InfoBox :name="'Total Investido'"
            :value="totalInFees.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })">
        </InfoBox>
    </div>
</template>
