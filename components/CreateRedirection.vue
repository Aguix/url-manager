<template>
    <div v-if="success" class="success-message">
        Redirection créée avec succès !
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

const link = ref('');
const alias = ref('');
const success = ref(false);

function handleSubmit() {
    success.value = true;
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

