<template>
  <div
    class="bg-accent-content p-4 h-16 flex gap-4 justify-between items-center"
  >
    <NuxtLink :to="{ name: 'index' }" class="text-xs font-semibold relative">
      <img
        src="~/assets/img/enshrouded-logo.svg"
        alt=""
        class="h-auto w-36 -mt-4"
      />
      <span class="absolute top-2 left-6">Base de données</span>
    </NuxtLink>
    <ul class="flex h-full items-center gap-4 font-bold">
      <li><NuxtLink :to="{ name: 'items' }">Objets</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'recipes' }">Recettes</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'about' }">À propos</NuxtLink></li>
    </ul>
    <span class="w-36"></span>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-white;
}
</style>
