<script setup>
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisPagination,
  AisPoweredBy,
  AisRefinementList,
} from "vue-instantsearch/vue3/es";

const searchModal = ref();
const item = ref(null);

const openSearchModal = async (itemId) => {
  item.value = await $fetch(
    `https://api.lebusmagique.fr/api/enshrouded/items/${itemId}`
  );
  searchModal.value.showModal();
};

const indexName = "prod_enshrouded_items";
const algolia = useAlgoliaRef();
</script>

<template>
  <div class="container mx-auto">
    <div>
      <ais-instant-search
        :index-name="indexName"
        :search-client="algolia"
        :future="{ preserveSharedStateOnUnmount: true }"
      >
        <ais-search-box placeholder="Chercher un objet...">
          <template v-slot:submit-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          <template v-slot:reset-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
              />
            </svg>
          </template>
        </ais-search-box>
        <div class="flex flex-col-reverse lg:flex-row gap-6 items-start mt-4">
          <div class="w-full lg:w-2/5 xl:w-1/4">
            <div class="rounded-box bg-base-200 p-4">
              <h4 class="text-xl font-bold leading-5 mb-2">Catégories</h4>
              <ais-refinement-list
                attribute="category.name"
                :sort-by="['isRefined', 'name:asc']"
                show-more
              >
                <template
                  v-slot="{
                    items,
                    isShowingMore,
                    isFromSearch,
                    canToggleShowMore,
                    refine,
                    toggleShowMore,
                  }"
                >
                  <ul>
                    <li v-if="isFromSearch && !items.length">No results.</li>
                    <li v-for="item in items" :key="item.value">
                      <div class="form-control">
                        <label
                          class="label cursor-pointer justify-start gap-2 py-1"
                          @click.prevent="refine(item.value)"
                        >
                          <input
                            type="checkbox"
                            :checked="item.isRefined"
                            class="checkbox checkbox-sm checkbox-secondary"
                          />
                          <span class="">
                            {{ item.label }}
                            <span class="badge badge-sm badge-neutral">
                              {{ item.count.toLocaleString() }}
                            </span>
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                  <button
                    @click="toggleShowMore"
                    v-if="canToggleShowMore"
                    class="btn btn-outline btn-sm mt-2"
                  >
                    {{ !isShowingMore ? "Afficher plus" : "Afficher moins" }}
                  </button>
                </template>
              </ais-refinement-list>
              <h4 class="text-xl font-bold leading-5 mb-2 mt-4">Recettes</h4>
              <ais-refinement-list attribute="hasRecipes">
                <template v-slot="{ items, isFromSearch, refine }">
                  <ul>
                    <li v-if="isFromSearch && !items.length">No results.</li>
                    <li v-for="item in items" :key="item.value">
                      <div class="form-control">
                        <label
                          class="label cursor-pointer justify-start gap-2 py-1"
                          @click.prevent="refine(item.value)"
                        >
                          <input
                            type="checkbox"
                            :checked="item.isRefined"
                            class="checkbox checkbox-sm checkbox-secondary"
                          />
                          <span class="">
                            {{
                              item.value === "true"
                                ? "Avec recette"
                                : "Sans recette"
                            }}
                            <span class="badge badge-sm badge-neutral">
                              {{ item.count.toLocaleString() }}
                            </span>
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </template>
              </ais-refinement-list>
              <h4 class="text-xl font-bold leading-5 mb-2 mt-4">Qualités</h4>
              <ais-refinement-list attribute="qualityName">
                <template v-slot="{ items, isFromSearch, refine }">
                  <ul>
                    <li v-if="isFromSearch && !items.length">No results.</li>
                    <li v-for="item in items" :key="item.value">
                      <div class="form-control">
                        <label
                          class="label cursor-pointer justify-start gap-2 py-1"
                          @click.prevent="refine(item.value)"
                        >
                          <input
                            type="checkbox"
                            :checked="item.isRefined"
                            class="checkbox checkbox-sm checkbox-secondary"
                          />
                          <span class="">
                            {{ item.label }}
                            <span class="badge badge-sm badge-neutral">
                              {{ item.count.toLocaleString() }}
                            </span>
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </template>
              </ais-refinement-list>
            </div>
          </div>
          <div class="w-full lg:w-3/5 xl:w-3/4">
            <ais-hits>
              <template v-slot:item="{ item }">
                <button class="" @click="openSearchModal(item.id)">
                  <img
                    :src="`https://api.lebusmagique.fr/media/cache/enshrouded_item_icon_96/uploads/api/enshrouded/items/${item.icon}`"
                    alt=""
                    class="w-full aspect-square shrink-0"
                    loading="lazy"
                    v-if="item.icon"
                  />
                  <span class="text-sm p-2" v-else>{{ item.name }}</span>
                </button>
              </template>
            </ais-hits>
            <ais-pagination />
            <ais-powered-by theme="dark" />
          </div>
        </div>
      </ais-instant-search>
    </div>
    <dialog ref="searchModal" class="modal">
      <div class="modal-box p-0">
        <ItemDetails v-if="item" :item="item" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style lang="scss">
.ais-SearchBox-form {
  @apply flex items-center gap-2;
}

.ais-SearchBox-input {
  @apply input input-bordered input-sm sm:input-md flex-1;
}

.ais-SearchBox-submit {
  @apply btn btn-primary btn-sm sm:btn-md btn-square;
}

.ais-SearchBox-reset {
  @apply btn btn-neutral btn-sm sm:btn-md btn-square;

  &[hidden] {
    @apply hidden;
  }
}

.ais-Hits-list {
  @apply grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-2 w-full overflow-y-auto;

  button {
    @apply rounded-xl aspect-square w-full flex flex-col items-center justify-center text-center overflow-hidden border border-neutral;

    &:hover {
      @apply bg-base-300;
    }
  }
}

.ais-Pagination-list {
  @apply gap-2 my-6 w-full flex justify-center;

  li span,
  li a {
    @apply join-item btn btn-square;
  }

  li a {
    @apply btn-neutral;
  }

  li span {
    @apply btn-disabled;
  }

  li.ais-Pagination-item--selected {
    a {
      @apply btn-primary;
    }
  }

  li.ais-Pagination-item--page:not(.ais-Pagination-item--selected) {
    @apply hidden;
  }

  @screen sm {
    li.ais-Pagination-item--page:not(.ais-Pagination-item--selected) {
      @apply block;
    }
  }
}

.ais-PoweredBy-link {
  @apply inline-block mx-auto my-4;
}
</style>
