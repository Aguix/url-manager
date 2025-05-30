<template>
    <header>
        <NuxtLink to="/" class="link logo">
            URL Manager
        </NuxtLink>
        <div v-if="auth.isConnected && auth.user" class="buttons">
            <span class="link">{{ auth.user.username }}</span>
            <NuxtLink to="/" class="link button">
                Mon dashboard
            </NuxtLink>
            <NuxtLink to="/" class="link button">
                Nouveau raccourci
            </NuxtLink>
            <button @click="auth.logout" class="">Logout</button>
        </div>
        <div v-else class="buttons">
            <NuxtLink to="/" class="link button">
                Login
            </NuxtLink>
            <NuxtLink to="/" class="link button">
                Register
            </NuxtLink>
        </div>
    </header>
</template>

<script setup lang="ts">
const auth = useAuthStore();

</script>

<style lang="scss" scoped>

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3.5rem;
    padding: 1rem;
    background-color: $primary-color;
    
    font-family: 'Inter', sans-serif;

    .link {
        text-decoration: none;
    }

    .logo {
        color: $secondary-color;
        font-size: 1.7rem;
    }

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        .button {
            padding: 0.4rem;
            background-color: $secondary-color;
            color: $primary-color;

            border-radius: 0.6rem;
            border-style: solid;
            border-width: 0.2rem;
            border-color: $primary-color;
            
            font-size: 1rem;
            
            cursor: pointer;

            transition: all 1s ease; 

            &:hover {
                background-color: $primary-color;
                color: $secondary-color;
                border-color: $secondary-color;
            }
        }
    }
}
</style>