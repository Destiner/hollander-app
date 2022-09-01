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

import EthereumService from '@/services/ethereum';
import { useWalletStore } from '@/stores';

const service = new EthereumService();

const store = useWalletStore();

const address = computed(() => store.address);
const isConnected = computed(() => store.isConnected);

async function connect(): Promise<void> {
  const address = await service.connect();
  if (!address) {
    return;
  }
  store.address = address;
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
