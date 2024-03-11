<template>
  <div class="bg-neutral p-4">
    <ul class="flex gap-4">
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
