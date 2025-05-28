<template>
    <div>
        <AppHeader />
        <slot />
    </div>
</template>

<style lang="scss" scoped>

div {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

</style>