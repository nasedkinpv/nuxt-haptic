import { useNuxtApp } from '#app'

import type { NuxtHaptics } from '../types'

export const useNuxtHaptics = (): NuxtHaptics => useNuxtApp().$nuxtHaptics
