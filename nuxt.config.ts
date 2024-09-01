import vueCssModule from 'vite-plugin-vue-css-module'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
  ],

  css: ['~/assets/style/main.scss'],

  vite: {
    plugins: [
      vueCssModule(),
    ],
  },

  // Override in .env with NUXT_ prefix, i.e. NUXT_DATABASE_URL
  runtimeConfig: {
    databaseUrl: '',
    jwtSecret: '',
  },
})
