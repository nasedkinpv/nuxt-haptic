import {
  addImportsDir,
  addPlugin,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import { defu } from 'defu'

import type { NuxtHapticRuntimeConfig } from './runtime/types'

export type {
  HapticDirectiveBinding,
  HapticDirectiveValue,
  HapticEventName,
  HapticInput,
  HapticPattern,
  HapticPreset,
  NuxtHapticRuntimeConfig,
  NuxtHaptics,
  TriggerOptions,
  Vibration,
} from './runtime/types'

export type ModuleOptions = NuxtHapticRuntimeConfig

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-haptic',
    configKey: 'nuxtHaptic',
    compatibility: {
      nuxt: '^4.0.0',
    },
  },
  defaults: {
    defaultPreset: 'selection',
    debug: false,
    enabled: true,
    persistPreference: true,
    preferenceStorageKey: 'nuxt-haptic:enabled',
    showSwitch: false,
    touchOnly: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const runtimeOptions = defu(
      nuxt.options.runtimeConfig.public.nuxtHaptic as Partial<ModuleOptions> | undefined,
      options,
    ) as ModuleOptions

    nuxt.options.runtimeConfig.public.nuxtHaptic = runtimeOptions

    addPlugin({
      src: resolver.resolve('./runtime/plugins/nuxt-haptic.client'),
      mode: 'client',
    })

    addPlugin({
      src: resolver.resolve('./runtime/plugins/nuxt-haptic.server'),
      mode: 'server',
    })

    addImportsDir(resolver.resolve('./runtime/composables'))

    const typeTemplate = addTypeTemplate({
      filename: 'types/nuxt-haptic.d.ts',
      getContents: () => `
import type { NuxtHaptics } from "nuxt-haptic";

declare module "#app" {
  interface NuxtApp {
    $nuxtHaptics: NuxtHaptics;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $nuxtHaptics: NuxtHaptics;
  }
}

export {};
      `.trim(),
    })

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: typeTemplate.dst })
    })
  },
})
