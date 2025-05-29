<template>
    <div>
        <p>Alias Page</p>
        <p>Alias: {{ alias }}</p>
    </div>
</template>


<script lang="ts" setup>

const route = useRoute()

const alias = route.params.alias;

if (alias) {
    await navigateTo('/api/redirection/' + alias);
}

</script>