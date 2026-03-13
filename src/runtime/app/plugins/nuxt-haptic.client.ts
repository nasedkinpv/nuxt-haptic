import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { readonly, ref } from 'vue'
import { WebHaptics } from 'web-haptics'
import type { HapticInput, TriggerOptions } from 'web-haptics'

import type {
  HapticDirectiveBinding,
  HapticDirectiveValue,
  HapticEventName,
  NuxtHapticRuntimeConfig,
  NuxtHaptics,
} from '../../types'

const DEFAULT_EVENT: HapticEventName = 'click'
const DEFAULT_INPUT: HapticInput = 'selection'
const DIRECTIVE_STATE = Symbol('nuxt-haptic-state')

type HapticElement = HTMLElement & {
  [DIRECTIVE_STATE]?: {
    eventName: HapticEventName
    handler: EventListener
  }
}

const isDirectiveBinding = (
  value: HapticDirectiveValue,
): value is HapticDirectiveBinding => {
  return Boolean(
    value
    && typeof value === 'object'
    && !Array.isArray(value)
    && (
      'input' in value
      || 'on' in value
      || 'intensity' in value
      || 'disabled' in value
      || 'touchOnly' in value
    ),
  )
}

const isTouchCapableDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const hasCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
  return hasCoarsePointer || navigator.maxTouchPoints > 0
}

const isPrimaryActivation = (event: Event) => {
  if (event.defaultPrevented) {
    return false
  }

  if (event instanceof PointerEvent) {
    return event.isPrimary && event.button <= 0
  }

  if (event instanceof MouseEvent) {
    return event.button <= 0
  }

  return true
}

const removeDirectiveHandler = (element: HapticElement) => {
  const state = element[DIRECTIVE_STATE]

  if (!state) {
    return
  }

  element.removeEventListener(state.eventName, state.handler)
  element[DIRECTIVE_STATE] = undefined
}

const resolveDirectiveBinding = (
  value: HapticDirectiveValue,
  touchOnly: boolean,
): HapticDirectiveBinding => {
  if (!value) {
    return {
      disabled: true,
      on: DEFAULT_EVENT,
      touchOnly,
    }
  }

  if (isDirectiveBinding(value)) {
    return {
      on: DEFAULT_EVENT,
      touchOnly,
      ...value,
    }
  }

  return {
    input: value,
    on: DEFAULT_EVENT,
    touchOnly,
  }
}

const readStoredPreference = (config: NuxtHapticRuntimeConfig) => {
  if (!config.persistPreference) {
    return config.enabled
  }

  try {
    const storedPreference = window.localStorage.getItem(config.preferenceStorageKey)

    if (storedPreference === null) {
      return config.enabled
    }

    return storedPreference === '1'
  }
  catch {
    return config.enabled
  }
}

const writeStoredPreference = (config: NuxtHapticRuntimeConfig, enabled: boolean) => {
  if (!config.persistPreference) {
    return
  }

  try {
    window.localStorage.setItem(config.preferenceStorageKey, enabled ? '1' : '0')
  }
  catch {
    // Ignore storage failures in private mode and embedded browsers.
  }
}

const setupDirectiveHandler = (
  element: HapticElement,
  value: HapticDirectiveValue,
  config: NuxtHapticRuntimeConfig,
  nuxtHaptics: NuxtHaptics,
) => {
  removeDirectiveHandler(element)

  const resolvedBinding = resolveDirectiveBinding(value, config.touchOnly)

  if (resolvedBinding.disabled) {
    return
  }

  const eventName = resolvedBinding.on ?? DEFAULT_EVENT
  const handler: EventListener = (event) => {
    if (!isPrimaryActivation(event)) {
      return
    }

    if ((resolvedBinding.touchOnly ?? config.touchOnly) && !isTouchCapableDevice()) {
      return
    }

    void nuxtHaptics.trigger(
      resolvedBinding.input ?? config.defaultPreset ?? DEFAULT_INPUT,
      resolvedBinding.intensity !== undefined
        ? { intensity: resolvedBinding.intensity }
        : undefined,
    )
  }

  element.addEventListener(eventName, handler)
  element[DIRECTIVE_STATE] = {
    eventName,
    handler,
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const config = Object.freeze({
    ...(runtimeConfig.public.nuxtHaptic as NuxtHapticRuntimeConfig),
  })

  const instance = new WebHaptics({
    debug: config.debug,
    showSwitch: config.showSwitch,
  })
  const enabled = ref(readStoredPreference(config))

  const trigger = async (
    input: HapticInput = config.defaultPreset,
    options?: TriggerOptions,
  ) => {
    if (!enabled.value) {
      return
    }

    await instance.trigger(input, options)
  }

  const cancel = () => {
    instance.cancel()
  }

  const setEnabled = (value: boolean) => {
    enabled.value = value
    writeStoredPreference(config, value)

    if (!value) {
      instance.cancel()
    }
  }

  const nuxtHaptics: NuxtHaptics = {
    config,
    enabled: readonly(enabled),
    isSupported: WebHaptics.isSupported,
    cancel,
    error: options => trigger('error', options),
    light: options => trigger('light', options),
    selection: options => trigger('selection', options),
    setEnabled,
    success: options => trigger('success', options),
    toggleEnabled: () => setEnabled(!enabled.value),
    trigger,
    warning: options => trigger('warning', options),
  }

  nuxtApp.vueApp.directive('nuxt-haptic', {
    mounted: (el, binding) => setupDirectiveHandler(el, binding.value, config, nuxtHaptics),
    updated: (el, binding) => setupDirectiveHandler(el, binding.value, config, nuxtHaptics),
    unmounted: el => removeDirectiveHandler(el),
  })

  nuxtApp.provide('nuxtHaptics', nuxtHaptics)
})
