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
        width="256"
        height="256"
        v-if="item.icon"
      />
    </header>
    <div
      :class="`text-quality-${item.quality} border-b-2 border-quality-${item.quality} uppercase font-semibold pb-2`"
    >
      {{ quality[item.quality] }}
    </div>
    <div class="overflow-hidden min-h-20 relative pt-14">
      <div
        class="w-72 h-72 blur-xl rounded-full mx-auto -mt-80 opacity-25"
        :class="`bg-quality-${item.quality}`"
      ></div>
      <div class="text-lg drop-shadow-sm">
        <MDC
          :value="item.description"
          v-if="item.description"
          class="description"
        />
        <MDC :value="item.comment" v-if="item.comment" class="comment" />
      </div>
      <div v-if="item.recipes?.length > 0" class="mb-4">
        <h2 class="text-xl font-bold mb-4 leading-4">
          {{ item.recipes.length > 1 ? "Recettes" : "Recette" }}
        </h2>
        <div>
          <NuxtLink
            v-for="recipe in item.recipes"
            :to="{ name: 'recipes-id', params: { id: recipe.id } }"
            :key="recipe.id"
            class="btn btn-sm btn-outline"
          >
            {{ recipe.name }}
          </NuxtLink>
        </div>
      </div>
      <div v-if="item.recipeIngredients?.length > 0" class="mb-4">
        <h2 class="text-xl font-bold mb-4 leading-4">
          {{
            item.recipeIngredients.length > 1
              ? "Ingrédient utilisé dans les recettes"
              : "Ingrédient utilisé dans la recette"
          }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="ingredient in item.recipeIngredients"
            :to="{ name: 'recipes-id', params: { id: ingredient.recipe.id } }"
            :key="ingredient.recipe.id"
            class="btn btn-sm btn-outline"
          >
            {{ ingredient.recipe.name }}
            <small>&times;{{ ingredient.quantity }}</small>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.description p,
.comment p {
  @apply mb-4;
}
.description kbd,
.comment kbd {
  @apply kbd kbd-md;
}
.description hr,
.comment hr {
  @apply w-8 border-neutral border-t-2 mb-4;
}
</style>
