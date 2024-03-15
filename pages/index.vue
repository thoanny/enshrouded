<script setup>
useSeoMeta({
  title: "Enshrouded",
  ogTitle: "Enshrouded",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

const { data: stats } = await useFetch(
  "https://api.lebusmagique.fr/api/enshrouded"
);

const roadmap = [
  {
    title: "Structure des données",
    completed: true,
  },
  {
    title: "Interface d'administration",
    completed: true,
  },
  {
    title: "Ajout des personnages",
    completed: true,
  },
  {
    title: "Ajout des catégories",
    completed: true,
  },
  {
    title: "Ajout des objets",
    completed: false,
  },
  {
    title: "Ajout des recettes",
    completed: false,
  },
  {
    title: 'Rubrique "Histoire"',
    completed: false,
  },
  {
    title: 'Rubrique "Carte interactive"',
    completed: false,
  },
  {
    title: "...",
    completed: false,
  },
];
</script>
<template>
  <div class="max-w-xl mx-auto">
    <h1>Base de données Enshrouded</h1>
    <p>
      Bienvenue Flameborns&nbsp;! Vous trouverez dans cette base de données des
      informations et outils pour accompagner vos sessions sur le jeu
      <a href="https://enshrouded.com" target="_blank" class="underline"
        >Enshrouded</a
      >, développé et édité par
      <a href="https://www.keengames.com" target="_blank" class="underline"
        >Keen games</a
      >.
    </p>
  </div>
  <div class="max-w-xl mx-auto mb-6">
    <div
      class="flex flex-col md:flex-row gap-2 md:gap-4 font-semibold uppercase"
    >
      <NuxtLink class="btn w-full md:w-1/2" :to="{ name: 'items' }">
        {{ stats.items }} objets
      </NuxtLink>
      <NuxtLink class="btn w-full md:w-1/2" :to="{ name: 'recipes' }">
        {{ stats.recipes }} recettes
      </NuxtLink>
    </div>
  </div>
  <div class="max-w-2xl mx-auto mb-6">
    <img
      src="~/assets/img/enshrouded-hero.jpg"
      class="rounded-lg aspect-video w-full h-full object-cover shadow"
      alt=""
    />
  </div>
  <div class="max-w-xs mx-auto mb-6">
    <div role="alert" class="alert flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Jeu en accès anticipé</span>
    </div>
  </div>

  <div class="max-w-xl mx-auto">
    <p>
      Enshrouded est un jeu de survie coopératif pour 1 à 16 personnes.
      Explorez, fabriquez, combattez, bâtissez votre fief dans le vaste royaume
      d'Embervale. Choisissez votre chemin et forgez votre destin.
    </p>
  </div>

  <div class="max-w-xl mx-auto mb-6">
    <h2>Feuille de route de notre projet</h2>
    <ul class="timeline timeline-vertical">
      <li v-for="(item, i) in roadmap" :key="item.title">
        <hr :class="{ 'bg-success': item.completed }" />
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
            :class="{ 'text-success': item.completed }"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="timeline-box"
          :class="{
            'timeline-end': i % 2 === 0,
            'timeline-start': i % 2 === 1,
            'border-success': item.completed,
          }"
          :data-modulo="i % 2"
        >
          {{ item.title }}
        </div>
        <hr :class="{ 'bg-success': item.completed }" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  @apply text-4xl font-bold mb-6 mt-2;
}
h2 {
  @apply text-3xl font-bold mb-6 mt-2;
}
p {
  @apply text-lg mb-6;
}
</style>
