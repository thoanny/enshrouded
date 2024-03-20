<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Base de données Enshrouded`
      : "Base de données Enshrouded";
  },
});

defineOgImageComponent("EnshroudedSeo", {
  title: "Base de données Enshrouded",
  headline: "Bienvenue Flameborns !",
  description:
    "Vous trouverez dans cette base de données des informations et outils pour accompagner vos sessions sur le jeu Enshrouded, développé et édité par Keen games.",
  theme: "#7582ff",
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
