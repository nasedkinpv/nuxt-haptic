import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nuxtHaptic: {
    defaultPreset: [{ duration: 12, intensity: 0.4 }],
  },
})
