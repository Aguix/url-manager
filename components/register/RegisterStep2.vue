<template>
    <div class="register">
        <LittleCard>
            <template #title>
                <div class="card-title">
                    <h2>Vérifiez votre email</h2>
                    <p class="side-text" @click="$emit('previous-step')"> Retour à l'étape précédente</p>
                </div>
            </template>

            <template #content>
                <div class="card-content">
                    <p class="info">Merci de saisir le code recu à l'adresse <strong>{{ email }}</strong>.</p>
                    <form id="form" @submit.prevent="handleNext">
                        <IconWithInput
                        v-model="code"
                        placeholder="Code reçu par email"
                        icon-name="mynaui:password-solid"
                        />
                    </form>
                    <div class="resend">
                        <p class="info">Vous n'avez pas rien reçu ? <strong @click="sendEmailCode">Renvoyer le code</strong>.</p>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="card-footer">
                    <CTAButton form="form" label="Suivant"/>
                </div>
            </template>
        </LittleCard>
    </div>
</template>

<script setup lang="ts">
const { email } = defineProps<{ email: string }>();
const emit = defineEmits(['next-step', 'previous-step']);

const code = ref('');

async function sendEmailCode() {
    await $fetch('/api/email/send_verification_code', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
};

async function handleNext() {
    if (!code.value) {
        alert('Veuillez entrer le code reçu.');
        return;
    }

    const isCodeValid = await fetch('/api/email/check_verification_code', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            code: code.value,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!isCodeValid.ok) {
        alert('Le code est invalide ou a expiré.');
        return;
    }

    const data = await isCodeValid.json();
    
    emit('next-step', { sessionToken: data.sessionToken });
};
</script>

<style scoped lang="scss">
@use "@/components/register/register.scss";

.resend {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
        font-size: 0.85rem!important;
    
        strong {
            text-decoration: underline;
        }
    }
}
</style>