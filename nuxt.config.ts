// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  $development: {
    runtimeConfig: {
      backendURL: "http://127.0.0.1:5000",
    },
  },
  $production: {
    runtimeConfig: {
      backendURL: "https://ripwords.pythonanywhere.com",
    },
  },
  runtimeConfig: {
    secret: "MindHiveTest",
  },
  imports: {
    dirs: ["composables/**", "utils/**"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      title: "MindHive Subway",
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      // Meta tags for PWAs
      // meta: metaTags,
      // Link tags for PWA splashscreens on iOS
      // link: linkTags,
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  pinia: {
    storesDirs: ["./store/**"],
  },
  // Quasar UI configurations
  quasar: {
    plugins: ["Notify"],
    config: {
      brand: {
        primary: "#F8F8F8",
        secondary: "#6fbfa8",
        accent: "#1c588c",

        dark: "#272a34",

        positive: "#81e3af",
        negative: "#d13f50",
        info: "#89bad6",
        warning: "#ffc878",
      },
    },
  },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
    "nuxt-quasar-ui",
    "nuxt3-leaflet",
    "@vueuse/nuxt",
    "nuxt-icon",
  ],
})
