import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { readonly, ref } from 'vue'

import type { NuxtHapticRuntimeConfig, NuxtHaptics } from '../../types'

const noop = async () => {}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const config = Object.freeze({
    ...(runtimeConfig.public.nuxtHaptic as NuxtHapticRuntimeConfig),
  })
  const enabled = ref(config.enabled)

  const nuxtHaptics: NuxtHaptics = {
    config,
    enabled: readonly(enabled),
    isSupported: false,
    cancel: () => {},
    error: noop,
    light: noop,
    selection: noop,
    setEnabled: () => {},
    success: noop,
    toggleEnabled: () => {},
    trigger: noop,
    warning: noop,
  }

  nuxtApp.vueApp.directive('nuxt-haptic', {
    getSSRProps() {
      return {}
    },
  })

  nuxtApp.provide('nuxtHaptics', nuxtHaptics)
})
