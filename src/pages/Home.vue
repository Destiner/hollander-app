<template>
  <div class="page">
    <div class="hero">
      <div class="hero-text">
        <div>Swap large amounts of tokens.</div>
        <div>No MEV, low slippage.</div>
      </div>
      <div>
        <HolButton
          label="Create"
          @click="openNewAuctionPage"
        />
      </div>
    </div>
    <div class="auctions">
      <h2>Latest auctions</h2>
      <div class="cards">
        <AuctionCard
          address="0x1"
          asset-in="0xc"
          asset-out="0xa"
          :amount-in="1800000000000000000n"
          :amount-out="8000000000n"
          :amount-out-total="10000000000n"
          :price="1500000000000000n"
        />
        <AuctionCard
          address="0x2"
          asset-in="0xc"
          asset-out="0xb"
          :amount-in="56720000000000000000n"
          :amount-out="40000000000000000000000n"
          :amount-out-total="200000000000000000000000n"
          :price="3200000000000000n"
        />
        <AuctionCard
          address="0x3"
          asset-in="0xa"
          asset-out="0xc"
          :amount-in="2143900000n"
          :amount-out="18200000000000000000n"
          :amount-out-total="20000000000000000000n"
          :price="1480000000n"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import AuctionCard from '@/components/AuctionCard.vue';
import HolButton from '@/components/HolButton.vue';

const router = useRouter();

function openNewAuctionPage(): void {
  router.push({
    name: 'auction-new',
  });
}
</script>

<style scoped>
.page {
  margin: 0 24px;
}

.hero {
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin: 64px 0 128px;
}

.hero-text {
  display: flex;
  gap: 8px;
  flex-direction: column;
  font-size: 32px;
}

.cards {
  display: flex;
  gap: 24px;
  flex-direction: column;
  max-width: 480px;
}
</style>
