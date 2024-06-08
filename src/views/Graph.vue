<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import InfoBox from '@/components/InfoBox.vue';
import { validateInterestPayload } from '@/util/validateInterestPayload';

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

    let errorMessage = 'Erro ao entrar na pagina de calculo';

    // data validation
    if(!getPayloadIsValid.valid) {
        if(Array.isArray(getPayloadIsValid?.error) && getPayloadIsValid.error[0]) {
            errorMessage = getPayloadIsValid.error[0];
        }

        setErrorMessage(errorMessage);
    } else {
        alert('sucess')
    }
        

</script>

<template>
    <InfoBox :name="'Valor Mensal'" :value="data.month.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'})"></InfoBox>
</template>