<script setup>
useSeoMeta({
  title: "Tous les objets",
  ogTitle: "Tous les objets",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

const { data: items } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/items"
);
</script>
<template>
  <div class="p-4 container mx-auto flex gap-4 w-full">
    <div
      class="w-7/12 overflow-y-auto bg-base-200 rounded-box"
      style="max-height: calc(100dvh - 6rem)"
    >
      <div class="grid grid-cols-4 xl:grid-cols-8 gap-2 w-full p-4">
        <NuxtLink
          :to="{ name: 'items-id', params: { id: item.id } }"
          :class="`quality-${item.quality} rounded-xl aspect-square w-full flex items-center justify-center text-center overflow-hidden border border-neutral`"
          v-for="item in items"
          :key="item.id"
        >
          <img
            :src="`https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.icon}`"
            :alt="item.name"
            class="w-full aspect-square shrink-0"
            v-if="item.icon"
          />
          <span class="text-xs p-2 truncate" v-else>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="w-5/12"><NuxtPage /></div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-neutral;
}
</style>
