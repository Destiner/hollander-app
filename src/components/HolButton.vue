<template>
  <button>{{ label }}</button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
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
</style>
