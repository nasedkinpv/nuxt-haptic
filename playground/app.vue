<template>
  <main class="playground">
    <div class="playground__card">
      <p class="playground__eyebrow">
        nuxt-haptic playground
      </p>
      <h1>Nuxt haptics on top of web-haptics.</h1>
      <p class="playground__copy">
        Try the directive, composable, and persisted enabled state.
      </p>

      <div class="playground__actions">
        <button
          v-nuxt-haptic="'selection'"
          type="button"
        >
          Selection
        </button>
        <button
          type="button"
          @click="success()"
        >
          Success
        </button>
        <button
          type="button"
          @click="error()"
        >
          Error
        </button>
        <button
          type="button"
          @click="toggleEnabled()"
        >
          {{ enabled ? 'Disable' : 'Enable' }}
        </button>
      </div>

      <pre class="playground__state">{{ state }}</pre>
    </div>
  </main>
</template>

<script setup lang="ts">
const { enabled, error, isSupported, success, toggleEnabled } = useNuxtHaptics()

const state = computed(() =>
  JSON.stringify(
    {
      enabled: enabled.value,
      isSupported,
    },
    null,
    2,
  ),
)
</script>

<style scoped>
.playground {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background:
    radial-gradient(circle at top left, #d8f4e5 0%, transparent 35%),
    linear-gradient(135deg, #0d1016 0%, #172033 100%);
  color: #f4f7fb;
}

.playground__card {
  width: min(100%, 42rem);
  padding: 2rem;
  border-radius: 1.5rem;
  background: rgba(12, 18, 28, 0.78);
  border: 1px solid rgba(216, 244, 229, 0.16);
  backdrop-filter: blur(18px);
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.3);
}

.playground__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8ce0b1;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1;
}

.playground__copy {
  margin: 1rem 0 0;
  color: rgba(244, 247, 251, 0.8);
}

.playground__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

button {
  padding: 0.8rem 1rem;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  background: #8ce0b1;
  color: #0d1016;
}

.playground__state {
  margin: 1.5rem 0 0;
  padding: 1rem;
  border-radius: 1rem;
  overflow: auto;
  background: rgba(255, 255, 255, 0.06);
}
</style>
