<template>
  <button :disabled="isLoading">{{ label }}</button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    isLoading: boolean;
  }>(),
  {
    isLoading: false,
  },
);
</script>

<style scoped>
button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: var(--color-accent);
  color: var(--color-background);
  font-size: 14px;
}

button:hover {
  background: var(--color-accent-lighter);
  cursor: pointer;
}

button:disabled {
  background: var(--color-accent-lighter);
  pointer-events: none;
}
</style>
