<template>
  <div class="asset">
    <span
      v-if="showSymbol"
      class="symbol"
    >
      {{ symbol }}
    </span>
    <img
      v-if="showIcon"
      class="icon"
      :src="iconUrl"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    address: string;
    showSymbol: boolean;
    showIcon: boolean;
  }>(),
  {
    showSymbol: false,
    showIcon: false,
  },
);

const USDC_TESTNET_ADDRESS = '0xa';
const DAI_TESTNET_ADDRESS = '0xb';
const WETH_TESTNET_ADDRESS = '0xc';
const UNI_TESTNET_ADDRESS = '0xd';

const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

const iconUrl = computed(() => {
  const addressMap: Record<string, string> = {
    [USDC_TESTNET_ADDRESS]: USDC_ADDRESS,
    [DAI_TESTNET_ADDRESS]: DAI_ADDRESS,
    [WETH_TESTNET_ADDRESS]: WETH_ADDRESS,
    [UNI_TESTNET_ADDRESS]: UNI_ADDRESS,
  };
  const address = addressMap[props.address];
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
});

const symbol = computed(() => {
  const map: Record<string, string> = {
    [USDC_TESTNET_ADDRESS]: 'USDC',
    [DAI_TESTNET_ADDRESS]: 'DAI',
    [WETH_TESTNET_ADDRESS]: 'WETH',
    [UNI_TESTNET_ADDRESS]: 'UNI',
  };
  return map[props.address];
});
</script>

<style scoped>
.asset {
  display: flex;
  gap: 8px;
}

.symbol {
  font-size: 20px;
}

.icon {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-text);
  border-radius: 50%;
}
</style>
