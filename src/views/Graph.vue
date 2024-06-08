<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import InfoContainer from "@/components/InfoContainer.vue"
import { validateInterestPayload } from '@/util/validateInterestPayload';
import Chart from "@/components/Chart.vue"

const router = useRoute();
const data = {
    initial: Number(router.query.initial),
    month: Number(router.query.month),
    fee: Number(router.query.fee),
    period: Number(router.query.period),
    feeType: (router.query.feeType),
    periodType: (router.query.periodType)
};

const navigateRouter = useRouter();
const getPayloadIsValid = validateInterestPayload(data)

function setErrorMessage(msg: string) {
    localStorage.setItem('error', msg)
    navigateRouter.push({ name: 'home' })
}
let total = 0;
let totaInvested = 0;
let totalInFees = 0;
let labels: string[] = [];
let values: number[] = [];
let withoutfee: number[] = [];

let errorMessage = 'Erro ao entrar na pagina de calculo';

// data validation
if (!getPayloadIsValid.valid) {
    if (Array.isArray(getPayloadIsValid?.error) && getPayloadIsValid.error[0]) {
        errorMessage = getPayloadIsValid.error[0];
    }

    setErrorMessage(errorMessage);
} else {
    const multiplier = data.periodType == 'year' ? 12 : 1;
    const divider = data.feeType == 'year' ? 12 : 1;
    data.period = data.period * multiplier;
    data.fee = (data.fee / 100 + 1) ** (1 / divider)  // Convertendo a taxa de juros para uma taxa decimal mensal
    total = data.initial;
    totaInvested = data.initial + data.period * data.month
    
    labels.push('0');
    values.push(total);
    withoutfee.push(total)

    for (let i = 0; i < data.period; i++) {
        total *= data.fee;  // Aplicando os juros compostos
        total += data.month;      // Adicionando o aporte mensal
        labels.push(String(i+1))
        values.push(total);
        withoutfee.push(withoutfee[withoutfee.length-1]+data.month);
    }

    totalInFees = total - totaInvested;

}


</script>

<template>
    <div class="normal-bg pt-20">
        <div class="flex justify-center">
            <InfoContainer :total="total" :total-invested="totaInvested" :total-in-fees="totalInFees"></InfoContainer>
        </div>
        <Chart :labels="labels" :without-fee="withoutfee" :fee="values"></Chart>
    </div>
</template>


<style scoped>
.normal-bg {
    background: rgb(9, 9, 121);
    background: linear-gradient(180deg, rgba(9, 9, 121, 1) 50%, rgba(255, 255, 255, 1) 35%);
}
</style>