<script setup>
const menuModal = ref();
</script>

<template>
  <div
    class="bg-accent-content p-4 h-16 flex gap-4 justify-between items-center"
  >
    <NuxtLink :to="{ name: 'index' }" class="text-xs font-semibold relative">
      <img
        src="~/assets/img/enshrouded-logo.svg"
        alt=""
        class="h-auto w-36 -mt-4 shrink-0"
      />
      <span class="absolute top-2 left-6">Base de données</span>
    </NuxtLink>
    <ul class="hidden lg:flex h-full items-center gap-4 font-bold">
      <li><NuxtLink :to="{ name: 'items' }">Objets</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'recipes' }">Recettes</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'about' }">À propos</NuxtLink></li>
    </ul>
    <span class="w-auto md:w-36 shrink-0 flex justify-end gap-2">
      <a
        href="https://github.com/thoanny/enshrouded"
        target="_blank"
        class="btn btn-circle btn-sm hidden lg:inline-flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          class="h-4 w-4"
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
      </a>
      <a
        href="https://patreon.com/thoanny"
        target="_blank"
        class="btn btn-circle btn-sm hidden lg:inline-flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="h-4 w-4"
        >
          <path
            fill="currentColor"
            d="M489.7 153.8c-.1-65.4-51-119-110.7-138.3C304.8-8.5 207-5 136.1 28.4C50.3 68.9 23.3 157.7 22.3 246.2C21.5 319 28.7 510.6 136.9 512c80.3 1 92.3-102.5 129.5-152.3c26.4-35.5 60.5-45.5 102.4-55.9c72-17.8 121.1-74.7 121-150z"
          />
        </svg>
      </a>
      <button
        class="btn btn-circle inline-flex lg:hidden"
        @click="menuModal.showModal()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </span>
    <dialog ref="menuModal" class="modal">
      <div class="modal-box p-0" style="max-width: 14rem">
        <ul class="menu menu-lg w-full font-bold">
          <li tabindex="0">
            <NuxtLink :to="{ name: 'index' }" @click="menuModal.close()">
              Accueil
            </NuxtLink>
          </li>
          <li tabindex="0">
            <NuxtLink :to="{ name: 'items' }" @click="menuModal.close()">
              Objets
            </NuxtLink>
          </li>
          <li tabindex="0">
            <NuxtLink :to="{ name: 'recipes' }" @click="menuModal.close()">
              Recettes
            </NuxtLink>
          </li>
          <li tabindex="0">
            <NuxtLink :to="{ name: 'about' }" @click="menuModal.close()">
              À propos
            </NuxtLink>
          </li>
          <li tabindex="0">
            <a
              href="https://github.com/thoanny/enshrouded"
              target="_blank"
              class=""
            >
              Code source
            </a>
          </li>
          <li tabindex="0">
            <a href="https://patreon.com/thoanny" target="_blank" class="">
              Soutenir le projet
            </a>
          </li>
        </ul>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-white;
}

dialog .menu a {
  @apply justify-center;
}
</style>
