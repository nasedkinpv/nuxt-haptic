export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  nuxtHaptic: {
    defaultPreset: 'selection',
    touchOnly: false,
    debug: true,
  },
})
