<template>
  <HolCard class="auction">
    <div class="header">
      <HolAsset
        show-icon
        show-symbol
        :address="assetOut"
      />
      →
      <HolAsset
        show-icon
        show-symbol
        :address="assetIn"
      />
    </div>
    <div class="params">
      <div class="param">
        Sell amount: {{ fromWei(assetOut, amountOut) }} /
        {{ fromWei(assetOut, amountOutTotal) }}
        <HolAsset
          show-symbol
          :address="assetOut"
        />
      </div>
      <div class="param">
        Accumulated: {{ fromWei(assetIn, amountIn) }}
        <HolAsset
          show-symbol
          :address="assetIn"
        />
      </div>
      <div class="param">
        Current price: {{ fromWei(assetIn, price) }}
        <HolAsset
          show-symbol
          :address="assetIn"
        />
      </div>
    </div>
  </HolCard>
</template>

<script setup lang="ts">
import HolAsset from './HolAsset.vue';
import HolCard from './HolCard.vue';

import { fromWei } from '@/utils/formatters';

defineProps<{
  assetIn: string;
  assetOut: string;
  amountIn: bigint;
  amountOut: bigint;
  amountOutTotal: bigint;
  price: bigint;
}>();
</script>

<style scoped>
.auction {
  display: flex;
  gap: 16px;
  flex-direction: column;
  min-width: 420px;
}

.header,
.param {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
}
</style>
