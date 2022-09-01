<template>
  <header>
    <router-link :to="{ name: 'home' }">Hollander</router-link>
    <WalletChip
      v-if="isConnected"
      :address="address"
    />
    <HolButton
      v-else
      label="Connect"
      @click="connect"
    />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import HolButton from './HolButton.vue';
import WalletChip from './WalletChip.vue';

import { useWalletStore } from '@/stores';

const store = useWalletStore();

const address = computed(() => store.address);
const isConnected = computed(() => store.isConnected);

function connect(): void {
  store.address = '0x72aa5ad78fb4f2e567a5df833dad12f60b52db63';
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
