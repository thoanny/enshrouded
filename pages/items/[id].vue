<script setup>
const route = useRoute();

const { data: item } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/items/${route.params.id}`
);

useSeoMeta({
  title: item.value.name,
  ogTitle: item.value.name,
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <ItemDetails :item="item" />
  </div>
</template>
