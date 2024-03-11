<script setup>
const route = useRoute();

const { data: recipe } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/recipes/${route.params.id}`
);

definePageMeta({
  layout: "recipes",
});
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">{{ recipe.outputItem.name }}</h1>
    <!-- <pre>{{ recipe }}</pre> -->
    <h2>Ingrédients</h2>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.item.id">
        <img :src="ingredient.item.icon" alt="" v-if="ingredient.item.icon" />
        {{ ingredient.item.name }} ({{ ingredient.item.quality }}) &times;
        {{ ingredient.quantity }}
      </li>
    </ul>
  </div>
</template>
