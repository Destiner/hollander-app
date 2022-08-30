<template>
  <header>
    <router-link :to="{ name: 'home' }">Hollander</router-link>
    <HolButton
      v-if="isConnected"
      label="Connect"
      @click="connect"
    />
    <WalletChip
      v-else
      :address="address"
    />
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import HolButton from './HolButton.vue';
import WalletChip from './WalletChip.vue';

const address = ref('');
const isConnected = computed(() => !address.value);

function connect(): void {
  address.value = '0x72aa5ad78fb4f2e567a5df833dad12f60b52db63';
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 24px;
  font-size: 20px;
}

a {
  color: var(--color-text);
  text-decoration: none;
}
</style>
