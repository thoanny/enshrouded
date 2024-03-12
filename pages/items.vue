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
  <div class="container mx-auto flex gap-4 w-full">
    <div class="w-7/12 bg-base-200 rounded-box p-4">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2 w-full overflow-y-auto pr-4 scroll"
      >
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
.scroll {
  max-height: calc(100dvh - 12rem);
}

.scroll::-webkit-scrollbar-track {
  border-radius: 0.5rem;
}
</style>
