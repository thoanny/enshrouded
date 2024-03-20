<script setup>
useSeoMeta({
  title: "Tous les objets",
  ogTitle: "Tous les objets",
  description: `Base de données de recettes d'Enshrouded, jeu de survie coopératif.`,
  ogDescription:
    "Base de données de recettes d'Enshrouded, jeu de survie coopératif.",
});

const source = ref(-1);
const categories = ref([]);

const { data: allCategories } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/recipes"
);

const { data: sources } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/recipes/sources"
);

const compareByName = (a, b) => {
  return a.name.localeCompare(b.name);
};

onMounted(() => {
  categories.value = allCategories.value;
  sources.value.sort(compareByName);
});

watch(source, async (source) => {
  if (source > 0) {
    categories.value = allCategories.value.map((category) => {
      const recipes = category.recipes.filter((recipe) => {
        return recipe.source?.id === source;
      });

      return { ...category, recipes, recipesCount: recipes.length };
    });
  } else {
    categories.value = allCategories.value;
  }
});

const getChildRecipesCount = (category) => {
  const arr = categories.value.filter((c) => c.parentId === category.id);
  let total = 0;
  if (arr.length > 0) {
    arr.forEach((c) => {
      total += c.recipesCount;
    });
  }

  return (total += category.recipesCount);
};
</script>
<template>
  <div
    class="container mx-auto flex flex-col-reverse md:flex-row gap-4 w-full items-start"
  >
    <div class="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-base-200 rounded-box p-4">
      <select class="select select-sm select-bordered mb-4" v-model="source">
        <option value="-1">-- Sources --</option>
        <option v-for="source in sources" :value="source.id" :key="source.id">
          {{ source.name }}
        </option>
      </select>
      <div
        class="w-full pr-2 overflow-y-auto scroll"
        style="max-height: calc(100dvh - 15rem)"
      >
        <ul class="menu text-base p-0">
          <li
            v-for="category in categories.filter((c) => !c.parentId)"
            :key="category.id"
          >
            <h2
              class="menu-title uppercase"
              v-if="getChildRecipesCount(category)"
            >
              {{ category.name }}
            </h2>
            <ul v-if="getChildRecipesCount(category)">
              <li
                v-for="subcategory in categories.filter(
                  (c) => c.parentId === category.id
                )"
                :key="subcategory.id"
              >
                <details v-if="subcategory.recipesCount > 0">
                  <summary>
                    {{ subcategory.name }}
                    <span class="badge badge-sm badge-primary">{{
                      subcategory.recipesCount
                    }}</span>
                  </summary>
                  <ul v-if="subcategory.recipesCount > 0">
                    <li v-for="recipe in subcategory.recipes" :key="recipe.id">
                      <NuxtLink
                        :to="{
                          name: 'recipes-id',
                          params: { id: recipe.id },
                        }"
                        class="italic"
                      >
                        <img
                          :src="`https://api.lebusmagique.fr${recipe.outputItem.icon24x24}`"
                          :alt="recipe.outputItem.name"
                          class="w-6 h-6 rounded"
                          width="24"
                          height="24"
                          v-if="recipe.outputItem.icon24x24"
                        />
                        {{ recipe.outputItem.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </details>
              </li>
              <li v-for="recipe in category.recipes" :key="recipe.id">
                <NuxtLink
                  :to="{ name: 'recipes-id', params: { id: recipe.id } }"
                  class="italic"
                >
                  <img
                    :src="`https://api.lebusmagique.fr${recipe.outputItem.icon24x24}`"
                    :alt="recipe.outputItem.name"
                    class="w-6 h-6 rounded"
                    width="24"
                    height="24"
                    v-if="recipe.outputItem.icon24x24"
                  />
                  {{ recipe.outputItem.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-2/3 2xl:w-3/4">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.scroll::-webkit-scrollbar-track {
  border-radius: 0.5rem;
}
:where(.menu li:empty) {
  opacity: 0;
  border: none;
  margin: 0;
}
</style>
