<template>
    <div v-if="success && redirection" class="success-message">
        Redirection créée avec succès ! Elle est accessible via
        <a :href="`/${redirection?.alias}`" target="_blank">
            {{ redirection?.alias }}
        </a>
    </div>
    <form @submit.prevent="handleSubmit">
        <LinkInput
            v-model="link"
            placeholder="Lien de la destination"
            required
        />
        <LinkInput
            v-model="alias"
            placeholder="Alias personnalisé (optionnel)"
            :required="false"
        />
        <CTAButton label="Créer la redirection" />
    </form>
</template>


<script setup lang="ts">
import type { RedirectionCreation } from '@/types/redirection';
const link = ref('');
const alias = ref('');
const success = ref(false);
const redirection = ref();

async function handleSubmit() {
    // redirection.value = await $fetch('/api/redirection', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         userId: useAuthStore().user?.id || null,
    //         url: link.value,
    //         alias: alias.value || null
    //     }),
    // });
    
    const reqBody : RedirectionCreation = {
        url: link.value,
    };

    if (alias.value) reqBody.alias = alias.value;

    $fetch('/api/redirection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    })
    .then(data => {
        redirection.value = data;
        success.value = true;
    })
    .catch(error => {
        success.value = false;
        console.error('Erreur lors de la création de la redirection:', error);
    });
    console.log('Redirection créée avec succès !');
}

</script>


<style scoped lang="scss">
.success-message {
    font-weight: bold;
    margin-bottom: 4rem;
}


form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

</style>

