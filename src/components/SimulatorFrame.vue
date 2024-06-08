<script setup lang="ts">
import { vMaska } from 'maska/vue';
import { useRouter } from "vue-router"
import { ref, type ModelRef } from 'vue';
import { validateInterestPayload } from '@/util/validateInterestPayload';

const router = useRouter();
const initialValue: ModelRef<string | undefined, string> = defineModel('initial');
const monthValue: ModelRef<string | undefined, string> = defineModel('month');
const feeRate: ModelRef<string | undefined, string> = defineModel('feeRate');
const period: ModelRef<string | undefined, string> = defineModel('period');
const feeType = ref();
const periodType = ref();
const emit = defineEmits(['toggle-error']);

function setCustomValue(model: ModelRef<string | undefined, string>, options?: Intl.NumberFormatOptions, extraFn?: (number: number) => number, divider?: number) {

    let inputValue = Number(model.value?.replace(/\D/ig, '') || '0') / (divider ?? 100);

    if (isNaN(inputValue) || inputValue == 0) {
        model.value = '';
        return;
    }

    if (extraFn) {
        inputValue = extraFn(inputValue);
    }

    model.value = inputValue.toLocaleString('pt-br', options);

}

function setInitialValue() {
    setCustomValue(initialValue, { style: 'currency', currency: 'BRL' });
}

function setMonthValue() {
    setCustomValue(monthValue, { style: 'currency', currency: 'BRL' })
}

function setFeeValue() {
    setCustomValue(feeRate, { minimumFractionDigits: 2 }, number => number > 5000 ? 5000 : number);
}

function setPeriodValue() {
    setCustomValue(period, undefined, number => (number) > 50000 ? 50000 : Math.floor(number), 1);
}

function getValue(model: ModelRef<string | undefined, string>, divider?: number) {
    return Number(model.value?.replace(/\D/ig, '') || '0') / (divider ?? 100)
}

function sendForm(e: Event) {
    e.preventDefault();
    const data = {
        initial: getValue(initialValue),
        month: getValue(monthValue),
        fee: getValue(feeRate),
        period: getValue(period, 1),
        feeType: feeType.value?.value,
        periodType: periodType.value?.value
    }

    const getPayloadIsValid = validateInterestPayload(data);

    let errorMessage = 'Erro ao entrar na pagina de calculo';

    // data validation
    if (!getPayloadIsValid.valid) {
        if (Array.isArray(getPayloadIsValid?.error) && getPayloadIsValid.error[0]) {
            errorMessage = getPayloadIsValid.error[0];
        }

        return emit('toggle-error', errorMessage);
    }

    router.push({ name: 'graph', query: data });
}
</script>

<template>
    <form @submit="sendForm"
        class="grid grid-cols-1 md:grid-cols-2 gap-2 p-6 border-2 bg-orange-100 rounded-lg max-w-xl">
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
                <input v-model="feeRate" class="flex-1 min-w-0" @input="setFeeValue">
                <select ref="feeType">
                    <option value="year">% Anual</option>
                    <option value="month">% Mensal</option>
                </select>
            </div>
        </div>
        <div>
            <span>Período</span>
            <div class="flex w-full">
                <input v-model="period" class="flex-1 min-w-0" @input="setPeriodValue">
                <select ref="periodType">
                    <option value="year">Ano(s)</option>
                    <option value="month">Mes(es)</option>
                </select>
            </div>
        </div>
        <div class="flex justify-center md:col-span-2">
            <input class="p-2 text-white font-bold rounded border-2 border-orange-400 bg-orange-300" type="submit"
                value="Calcular">
        </div>
    </form>
</template>