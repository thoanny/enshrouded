<template>
  <div class="bg-accent-content p-4 h-16">
    <ul class="flex h-full items-center gap-4">
      <li class="mr-2">
        <NuxtLink
          :to="{ name: 'index' }"
          class="text-xs font-semibold relative"
        >
          <img
            src="~/assets/img/enshrouded-logo.svg"
            alt=""
            class="h-6 w-auto -mt-4"
          />
          <span class="absolute top-2 left-6">Base de données</span>
        </NuxtLink>
      </li>
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
