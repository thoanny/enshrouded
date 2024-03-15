<script setup>
const route = useRoute();

const { data: recipe } = await useFetch(
  `https://api.lebusmagique.fr/api/enshrouded/recipes/${route.params.id}`
);

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
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="w-full lg:w-3/5">
      <ItemDetails :item="recipe.outputItem" />
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
                    : `https://api.lebusmagique.fr${requirement.source.item.icon48x48}`
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
                    : requirement.source.item.icon48x48
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
            <div class="flex gap-2 items-center">
              <img
                :src="`https://api.lebusmagique.fr${ingredient.item.icon48x48}`"
                :alt="ingredient.item.name"
                class="w-12 h-12 bg-black bg-opacity-25 rounded-lg"
                width="48"
                height="48"
                v-if="ingredient.item.icon48x48"
              />
              <span>{{ ingredient.item.name }}</span>
            </div>
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
