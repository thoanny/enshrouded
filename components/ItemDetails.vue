<script setup>
const props = defineProps(["item"]);

const quality = {
  common: "Ordinaire",
  uncommon: "Peu courant",
  rare: "Rare",
  epic: "Épique",
  legendary: "Légendaire",
};
</script>
<template>
  <div>
    <header class="relative min-h-64">
      <div class="relative z-20">
        <h1 class="text-3xl font-bold text-white">
          {{ item.name }}
        </h1>
        <div class="flex text-xl gap-4">
          <span v-if="item.category?.name">{{ item.category.name }}</span>
          <span v-if="item.level">Niv. {{ item.level }}</span>
        </div>
      </div>

      <img
        :src="`https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.icon}`"
        :alt="item.name"
        class="w-64 h-64 absolute z-10 top-0 right-0 rounded-box"
        v-if="item.icon"
      />
    </header>
    <div
      :class="`text-quality-${item.quality} border-b-2 border-quality-${item.quality} uppercase font-semibold pb-2 mb-4`"
    >
      {{ quality[item.quality] }}
    </div>
    <div class="text-lg">
      <div>
        {{ item.description }}
      </div>
      <div>
        {{ item.comment }}
      </div>
    </div>
  </div>
</template>
