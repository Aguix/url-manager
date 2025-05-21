<template>
    <div class="card">
        <!-- <div>
            <slot name="title" />
        </div>
        <div>
            <slot name="content" />
        </div>
        <div>
            <slot name="footer" />
        </div> -->
        <slot name="title" />
        <slot name="content" />
        <slot name="footer" />
    </div>
</template>

<style scoped lang="scss">

.card {
    width: 35%;
    max-height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: $primary-color;
    border-radius: 30px;

    padding: 1.5rem;
    gap: 1.5rem;
}
</style>