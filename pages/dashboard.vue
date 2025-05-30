<template>
    <!-- <div v-else-if="auth.isConnected && auth.user">
        <h1 class="text-2xl font-bold mb-4">Bienvenue {{ auth.user.username }}</h1>
        <p>Email : {{ auth.user.email }}</p>
        <button @click="logout">Se déconnecter</button>
    </div>

    <div v-else>
        <p>Utilisateur non connecté.</p>
    </div> -->
    <div>
        <div v-if="auth.loading" class="content">
            <p>Chargement...</p>
        </div>
        <div v-else class="content">
            <div class="side" >
                <BigCard>
                    <template #icon>
                        <Icon name="mdi:clock-outline" />
                    </template>
                    <template #title>
                        <p>Vos dernières redirections créées</p>
                    </template>
                    <template #content>
                        <p>Contenu de la carte</p>
                    </template>
                    <template #footer>
                        <button class="btn">Action</button>
                    </template>
                </BigCard>
            </div>
            <div class="side">
                <BigCard>
                    <template #title>
                        <h2 class="text-xl font-bold">Vos redirections les plus utilisées </h2>
                    </template>
                    <template #content>
                        <p>Contenu de la carte</p>
                    </template>
                    <template #footer>
                        <button class="btn">Action</button>
                    </template>
                </BigCard>
                <BigCard>
                    <template #title>
                        <h2 class="text-xl font-bold">Redirections mortes</h2>
                    </template>
                    <template #content>
                        <p>Contenu de la carte</p>
                    </template>
                    <template #footer>
                        <button class="btn">Action</button>
                    </template>
                </BigCard>
            </div>
        </div>
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

.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
    padding: 2rem;

    .side {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }
}

</style>