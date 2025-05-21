<template>
    <button type="submit" :form="form" class="form-submit-btn">
        {{ label }}
    </button>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    form?: string
}>()
</script>

<style scoped lang="scss">
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
</style>
