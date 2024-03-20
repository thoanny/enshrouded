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
  site: {
    url: "https://enshrouded.vercel.app",
  },
  sitemap: {
    sources: ["http://127.0.0.1:8000/api/enshrouded/sitemap"],
  },
  modules: ["@nuxtjs/mdc", "@nuxtjs/sitemap"],
});
