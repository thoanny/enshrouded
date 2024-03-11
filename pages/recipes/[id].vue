<script setup>
const route = useRoute();

definePageMeta({
  layout: "recipes",
});
</script>

<template>
  <div>Recette: {{ route.params.id }}</div>
</template>
