# Changelog

## v0.2.1

- Moved runtime plugins and composables under `runtime/app` for Nuxt app runtime conventions.
- Added public runtime config typing for `nuxtHaptic`.
- Exported `PresetName` for userland type helpers.
- Kept `defaultPreset` compatible with any `web-haptics` input, including custom patterns.
- Pinned `@types/node` to `^22` for more stable local tooling.

## v0.1.1

- Removed a stray template `tsconfig` from the published runtime bundle.
- Kept the runtime API unchanged.

## v0.1.0

- Initial release.
- Added `useNuxtHaptics()`, `v-nuxt-haptic`, typed `$nuxtHaptics`, and SSR-safe runtime plugins.
