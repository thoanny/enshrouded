<template>
  <div>
    <AppHeader />
    <div>
      Liste des recettes:
      <ul>
        <li>
          <NuxtLink :to="{ name: 'recipes-id', params: { id: 1 } }">
            Recette 1
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'recipes-id', params: { id: 2 } }">
            Recette 2
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'recipes-id', params: { id: 3 } }">
            Recette 3
          </NuxtLink>
        </li>
      </ul>
    </div>
    <slot />
    <AppFooter />
  </div>
</template>
