<script setup>
const { data: items } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/items"
);
</script>

<template>
  <div>
    <AppHeader />
    <div class="p-4 container mx-auto flex gap-4 w-full">
      <div class="w-1/3">
        <ul class="flex flex-col gap-2">
          <li v-for="item in items" :key="item.id">
            <NuxtLink
              :to="{ name: 'items-id', params: { id: item.id } }"
              :class="`quality-${item.quality} flex gap-2 border border-gray-700 rounded p-2 items-center`"
            >
              <img
                :src="`https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.icon}`"
                :alt="item.name"
                class="w-8 h-8 shrink-0"
                v-if="item.icon"
              />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="w-2/3"><slot /></div>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-gray-700;
}
</style>
