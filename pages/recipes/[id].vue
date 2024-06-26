<script setup>
const route = useRoute();

const { data: recipe } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/recipes/${route.params.id}`
);

const seoDescription = recipe.value.outputItem.description
  ? recipe.value.outputItem.description
      .split("---")
      .pop()
      .replace(/<[^>]*>?/gm, "")
      .replace(/\r?\n|\r/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  : "Base de données de recettes d'Enshrouded, jeu de survie coopératif.";

useSeoMeta({
  title: `Recette : ${recipe.value.outputItem.name}`,
  ogTitle: `Recette : ${recipe.value.outputItem.name}`,
  description: seoDescription,
  ogDescription: seoDescription,
});

const quality = {
  common: "#e1f3d2",
  uncommon: "#53d57d",
  rare: "#a8e1ff",
  epic: "#d4b5ff",
  legendary: "#ffe03e",
};

defineOgImageComponent("EnshroudedSeo", {
  headline: "Recette",
  title: recipe.value.outputItem.name,
  theme: quality[recipe.value.outputItem.quality],
  description: seoDescription,
  icon: recipe.value.outputItem.icon
    ? `https://api.lebusmagique.fr/uploads/api/enshrouded/items/${recipe.value.outputItem.icon}`
    : null,
});
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="w-full lg:w-3/5">
      <ItemDetails
        :item="recipe.outputItem"
        :quantity="recipe.outputQuantity"
      />
    </div>
    <div class="w-full lg:w-2/5">
      <div
        v-if="recipe.requirements.length > 0"
        class="border rounded-box border-neutral p-4 mb-4"
      >
        <h2 class="text-xl font-bold mb-4 leading-4">Exigences</h2>
        <div class="flex flex-col gap-2">
          <div
            class="flex gap-4 items-center justify-between text-lg"
            v-for="requirement in recipe.requirements"
          >
            <div class="flex gap-2 items-center">
              <img
                :src="
                  requirement.source.npc
                    ? `https://api.lebusmagique.fr/uploads/api/enshrouded/items/${requirement.source.npc.icon}`
                    : `https://api.lebusmagique.fr/media/cache/enshrouded_item_icon_48/uploads/api/enshrouded/items/${requirement.source.item.icon}`
                "
                :alt="
                  requirement.source.npc
                    ? requirement.source.npc.name
                    : requirement.source.item.name
                "
                class="w-12 h-12 bg-black bg-opacity-25 rounded-lg"
                width="48"
                height="48"
                v-if="
                  requirement.source.npc
                    ? requirement.source.npc.icon
                    : requirement.source.item.icon
                "
              />
              <span>{{
                requirement.source.npc
                  ? requirement.source.npc.name
                  : requirement.source.item.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="border rounded-box border-neutral p-4">
        <h2 class="text-xl font-bold mb-4 leading-4">Ressources</h2>
        <div class="flex flex-col gap-2">
          <div
            class="flex gap-4 items-center justify-between text-lg"
            v-for="ingredient in recipe.ingredients"
          >
            <NuxtLink
              :to="{ name: 'items-id', params: { id: ingredient.item.id } }"
              class="flex gap-2 items-center hover:text-white"
            >
              <img
                :src="`https://api.lebusmagique.fr/media/cache/enshrouded_item_icon_48/uploads/api/enshrouded/items/${ingredient.item.icon}`"
                :alt="ingredient.item.name"
                class="w-12 h-12 bg-black bg-opacity-25 rounded-lg"
                width="48"
                height="48"
                v-if="ingredient.item.icon"
              />
              <span>{{ ingredient.item.name }}</span>
            </NuxtLink>

            <div>&times;&nbsp;{{ ingredient.quantity }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{ recipe.requirements }}</pre> -->
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
