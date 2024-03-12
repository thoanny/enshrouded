<script setup>
useSeoMeta({
  title: "Toutes les recettes",
  ogTitle: "Toutes les recettes",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

const { data: categories } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/recipes?order=categories"
);
</script>
<template>
  <div class="container mx-auto flex gap-4 w-full">
    <div class="w-1/4 bg-base-200 rounded-box p-4">
      <div
        class="w-full pr-4 overflow-y-auto scroll"
        style="max-height: calc(100dvh - 12rem)"
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
                <details>
                  <summary>
                    <span class="truncate font-bold">
                      {{ subcategory.name }}
                    </span>
                    <div class="badge badge-neutral badge-sm">
                      {{ subcategory.recipesCount }}
                    </div>
                  </summary>
                  <ul>
                    <li v-for="recipe in subcategory.recipes">
                      <NuxtLink
                        :to="{
                          name: 'recipes-id',
                          params: { id: recipe.id },
                        }"
                        class="italic"
                      >
                        {{ recipe.outputItem.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </details>
              </li>
              <li v-for="recipe in category.recipes">
                <NuxtLink
                  :to="{ name: 'recipes-id', params: { id: recipe.id } }"
                  class="italic"
                >
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
</style>
