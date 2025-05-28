<template>
    <div v-if="auth.loading">
        <p>Chargement...</p>
    </div>

    <div v-else-if="auth.isConnected && auth.user">
        <h1 class="text-2xl font-bold mb-4">Bienvenue {{ auth.user.username }}</h1>
        <p>Email : {{ auth.user.email }}</p>
        <button @click="logout">Se déconnecter</button>
    </div>

    <div v-else>
        <p>Utilisateur non connecté.</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
const auth = useAuthStore();

const logout = async () => {
    await useAuthStore().logout();
    await navigateTo('/login', { replace: true });
}
</script>

<style lang="scss">


</style>