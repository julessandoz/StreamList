// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appURL: process.env.APP_URL || 'http://localhost:3000'
    }
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/landing',
      callback: '/confirm',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    }
  },
  modules: ["nuxt-icon", "@nuxt/image", "@nuxtjs/google-fonts", '@pinia/nuxt', '@nuxtjs/supabase'],
  css: ["~/assets/scss/main.scss", "~/assets/css/nuxt-google-fonts.css"],
  googleFonts: {
    families: {
      "Josefin+Sans": true,
      "Merriweather+Sans": [300, 400],
    },
    display: "swap",
    download: true,
    outputDir: "~/assets/",
  },
  image: {
    formats: ["webp", "avif"],
    providers: {
      tmdb: {
        provider: "~/providers/tmdb.ts",
        options: {
          baseURL: "https://image.tmdb.org/t/p/original",
        },
      },
    },
  },
});
