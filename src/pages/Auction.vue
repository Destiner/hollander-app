<template>
  <div
    v-if="auction"
    class="page"
  >
    <h2 class="title">
      <span>Auction</span>
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
        Price:
        {{
          auctionPriceFromWei(auction.assetOut, auction.assetIn, auction.price)
        }}
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
    <div class="button">
      <div v-if="status === 'draft' && enoughBalance">
        <HolButton
          v-if="enoughAllowance"
          label="Init"
          @click="init"
        />
        <HolButton
          v-else
          label="Approve"
          @click="approve"
        />
      </div>
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import HolAsset from '@/components/HolAsset.vue';
import HolButton from '@/components/HolButton.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import Erc20Service from '@/services/erc20';
import HollanderService from '@/services/hollander';
import { useAssetStore, useWalletStore } from '@/stores';
import { AuctionStatus, getStatus } from '@/utils/auction';
import { auctionPriceFromWei, fromWei } from '@/utils/formatters';

interface Auction {
  owner: string;
  address: string;
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

const route = useRoute();

const erc20Service = new Erc20Service();
const hollanderService = new HollanderService();

const assetStore = useAssetStore();
const walletStore = useWalletStore();

const address = computed(() => route.params.address as string);

onMounted(async () => {
  if (!address.value) {
    return;
  }
  auction.value = await fetchAuction(address.value);
  if (!auction.value) {
    return;
  }
  fetchAsset(auction.value.assetOut, auction.value.address);
});

watch(
  () => walletStore.address,
  () => {
    if (!walletStore.isConnected) {
      return;
    }
    if (!auction.value) {
      return;
    }
    fetchAsset(auction.value.assetOut, auction.value.address);
  },
);

const auction = ref<Auction | null>(null);

const status = computed<AuctionStatus | null>(() =>
  auction.value
    ? getStatus(
        auction.value.blockStart,
        auction.value.amountOut,
        auction.value.amountOutTotal,
      )
    : null,
);

async function fetchAuction(auction: string): Promise<Auction | null> {
  await hollanderService.connect();
  const owner = await hollanderService.owner(auction);
  const blockStart = await hollanderService.blockStart(auction);
  const tokenBase = await hollanderService.tokenBase(auction);
  const tokenQuote = await hollanderService.tokenQuote(auction);
  const amountBaseTotal = await hollanderService.amountBase(auction);
  const initialPrice = await hollanderService.initialPrice(auction);
  const halvingPeriod = await hollanderService.halvingPeriod(auction);
  const swapPeriod = await hollanderService.swapPeriod(auction);

  if (
    !owner ||
    blockStart === null ||
    !tokenBase ||
    !tokenQuote ||
    !amountBaseTotal ||
    !initialPrice ||
    !halvingPeriod ||
    !swapPeriod
  ) {
    return null;
  }

  await erc20Service.connect();
  const amountQuote = await erc20Service.balanceOf(tokenQuote, auction);
  const amountBase = await erc20Service.balanceOf(tokenBase, auction);

  if (amountQuote === null || amountBase === null) {
    return null;
  }

  const price =
    getStatus(parseInt(blockStart.toString()), amountBase, amountBaseTotal) !==
    'draft'
      ? await hollanderService.getPrice(auction, 0n)
      : initialPrice;

  if (!price) {
    return null;
  }

  return {
    owner,
    address: auction,
    assetIn: tokenQuote,
    assetOut: tokenBase,
    amountIn: amountQuote,
    amountOut: amountBase,
    amountOutTotal: amountBaseTotal,
    price,
    halvingPeriod: parseInt(halvingPeriod.toString()),
    swapPeriod: parseInt(swapPeriod.toString()),
    blockStart: parseInt(blockStart.toString()),
  };
}

async function fetchAsset(asset: string, auction: string): Promise<void> {
  if (!walletStore.isConnected) {
    return;
  }
  const address = walletStore.address;
  await erc20Service.connect();
  const allowance = await erc20Service.allowance(asset, address, auction);
  const balance = await erc20Service.balanceOf(asset, address);
  if (!allowance || !balance) {
    return;
  }
  assetStore.setAllowance(asset, address, auction, allowance);
  assetStore.setBalance(asset, address, balance);
}

const enoughBalance = computed<boolean>(() => {
  if (!auction.value) {
    return false;
  }
  const address = walletStore.address;
  const balance = assetStore.getBalance(auction.value.assetOut, address);
  return balance >= auction.value.amountOutTotal;
});

const enoughAllowance = computed<boolean>(() => {
  if (!auction.value) {
    return false;
  }
  const address = walletStore.address;
  const allowance = assetStore.getAllowance(
    auction.value.assetOut,
    address,
    auction.value.address,
  );
  return allowance >= auction.value.amountOutTotal;
});

async function init(): Promise<void> {
  if (!walletStore.isConnected) {
    return;
  }
  if (!auction.value) {
    return;
  }
  await hollanderService.connect();
  await hollanderService.init(auction.value.address);
}

async function approve(): Promise<void> {
  if (!walletStore.isConnected) {
    return;
  }
  if (!auction.value) {
    return;
  }
  await erc20Service.connect();
  await erc20Service.approve(auction.value.assetOut, auction.value.address);
}
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
