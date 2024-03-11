<template>
  <div>
    <ul>
      <li><NuxtLink :to="{ name: 'index' }">Accueil</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'items' }">Objets</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'recipes' }">Recettes</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'about' }">À propos</NuxtLink></li>
    </ul>
  </div>
</template>
