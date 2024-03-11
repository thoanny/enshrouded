<script setup>
const { data: items } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/items"
);
</script>

<template>
  <div>
    <AppHeader />
    <div class="p-4 container mx-auto flex gap-4 w-full">
      <div
        class="w-7/12 overflow-y-auto bg-base-200 rounded-box"
        style="max-height: calc(100dvh - 6rem)"
      >
        <ul class="grid grid-cols-8 gap-2 w-full p-2">
          <li v-for="item in items" :key="item.id">
            <NuxtLink
              :to="{ name: 'items-id', params: { id: item.id } }"
              :class="`quality-${item.quality}`"
            >
              <img
                :src="`https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.icon}`"
                :alt="item.name"
                class="w-full aspect-square shrink-0"
                v-if="item.icon"
              />
              <span
                class="border rounded w-full aspect-square text-xs flex items-center justify-center text-center p-2"
                v-else
                >{{ item.name }}</span
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="w-5/12"><slot /></div>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-gray-700;
}
</style>
