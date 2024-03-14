<script setup>
useSeoMeta({
  title: "Toutes les recettes",
  ogTitle: "Toutes les recettes",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

const source = ref(-1);
const categories = ref([]);

const { data: allCategories } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/recipes"
);

const { data: sources } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/recipes/sources"
);

onMounted(() => {
  categories.value = allCategories.value;
});
</script>
<template>
  <div class="container mx-auto flex gap-4 w-full">
    <div class="w-1/4 bg-base-200 rounded-box p-4">
      <select class="select select-sm select-bordered mb-4" v-model="source">
        <option value="-1">-- Sources --</option>
        <option value="0">Fabrication manuelle</option>
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
            <h2 class="menu-title uppercase">{{ category.name }}</h2>

            <ul>
              <li
                v-for="subcategory in categories.filter(
                  (c) => c.parentId === category.id
                )"
                :key="subcategory.id"
              >
                <h2 class="menu-title font-semibold">
                  {{ subcategory.name }}
                </h2>
                <ul>
                  <li v-for="recipe in subcategory.recipes" :key="recipe.id">
                    <NuxtLink
                      :to="{
                        name: 'recipes-id',
                        params: { id: recipe.id },
                      }"
                      class="italic"
                      v-if="
                        source < 0 ||
                        (source === 0 &&
                          typeof recipe.source.id == 'undefined') ||
                        (source > 0 && recipe.source?.id === source)
                      "
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
              <li v-for="recipe in category.recipes" :key="recipe.id">
                <NuxtLink
                  :to="{ name: 'recipes-id', params: { id: recipe.id } }"
                  class="italic"
                  v-if="
                    source < 0 ||
                    (source === 0 && typeof recipe.source.id == 'undefined') ||
                    (source > 0 && recipe.source?.id === source)
                  "
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
    <div class="w-3/4"><NuxtPage /></div>
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
