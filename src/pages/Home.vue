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
    <div
      v-if="auctions.length > 0"
      class="auctions"
    >
      <h2>Latest auctions</h2>
      <div class="cards">
        <AuctionCard
          v-for="auction in auctions"
          :key="auction.address"
          :address="auction.address"
          :asset-in="auction.assetIn"
          :asset-out="auction.assetOut"
          :amount-in="auction.amountIn"
          :amount-out="auction.amountOut"
          :amount-out-total="auction.amountOutTotal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuctionCard from '@/components/AuctionCard.vue';
import HolButton from '@/components/HolButton.vue';
import Erc20Service from '@/services/erc20';
import SubgraphService from '@/services/subgraph';

const router = useRouter();

const erc20Service = new Erc20Service();
const subgraphService = new SubgraphService();

interface Auction {
  address: string;
  assetIn: string;
  assetOut: string;
  amountIn: bigint;
  amountOut: bigint;
  amountOutTotal: bigint;
}

onMounted(async () => {
  auctions.value = await fetchAuctions();
});

const auctions = ref<Auction[]>([]);

async function fetchAuctions(): Promise<Auction[]> {
  const auctionList = await subgraphService.getAuctions();
  const amountsIn: bigint[] = [];
  const amountsOut: bigint[] = [];
  for (const auction of auctionList) {
    const amountIn = await erc20Service.balanceOf(
      auction.tokenQuote,
      auction.id,
    );
    const amountOut = await erc20Service.balanceOf(
      auction.tokenBase,
      auction.id,
    );
    if (amountIn === null || amountOut === null) {
      continue;
    }
    amountsIn.push(amountIn);
    amountsOut.push(amountOut);
  }
  return auctionList.map((auction, i) => {
    return {
      address: auction.id,
      assetIn: auction.tokenQuote,
      assetOut: auction.tokenBase,
      amountIn: amountsIn[i],
      amountOut: amountsOut[i],
      amountOutTotal: auction.amountBase,
    };
  });
}

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
