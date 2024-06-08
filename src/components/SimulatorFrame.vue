<script setup lang="ts">
import { vMaska } from 'maska/vue';
import { useRouter } from "vue-router"
import { ref, type ModelRef } from 'vue';
import { validateInterestPayload } from '@/util/validateInterestPayload';

const router = useRouter();
const initialValue: ModelRef<string | undefined, string> = defineModel('initial');
const monthValue: ModelRef<string | undefined, string> = defineModel('month');
const feeRate = ref();
const feeType = ref();
const periodType = ref();
const period = ref();
const emit = defineEmits(['toggle-error']);

function setInitialValue() {
    const inputValue = initialValue.value?.replace(/\D/ig, '');

    if (!inputValue || inputValue == '' || Number(inputValue) == 0) {
        initialValue.value = '';
        return;
    }

    initialValue.value = (Number(inputValue) / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function setMonthValue() {
    const inputValue = monthValue.value?.replace(/\D/ig, '');

    if (!inputValue || inputValue == '' || Number(inputValue) == 0) {
        monthValue.value = '';
        return;
    }

    monthValue.value = (Number(inputValue) / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function sendForm(e: Event) {
    e.preventDefault();
    const data = {
        initial: Number(initialValue.value?.replace(/\D/ig, '') || '0') / 100,
        month: Number(monthValue.value?.replace(/\D/ig, '') || '0') / 100,
        fee: Number(feeRate.value?.value || '0'),
        period: Number(period.value?.value || '0'),
        feeType: feeType.value?.value,
        periodType: periodType.value?.value
    }
    const getPayloadIsValid = validateInterestPayload(data);

    let errorMessage = 'Erro ao entrar na pagina de calculo';

    // data validation
    if(!getPayloadIsValid.valid) {
        if(Array.isArray(getPayloadIsValid?.error) && getPayloadIsValid.error[0]) {
            errorMessage = getPayloadIsValid.error[0];
        }

        return emit('toggle-error', errorMessage);
    }

    router.push({ name: 'graph', query: data });
}
</script>

<template>
    <form @submit="sendForm" class="grid grid-cols-1 md:grid-cols-2 gap-2 p-6 border-2 bg-orange-100 rounded-lg max-w-xl">
        <h1 class="text-blue-400 text-xl font-bold md:col-span-2">
            Simulador de Juros Compostos
        </h1>

        <div>
            <span>
                Valor Inicial
            </span>

            <input class="border-2 rounded w-full" v-model="initialValue" @input="setInitialValue" />

        </div>
        <div>
            <span>
                Valor Mensal
            </span>
            <input class="border-2 rounded w-full" v-model="monthValue" @input="setMonthValue" />
        </div>
        <div>
            <span>Taxa de Juros</span>
            <div class="flex w-full">
                <input ref="feeRate" class="flex-1 min-w-0" v-maska data-maska="#####">
                <select ref="feeType">
                    <option value="year">% Anual</option>
                    <option value="month">% Mensal</option>
                </select>
            </div>
        </div>
        <div>
            <span>Período</span>
            <div class="flex w-full">
                <input ref="period" class="flex-1 min-w-0" v-maska data-maska="##########">
                <select ref="periodType">
                    <option value="year">Ano(s)</option>
                    <option value="month">Mes(es)</option>
                </select>
            </div>
        </div>
        <div class="flex justify-center md:col-span-2">
            <input class="p-2 text-white font-bold rounded border-2 border-orange-400 bg-orange-300" type="submit" value="Calcular">
        </div>
    </form>
</template>