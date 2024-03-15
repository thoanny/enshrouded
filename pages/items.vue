<script setup>
useSeoMeta({
  title: "Tous les objets",
  ogTitle: "Tous les objets",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

const category = ref("");
const items = ref([]);

const { data: allItems } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/items"
);

const { data: categories } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/items/categories"
);

onMounted(() => {
  items.value = allItems.value;
});

watch(category, async () => {
  if (category.value.length === 0) {
    items.value = allItems.value;
  } else {
    items.value = allItems.value.filter(
      (item) => item.category.id === category.value
    );
  }
});
</script>
<template>
  <div class="container mx-auto flex gap-4 w-full items-start">
    <div class="w-7/12 bg-base-200 rounded-box p-4">
      <select class="select select-sm select-bordered mb-4" v-model="category">
        <option value="">-- Catégories --</option>
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
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
            :src="`https://api.lebusmagique.fr${item.icon96x96}`"
            :alt="item.name"
            class="w-full aspect-square shrink-0"
            width="96"
            height="96"
            v-if="item.icon96x96"
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
  max-height: calc(100dvh - 15rem);
  scrollbar-gutter: stable;
}

.scroll::-webkit-scrollbar-track {
  border-radius: 0.5rem;
}
</style>
