<script setup>
const route = useRoute();

const { data: item } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/items/${route.params.id}`
);

definePageMeta({
  layout: "items",
});
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold flex gap-4 items-center">
      <img
        :src="`https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.icon}`"
        :alt="item.name"
        class="w-36 h-36 shrink-0"
      />
      {{ item.name }}
    </h1>
    <div class="flex gap-4">
      <span v-if="item.category?.name">{{ item.category.name }}</span>
      <span v-if="item.level">Niv. {{ item.level }}</span>
    </div>
    <div :class="`quality-${item.quality} uppercase font-semibold`">
      {{ item.quality }}
    </div>
    <div>
      {{ item.description }}
    </div>
    <div>
      {{ item.comment }}
    </div>
    <pre>
      <!-- {{ item }} -->
    </pre>
  </div>
</template>
