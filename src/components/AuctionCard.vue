<template>
  <HolCard
    class="auction"
    @click="openAuction"
  >
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
          size="s"
          show-symbol
          :address="assetOut"
        />
      </div>
      <div class="param">
        Accumulated: {{ fromWei(assetIn, amountIn) }}
        <HolAsset
          size="s"
          show-symbol
          :address="assetIn"
        />
      </div>
      <div class="param">
        Current price: {{ fromWei(assetIn, price) }}
        <HolAsset
          size="s"
          show-symbol
          :address="assetIn"
        />
      </div>
    </div>
  </HolCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import HolAsset from './HolAsset.vue';
import HolCard from './HolCard.vue';

import { fromWei } from '@/utils/formatters';

const router = useRouter();

const props = defineProps<{
  address: string;
  assetIn: string;
  assetOut: string;
  amountIn: bigint;
  amountOut: bigint;
  amountOutTotal: bigint;
  price: bigint;
}>();

function openAuction(): void {
  router.push({
    name: 'auction',
    params: {
      address: props.address,
    },
  });
}
</script>

<style scoped>
.auction {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.header,
.param {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
}
</style>
