# nuxt-haptic

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 4 module for mobile haptics, powered by [`web-haptics`](https://github.com/lochie/web-haptics).

It wraps the browser Vibration API with a Nuxt-first DX:

- client and server plugins, so SSR and prerender stay safe
- `useNuxtHaptics()` auto-import
- `v-nuxt-haptic` directive for declarative interactions
- typed `$nuxtHaptics` injection
- persisted enabled state with touch-only behavior by default

## Install

```bash
npx nuxt module add nuxt-haptic
```

Or install manually:

```bash
bun add nuxt-haptic
```

```ts
export default defineNuxtConfig({
  modules: ['nuxt-haptic'],
})
```

## Quick Use

```vue
<script setup lang="ts">
const { success } = useNuxtHaptics()
</script>

<template>
  <button v-nuxt-haptic="'selection'" type="button">
    Tap
  </button>

  <button type="button" @click="success()">
    Save
  </button>
</template>
```

## Options

```ts
export default defineNuxtConfig({
  modules: ['nuxt-haptic'],
  nuxtHaptic: {
    defaultPreset: 'selection',
    enabled: true,
    persistPreference: true,
    preferenceStorageKey: 'nuxt-haptic:enabled',
    touchOnly: true,
    debug: false,
    showSwitch: false,
  },
})
```

`defaultPreset` accepts any `web-haptics` input, including built-in preset names, numbers, arrays, and custom pattern objects.

## API

### `useNuxtHaptics()`

Returns:

- `trigger(input?, options?)`
- `selection()`
- `light()`
- `success()`
- `warning()`
- `error()`
- `cancel()`
- `enabled`
- `isSupported`
- `setEnabled(value)`
- `toggleEnabled()`
- `config`

If you need types in userland:

```ts
import type { HapticInput, PresetName, TriggerOptions } from 'nuxt-haptic'
```

### `v-nuxt-haptic`

String shorthand:

```vue
<a v-nuxt-haptic="'selection'" href="/contact/">Contact</a>
```

Object form:

```vue
<button
  v-nuxt-haptic="{ input: 'light', on: 'pointerdown', intensity: 0.7 }"
  type="button"
>
  Press
</button>
```

Directive fields:

- `input`: any `web-haptics` input
- `on`: `click`, `pointerdown`, or `pointerup`
- `intensity`: optional intensity override
- `touchOnly`: override module default per element
- `disabled`: disable haptics for that node

## Notes

- On devices without Vibration API support, `web-haptics` falls back cleanly and can optionally emit debug audio.
- The directive ignores non-primary mouse and pointer activation.
- The server plugin provides a no-op directive and injection so Nuxt prerender does not break.

## Development

```bash
# Install dependencies
bun install

# Prepare stubs and types
bun run dev:prepare

# Run the playground
bun run dev

# Run tests
bun run test
bun run test:types

# Build the package
bun run prepack
```

## Credits

- [`web-haptics`](https://github.com/lochie/web-haptics) by Lochie Axon for the underlying haptics runtime.

## License

[MIT](./LICENSE)

[npm-version-src]: https://img.shields.io/npm/v/nuxt-haptic/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-haptic
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-haptic.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-haptic
[license-src]: https://img.shields.io/npm/l/nuxt-haptic.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-haptic
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
