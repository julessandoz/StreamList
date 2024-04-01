// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/scss/main.scss', '~/assets/css/nuxt-google-fonts.css'],
  googleFonts: {
    families: {
      'Josefin+Sans': true,
      'Merriweather+Sans': [300, 400],
    },
    display: 'swap',
    download: true,
    outputDir: '~/assets/',
  }

})
