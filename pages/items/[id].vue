<script setup>
const route = useRoute();

definePageMeta({
  layout: "items",
});
</script>

<template>
  <div>Objet: {{ route.params.id }}</div>
</template>
