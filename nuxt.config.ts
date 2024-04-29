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
    name: "Base de données Enshrouded",
    url: "https://enshrouded.vercel.app",
  },
  sitemap: {
    sources: ["https://api.lebusmagique.fr/api/enshrouded/sitemap"],
  },
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    instantSearch: {
      theme: "reset",
    },
  },
  auth: {
    baseURL: "http://localhost:8000/api",
    provider: {
      type: "refresh",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "get" },
        signUp: { path: "/register", method: "post" },
        getSession: { path: "/user", method: "get" },
        refresh: { path: "/login/refresh", method: "post" },
      },
      pages: {
        login: "/login",
      },
      token: { signInResponseTokenPointer: "/token" },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/refresh_token",
        refreshRequestTokenPointer: "/refresh_token",
      },
    },
  },
  modules: [
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "nuxt-icon",
    "@nuxtjs/algolia",
    "nuxt3-leaflet",
    "@sidebase/nuxt-auth",
  ],
});
