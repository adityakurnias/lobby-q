declare const process: any

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800],
      Outfit: [400, 500, 600, 700, 900],
      'Space Mono': [400, 700],
    },
    display: 'swap',
    prefetch: true,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
    },
  },

  app: {
    head: {
      htmlAttrs: { class: 'light' },
      title: 'LobbyQ',
      meta: [
        { name: 'description', content: 'Sistem manajemen antrean mabar untuk streamer game online' },
      ],
    },
  },
})
