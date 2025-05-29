<template>
    <div id="home">
        <div class="menu-wrapper">
            <div class="home-menu-element" :style="isFeatureRedirection" @click="switchFeature()">
                <p>Redirection</p>
            </div>
            <div class="home-menu-element" :style="isFeatureRevert" @click="switchFeature(EnumFeature.REVERT)">
                <p>Revert</p>
            </div>
        </div>
        <div class="content-wrapper">
            <div v-if="currentFeature === EnumFeature.REDIRECTION">
                <CreateRedirection />
            </div>
            <div v-else>
                <p>Revert</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
enum EnumFeature{
    REDIRECTION = 'redirection',
    REVERT = 'revert'
};

const currentFeature = ref(EnumFeature.REDIRECTION);

const isFeatureRedirection = computed(() => {
    return currentFeature.value === EnumFeature.REDIRECTION ? { textDecoration: 'underline' } : {};
});
const isFeatureRevert = computed(() => {
    return currentFeature.value === EnumFeature.REVERT ? { textDecoration: 'underline' } : {};
});

function switchFeature(feat : EnumFeature = EnumFeature.REDIRECTION) {
    currentFeature.value = feat;
}
</script>


<style scoped lang="scss">

#home {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    
    margin-top: 5rem;

    .menu-wrapper {
        width: 40%;
        height: 3.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-radius: 50rem;
        padding: 0 1rem;
        background-color: $secondary-color;
        text-transform: uppercase;

        .home-menu-element {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            font-weight: 600;
            text-decoration-color: $primary-color;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }

    .content-wrapper {
        width: 30%;
    }
}
</style>