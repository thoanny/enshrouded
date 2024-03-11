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

        <!-- <ul class="flex flex-col gap-2">
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
          </li>
        </ul> -->
      </div>
      <div class="w-3/4"><slot /></div>
    </div>
    <AppFooter />
  </div>
</template>
