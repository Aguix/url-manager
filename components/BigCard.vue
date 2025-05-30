<template>
    <div class="card">
        <div class="card-el" id="card-header">
            <slot name="icon" />
            <slot name="title" />
        </div>
        <div class="card-el card-content">
            <slot name="content" />
        </div>
        <div class="card-el card-footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string;
    icon?: string;
}>();
</script>

<style scoped lang="scss">

.card {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    background-color: $primary-color;
    border-radius: 30px;

    padding: 1.5rem;
    gap: 2.5rem;

    .card-el {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        color: white;

        #card-header {
            width: 100%;
            height: 20%;

            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;

            font-size: 1.5rem;
            font-weight: bold;

            h2 {
                font-size: 10rem;
            }
        }
    }
}
</style>