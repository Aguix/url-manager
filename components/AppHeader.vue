<template>
    <header>
        <NuxtLink to="/" class="link logo">
            URL Manager
        </NuxtLink>
        <div class="buttons">
            <NuxtLink to="/login" class="link button">
                Login
            </NuxtLink>
            <NuxtLink to="/register" class="link button">
                Register
            </NuxtLink>
        </div>
    </header>
</template>

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