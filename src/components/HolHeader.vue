<template>
  <header>
    <div>
      Hollander
      <HolButton label="Connect" />
    </div>
  </header>
</template>

<script setup lang="ts">
import HolButton from './HolButton.vue';
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 24px;
  font-size: 20px;
}
</style>
