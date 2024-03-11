<script setup>
const { data: categories } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded/recipes?order=categories"
);
</script>

<template>
  <div>
    <AppHeader />
    <div class="p-4 container mx-auto flex gap-4 w-full">
      <!-- <pre>
        {{ categories }}
      </pre> -->
      <div class="w-1/3">
        <ul class="flex flex-col gap-2">
          <li
            v-for="category in categories.filter((c) => {
              return !c.parentId;
            })"
            class="border p-2"
            :key="category.id"
          >
            <strong>- {{ category.name }}</strong>
            <ul>
              <li
                v-for="subcategory in categories.filter((c) => {
                  return c.parentId === category.id;
                })"
                class="border p-2"
                :key="subcategory.id"
              >
                <strong>- - {{ subcategory.name }}</strong>
                <ul>
                  <li v-for="recipe in subcategory.recipes">
                    <em>{{ recipe.outputItem.name }}</em>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li v-for="recipe in category.recipes">
                <NuxtLink
                  :to="{ name: 'recipes-id', params: { id: recipe.id } }"
                  >{{ recipe.outputItem.name }}</NuxtLink
                >
              </li>
            </ul>
            <!-- <NuxtLink :to="{ name: 'recipes-id', params: { id: 1 } }">
            Recette 1
          </NuxtLink> -->
          </li>
        </ul>
      </div>
      <div class="w-2/3"><slot /></div>
    </div>
    <AppFooter />
  </div>
</template>
