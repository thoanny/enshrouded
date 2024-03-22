<script setup>
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
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisPagination,
  AisPoweredBy,
} from "vue-instantsearch/vue3/es";
</script>

<template>
  <div class="container mx-auto">
    <div>
      <ais-instant-search :index-name="indexName" :search-client="algolia">
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
        <ais-hits>
          <template v-slot:item="{ item }">
            <button class="" @click="openSearchModal(item.id)">
              <img
                :src="`https://api.lebusmagique.fr/media/cache/resolve/enshrouded_item_icon_48/uploads/api/enshrouded/items/${item.icon}`"
                alt=""
                class="h-10 w-10"
                v-if="item.icon"
              />
              {{ item.name }}
            </button>
          </template>
        </ais-hits>
        <ais-pagination />
        <ais-powered-by theme="dark" />
      </ais-instant-search>
    </div>
    <dialog ref="searchModal" class="modal">
      <div class="modal-box">
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
  @apply grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 mt-4;

  button {
    @apply flex w-full p-4 items-center justify-center bg-base-200 rounded-box gap-2 h-16 text-left;

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
