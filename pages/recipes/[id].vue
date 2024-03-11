<script setup>
const route = useRoute();

const { data: recipe } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/recipes/${route.params.id}`
);

definePageMeta({
  layout: "recipes",
});

useSeoMeta({
  title: recipe.value.outputItem.name,
  ogTitle: recipe.value.outputItem.name,
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="flex gap-4">
    <div class="w-3/5 p-4">
      <ItemDetails :item="recipe.outputItem" />
    </div>
    <div class="w-2/5 p-4">
      <div v-if="recipe.requirements.length > 0">
        <h4 class="text-xl font-bold mb-4">Exigences</h4>
        <div v-for="requirement in recipe.requirements"></div>
      </div>
      <div>
        <h4 class="text-xl font-bold mb-4">Ressources</h4>
        <div class="flex flex-col gap-2">
          <div
            class="flex gap-4 items-center justify-between text-lg"
            v-for="ingredient in recipe.ingredients"
          >
            <div class="flex gap-2 items-center">
              <img
                :src="`https://api.lebusmagique.fr/uploads/api/enshrouded/items/${ingredient.item.icon}`"
                :alt="ingredient.item.name"
                class="w-12 h-12 bg-black bg-opacity-25 rounded"
                v-if="ingredient.item.icon"
              />
              <span>{{ ingredient.item.name }}</span>
            </div>
            <div>&times;&nbsp;{{ ingredient.quantity }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{ recipe }}</pre> -->
    <!-- <h1 class="text-4xl font-bold">{{ recipe.outputItem.name }}</h1>
    <h2>Ingrédients</h2>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.item.id">
        <img :src="ingredient.item.icon" alt="" v-if="ingredient.item.icon" />
        {{ ingredient.item.name }} ({{ ingredient.item.quality }}) &times;
        {{ ingredient.quantity }}
      </li>
    </ul> -->
  </div>
</template>
