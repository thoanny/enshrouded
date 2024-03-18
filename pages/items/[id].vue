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

useSeoMeta({
  title: item.value.name,
  ogTitle: item.value.name,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: item.value.icon
    ? `https://api.lebusmagique.fr/uploads/api/enshrouded/items/${item.value.icon}`
    : "/enshrouded.jpg",
  twitterCard: "summary",
});
</script>

<template>
  <div>
    <ItemDetails :item="item" />
  </div>
</template>
