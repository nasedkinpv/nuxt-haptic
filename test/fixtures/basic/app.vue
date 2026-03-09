<template>
  <main>
    <button
      v-nuxt-haptic="'selection'"
      type="button"
    >
      Trigger
    </button>
    <div>{{ $nuxtHaptics.config.defaultPreset }}</div>
  </main>
</template>

<script setup lang="ts">
</script>
