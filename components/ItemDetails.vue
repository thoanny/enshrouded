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
  <div class="border rounded-box border-neutral p-4">
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
        class="w-64 h-64 absolute z-10 top-0 right-0 rounded-box -mr-4 -mt-4"
        width="256"
        height="256"
        v-if="item.icon"
      />
    </header>
    <div
      :class="`text-quality-${item.quality} border-b-2 border-quality-${item.quality} uppercase font-semibold pb-2 px-4 -mx-4 -mt-12`"
    >
      {{ quality[item.quality] }}
    </div>
    <div class="overflow-hidden min-h-20 relative pt-12">
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

        <div role="alert" class="alert mt-4 text-base" v-if="item.comment">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="stroke-primary shrink-0 w-6 h-6 self-start"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <div>
            <MDC :value="item.comment" class="comment" />
          </div>
        </div>
      </div>
      <div
        v-if="item.recipes?.length > 0"
        :class="{ 'mb-4': item.recipeIngredients?.length > 0 }"
      >
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
      <div v-if="item.recipeIngredients?.length > 0">
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
.description p {
  @apply mb-4;
}

.comment p {
  @apply mb-2;
}

.description p:last-of-type,
.comment p:last-of-type {
  @apply mb-0;
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
