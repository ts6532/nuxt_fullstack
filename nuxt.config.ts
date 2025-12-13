// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    mongoUri: process.env.MONGODB_URI,
  },

  routeRules: {
    "/": { redirect: { to: "/home", statusCode: 302 } },
    "/admin/**": { ssr: false },
  },

  nitro: {
    storage: {
      uploads: {
        driver: "fs",
        base: "./public/uploads",
      },
    },
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "nuxt-auth-utils",
    "@nuxt/ui",
    "@nuxt/image",
  ],

  experimental: {
    payloadExtraction: true,
  },
});