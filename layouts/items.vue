<template>
  <div>
    <AppHeader />
    <div>
      Liste des objets:
      <ul>
        <li>
          <NuxtLink :to="{ name: 'items-id', params: { id: 1 } }">
            Objet 1
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'items-id', params: { id: 2 } }">
            Objet 2
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'items-id', params: { id: 3 } }">
            Objet 3
          </NuxtLink>
        </li>
      </ul>
    </div>
    <slot />
    <AppFooter />
  </div>
</template>
