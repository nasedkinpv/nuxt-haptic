<template>
  <main>
    <button
      v-nuxt-haptic="'selection'"
      type="button"
    >
      Trigger
    </button>
    <pre>{{ JSON.stringify($nuxtHaptics.config.defaultPreset) }}</pre>
  </main>
</template>

<script setup lang="ts">
</script>
