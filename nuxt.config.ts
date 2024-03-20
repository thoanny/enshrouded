// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "google-site-verification",
          content: "YrP2hR-VHPoAqSy2Bw9JxNQLBXNelDPaDJkwqAuudKM",
        },
      ],
    },
  },
  site: {
    url: "https://enshrouded.vercel.app",
  },
  sitemap: {
    sources: ["https://api.lebusmagique.fr/api/enshrouded/sitemap"],
  },
  modules: ["@nuxtjs/mdc", "@nuxtjs/sitemap"],
});
