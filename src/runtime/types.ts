import type { Ref } from 'vue'
import type { HapticInput, TriggerOptions, defaultPatterns } from 'web-haptics'

export type {
  HapticInput,
  HapticPattern,
  HapticPreset,
  TriggerOptions,
  Vibration,
} from 'web-haptics'

export type PresetName = keyof typeof defaultPatterns

export type HapticEventName = 'click' | 'pointerdown' | 'pointerup'

export interface NuxtHapticRuntimeConfig {
  defaultPreset: HapticInput
  debug: boolean
  enabled: boolean
  persistPreference: boolean
  preferenceStorageKey: string
  showSwitch: boolean
  touchOnly: boolean
}

export interface HapticDirectiveBinding {
  disabled?: boolean
  input?: HapticInput
  intensity?: number
  on?: HapticEventName
  touchOnly?: boolean
}

export type HapticDirectiveValue = HapticInput | HapticDirectiveBinding | false | null | undefined

export interface NuxtHaptics {
  config: Readonly<NuxtHapticRuntimeConfig>
  enabled: Readonly<Ref<boolean>>
  isSupported: boolean
  cancel: () => void
  error: (options?: TriggerOptions) => Promise<void>
  light: (options?: TriggerOptions) => Promise<void>
  selection: (options?: TriggerOptions) => Promise<void>
  setEnabled: (value: boolean) => void
  success: (options?: TriggerOptions) => Promise<void>
  toggleEnabled: () => void
  trigger: (input?: HapticInput, options?: TriggerOptions) => Promise<void>
  warning: (options?: TriggerOptions) => Promise<void>
}
