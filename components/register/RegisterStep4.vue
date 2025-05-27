<template>
    <div class="register">
        <LittleCard>
            <template #title>
                <div class="card-title">
                    <h2>Bienvenue !</h2>
                </div>
            </template>

            <template #content>
                <div class="card-content">
                    <p class="success-message">Votre compte a été créé avec succès.</p>
                </div>
            </template>

            <template #footer>
                <div class="card-footer">
                    <NuxtLink to="/dashboard">
                        <button>Aller au dashboard</button>
                    </NuxtLink>
                </div>
            </template>
        </LittleCard>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use "@/components/register/register.scss";

.success-message {
    text-align: center;
    font-size: 1rem;
    font-family: 'Alata', sans-serif;
    color: white;
}
</style>