<template>
  <a
    :href="getExplorerUrl(event.transactionHash)"
    target="_blank"
  >
    <HolCard>
      <div v-if="'buyAmount' in event">
        <div class="title">Swap</div>
        <div class="pair">
          <div class="asset">
            {{ fromWei(auction.assetIn, event.sellAmount) }}
            <HolAsset
              :address="auction.assetIn"
              size="s"
              show-icon
              show-symbol
            />
          </div>
          →
          <div class="asset">
            {{ fromWei(auction.assetOut, event.buyAmount) }}
            <HolAsset
              :address="auction.assetOut"
              size="s"
              show-icon
              show-symbol
            />
          </div>
        </div>
        <div>{{ formatDate(event.timestamp) }}</div>
      </div>
      <div v-else-if="'amount' in event">
        <div class="title">Withdrawal</div>
        <div>
          <div class="asset">
            {{ fromWei(auction.assetIn, event.amount) }}
            <HolAsset
              :address="auction.assetIn"
              size="s"
              show-icon
              show-symbol
            />
          </div>
        </div>
        <div>{{ formatDate(event.timestamp) }}</div>
      </div>
      <div v-else>
        <div class="title">Initialization</div>
        <div>{{ formatDate(event.timestamp) }}</div>
      </div>
    </HolCard>
  </a>
</template>

<script setup lang="ts">
import HolAsset from './HolAsset.vue';
import HolCard from './HolCard.vue';

import { Event } from '@/services/subgraph';
import { Auction } from '@/utils/auction';
import { fromWei } from '@/utils/formatters';

defineProps<{
  auction: Auction;
  event: Event;
}>();

function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function getExplorerUrl(hash: string): string {
  return `https://goerli.etherscan.io/tx/${hash}`;
}
</script>

<style scoped>
a {
  color: var(--color-text);
  text-decoration: none;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.pair {
  display: flex;
  gap: 8px;
}

.asset {
  display: flex;
  gap: 4px;
}
</style>
