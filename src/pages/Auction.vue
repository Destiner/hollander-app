<template>
  <div
    v-if="auction"
    class="page"
  >
    <h2 class="title">
      <span>Auction #{{ auction.id }}</span>
      <StatusBadge
        :block-start="auction.blockStart"
        :amount-out="auction.amountOut"
        :amount-out-total="auction.amountOutTotal"
      />
    </h2>
    <div class="pair">
      <HolAsset
        show-icon
        show-symbol
        :address="auction.assetOut"
      />
      →
      <HolAsset
        show-icon
        show-symbol
        :address="auction.assetIn"
      />
    </div>
    <div class="params">
      <div class="param">
        Sell amount: {{ fromWei(auction.assetOut, auction.amountOut) }}/{{
          fromWei(auction.assetOut, auction.amountOutTotal)
        }}
        <HolAsset
          size="s"
          show-icon
          show-symbol
          :address="auction.assetOut"
        />
      </div>
      <div class="param">
        Accumulated: {{ fromWei(auction.assetIn, auction.amountIn) }}
        <HolAsset
          size="s"
          show-icon
          show-symbol
          :address="auction.assetIn"
        />
      </div>
      <div class="param">
        Price: {{ fromWei(auction.assetIn, auction.price) }}
        <HolAsset
          size="s"
          show-icon
          show-symbol
          :address="auction.assetIn"
        />
      </div>
      <div class="param">
        Halving period: {{ auction.halvingPeriod }} blocks
      </div>
      <div class="param">Swap period: {{ auction.swapPeriod }} blocks</div>
    </div>
  </div>
  <div
    v-else
    class="page"
  >
    Loading auction…
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import HolAsset from '@/components/HolAsset.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { fromWei } from '@/utils/formatters';

interface Auction {
  id: number;
  assetIn: string;
  assetOut: string;
  amountIn: bigint;
  amountOut: bigint;
  amountOutTotal: bigint;
  price: bigint;
  halvingPeriod: number;
  swapPeriod: number;
  blockStart: number;
}

const auction = ref<Auction | null>({
  id: 3819,
  assetIn: '0xc',
  assetOut: '0xa',
  amountIn: 1800000000000000000n,
  amountOut: 8000000000n,
  amountOutTotal: 10000000000n,
  price: 1500000000000000n,
  halvingPeriod: 400,
  swapPeriod: 800,
  blockStart: 15000000,
});
</script>

<style scoped>
.page {
  padding: 0 24px;
}

.title {
  display: flex;
  gap: 8px;
}

.pair {
  display: flex;
  gap: 4px;
  align-items: center;
}

.params {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.param {
  display: flex;
  gap: 4px;
  align-items: baseline;
}
</style>
