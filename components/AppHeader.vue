<template>
  <div class="bg-neutral p-4 h-16">
    <ul class="flex h-full items-center gap-4">
      <li><NuxtLink :to="{ name: 'index' }">Accueil</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'items' }">Objets</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'recipes' }">Recettes</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'about' }">À propos</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-white font-bold;
}
</style>
