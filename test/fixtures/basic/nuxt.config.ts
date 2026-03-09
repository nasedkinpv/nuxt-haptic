import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nuxtHaptic: {
    defaultPreset: 'selection',
  },
})
