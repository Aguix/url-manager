<template>
    <div class="register">
        <!-- <component :is="currentStepComponent" v-bind="form" @next-step="goToNextStep" @previous-step="goToPreviousStep" @submit-form="handleSubmitForm" /> -->

        <RegisterStep1 v-if="currentStep === 1" @next-step="goToNextStep" />
        <RegisterStep2 v-if="currentStep === 2" :email="form.email" @next-step="goToNextStep" @previous-step="goToPreviousStep"/>
        <RegisterStep3 v-if="currentStep === 3" @next-step="goToNextStep" @previous-step="goToPreviousStep" @submit-form="handleSubmitForm"/>
        <RegisterStep4 v-if="currentStep === 4"/>
    </div>
</template>

<script setup lang="ts">
import RegisterStep1 from '@/components/register/RegisterStep1.vue'
import RegisterStep2 from '@/components/register/RegisterStep2.vue'
import RegisterStep3 from '@/components/register/RegisterStep3.vue'
import RegisterStep4 from '@/components/register/RegisterStep4.vue'

const currentStep = ref(1);
const form = ref({
    email: '',
    username: '',
    password: '',
    sessionToken: '',
});

function goToNextStep(payload: Partial<typeof form.value> = {}) {
    form.value = { ...form.value, ...payload };
    currentStep.value++;
}
function goToPreviousStep(payload: Partial<typeof form.value> = {}) {
    form.value = { ...form.value, ...payload };
    currentStep.value--;
}

async function handleSubmitForm(payload: Partial<typeof form.value>) {
    form.value = { ...form.value, ...payload };

    await $fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
            email: form.value.email,
            username: form.value.username,
            password: form.value.password,
            sessionToken: form.value.sessionToken
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    currentStep.value = 4;
}
</script>


<style scoped lang="scss">
.register {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

        
    .card-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        h2 {
            text-transform: uppercase;
            font-family: 'Monda', sans-serif;
            color: white;
            font-size: 1.5rem;
        };
        a {
            text-decoration: underline;
            font-size: 0.8rem;
            font-family: 'Alata', sans-serif;
            color: white;
        }
    }

    #register-form {
        width: 100%;
    }

    button {
        width: 100%;
        height: 3rem;
        background-color: $secondary-color;
        color: $primary-color;
        border-radius: 1rem;
        border: none;
        font-family: 'Alata', sans-serif;
        font-size: 1.2rem;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
            background-color: $primary-color;
            color: $secondary-color;
            border: 1px solid $secondary-color;
            transition: all 0.5s ease-in-out;
        }
    }
}
</style>