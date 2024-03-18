<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Base de données Enshrouded`
      : "Base de données Enshrouded";
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <AppHeader />
    <div class="p-4">
      <NuxtPage />
    </div>
    <AppFooter />
  </div>
</template>
