<template>
    <LittleCard>
        <template #title>
            <div class="card-title">
                <h2>Créer son compte</h2>
                <NuxtLink to="/login">Aller à la page de connexion ></NuxtLink>
            </div>
        </template>

        <template #content>
            <div class="card-content">
                <form id="form" @submit.prevent="handleNext">
                    <IconWithInput v-model="email" :field-type="InputFieldType.Email" placeholder="Email" icon-name="line-md:at" :value="email ?? null" />
                    <IconWithInput v-model="username" placeholder="Nom d'utilisateur" icon-name="line-md:account" :value="username ?? null"/>
                </form>
            </div>
        </template>

        <template #footer>
            <div class="card-footer">
                <CTAButton form="form" label="Suivant"/>
            </div>
        </template>
    </LittleCard>
</template>


<script setup lang="ts">
import { InputFieldType } from '@/types/InputFieldType'

const emit = defineEmits(['next-step'])

const email = ref('')
const username = ref('')

const handleNext = async () => {
    const checkEmail = await $fetch('/api/email/is_available', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (!checkEmail.available) {
        alert('Cet email est déjà utilisé.');
        return;
    }

    await $fetch('/api/email/send_verification_code', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    emit('next-step', {
        email: email.value,
        username: username.value,
    })
}
</script>


<style scoped lang="scss">

@use "@/components/register/register.scss";

</style>