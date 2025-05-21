<template>
    <div class="login">
        <LittleCard>
            <template #title>
                <div class="card-title">
                    <h2>Se connecter</h2>
                    <NuxtLink to="/">Aller à la page de création de compte ></NuxtLink>
                </div>
            </template>

            <template #content>
                <form id="login-form" @submit.prevent="handleLogin">
                    <IconWithInput
                        v-model=email
                        :field-type="InputFieldType.Email"
                        placeholder="Email"
                        icon-name="line-md:account"
                    />
                    <IconWithInput
                        v-model=password
                        :field-type="InputFieldType.Password"
                        placeholder="Mot de passe"
                        icon-name="mingcute:lock-line"
                    />
                </form>
            </template>

            <template #footer>
                <button type="submit" form="login-form">SE CONNECTER</button>
            </template>
        </LittleCard>
    </div>

</template>

<script setup lang="ts">
import { InputFieldType } from '@/types/InputFieldType'
const handleLogin = async () => {
    const data = await $fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(data);
}

const email = ref('')
const password = ref('')

</script>

<style scoped lang="scss">

.login {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: $tertiary-color;

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

    #login-form {
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