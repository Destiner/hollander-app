<template>
  <div class="page">
    <div class="hero">
      <div class="hero-text">
        <div>Swap large amounts of tokens.</div>
        <div>No MEV, low slippage.</div>
      </div>
      <div>
        <HolButton label="Create" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HolButton from '@/components/HolButton.vue';
</script>

<style scoped>
.page {
  margin: 0 24px;
}

.hero {
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin: 64px 0 32px;
}

.hero-text {
  display: flex;
  gap: 8px;
  flex-direction: column;
  font-size: 32px;
}
</style>
