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
  <div class="p-4 container mx-auto flex gap-4 w-full">
    <!-- <pre>
        {{ categories }}
      </pre> -->
    <div class="w-1/4">
      <ul class="menu bg-base-200 w-full rounded-box">
        <li
          v-for="category in categories.filter((c) => !c.parentId)"
          :key="category.id"
        >
          <details>
            <summary class="font-bold">{{ category.name }}</summary>
            <ul>
              <li
                v-for="subcategory in categories.filter(
                  (c) => c.parentId === category.id
                )"
                :key="subcategory.id"
              >
                <details>
                  <summary class="font-bold">{{ subcategory.name }}</summary>
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
          </details>
        </li>
      </ul>
    </div>
    <div class="w-3/4"><NuxtPage /></div>
  </div>
</template>
