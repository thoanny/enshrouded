<script setup>
const route = useRoute();

const { data: item } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/items/${route.params.id}`
);

const seoDescription = item.value.description
  ? item.value.description
      .split("---")
      .pop()
      .replace(/<[^>]*>?/gm, "")
      .replace(/\r?\n|\r/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  : "Base de données d'objets d'Enshrouded, jeu de survie coopératif.";

const quality = {
  common: "#e1f3d2",
  uncommon: "#53d57d",
  rare: "#a8e1ff",
  epic: "#d4b5ff",
  legendary: "#ffe03e",
};

defineOgImageComponent("EnshroudedSeo", {
  headline: item.value.category?.name,
  title: item.value.name,
  theme: quality[item.value.quality],
  description: seoDescription,
  icon: item.value.icon
    ? `https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.value.icon}`
    : null,
});

useSeoMeta({
  title: item.value.name,
  ogTitle: item.value.name,
  description: seoDescription,
  ogDescription: seoDescription,
});
</script>

<template>
  <div>
    <ItemDetails :item="item" />
  </div>
</template>
