<script setup>
useSeoMeta({
  title: "Enshrouded",
  ogTitle: "Enshrouded",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});
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
</template>

<style scoped>
h1 {
  @apply text-4xl font-bold mb-6;
}
p {
  @apply text-lg mb-6;
}
</style>
