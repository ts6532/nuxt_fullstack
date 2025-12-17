// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    mongoUri: process.env.MONGODB_URI,
    adminLogin: process.env.NUXT_ADMIN_LOGIN,
    adminPassword: process.env.NUXT_ADMIN_PASSWORD,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { redirect: "/home" },
    "/admin/**": { ssr: false },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  nitro: {
    storage: {
      uploads: {
        driver: "fs",
        base: "./uploads",
      },
    },
  },

  devtools: {
    enabled: true,
  },

  modules: ["nuxt-auth-utils", "@nuxt/ui", "@nuxt/image", "nuxt-tiptap-editor"],

  experimental: {
    payloadExtraction: true,
  },
});
