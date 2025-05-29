<template>
    <input v-model="modelValue" type="link" :placeholder="placeholder" :required="required">
</template>

<script setup lang="ts">

defineProps<{
    placeholder: string;
    required: boolean;
}>();
const modelValue = defineModel<string>()
</script>

<style scoped lang="scss">

input {
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    border: $primary-color solid 0.1rem;
    background-color: white;
    color: $primary-color;
    padding: 1rem;
}

</style>