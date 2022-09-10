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
        Halving period: {{ blocksToHours(auction.halvingPeriod) }} hours
      </div>
      <div class="param">
        Swap period: {{ blocksToHours(auction.swapPeriod) }} hours
      </div>
    </div>
    <div class="button">
      <div v-if="status === 'draft' && isOwner && enoughBalance">
        <HolButton
          v-if="enoughAllowance"
          label="Init"
          :is-loading="hasPendingTx"
          @click="init"
        />
        <HolButton
          v-else
          label="Approve"
          :is-loading="hasPendingTx"
          @click="approve"
        />
      </div>
      <div v-if="status === 'complete' && isOwner && auction.amountIn > 0n">
        <HolButton
          label="Withdraw"
          :is-loading="hasPendingTx"
          @click="withdraw"
        />
      </div>
    </div>
    <div
      v-if="status === 'draft'"
      class="chart"
    >
      <HolChart
        :type="'line'"
        :timestamps="chartData.timestamps"
        :data="chartData.series"
      />
    </div>
    <div
      v-if="status !== 'draft'"
      class="events"
    >
      <h3 class="event-title">Activity</h3>
      <EventCard
        v-for="event in events"
        :key="event.id"
        :auction="auction"
        :event="event"
      />
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

import EventCard from '@/components/EventCard.vue';
import HolAsset from '@/components/HolAsset.vue';
import HolButton from '@/components/HolButton.vue';
import HolChart from '@/components/HolChart.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import Erc20Service from '@/services/erc20';
import HollanderService from '@/services/hollander';
import SubgraphService, { Event } from '@/services/subgraph';
import { useAssetStore, useWalletStore } from '@/stores';
import {
  Auction,
  AuctionStatus,
  getHistoricalPrice,
  getStatus,
} from '@/utils/auction';
import { blocksToHours } from '@/utils/converters';
import { auctionPriceFromWei, fromWei } from '@/utils/formatters';

const route = useRoute();

const erc20Service = new Erc20Service();
const hollanderService = new HollanderService();
const subgraphService = new SubgraphService();

const assetStore = useAssetStore();
const walletStore = useWalletStore();

const address = computed(() => route.params.address as string);

onMounted(async () => {
  if (!address.value) {
    return;
  }
  auction.value = await fetchAuction(address.value);
  events.value = await fetchEvents(address.value);
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
    ? getStatus(auction.value.blockStart, auction.value.amountOut)
    : null,
);

async function fetchAuction(auction: string): Promise<Auction | null> {
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

  const amountQuote = await erc20Service.balanceOf(tokenQuote, auction);
  const amountBase = await erc20Service.balanceOf(tokenBase, auction);

  if (amountQuote === null || amountBase === null) {
    return null;
  }

  const price =
    getStatus(parseInt(blockStart.toString()), amountBase) !== 'draft'
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
    initialPrice,
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
  if (allowance !== null) {
    assetStore.setAllowance(asset, address, auction, allowance);
  }
  if (balance !== null) {
    assetStore.setBalance(asset, address, balance);
  }
}

const events = ref<Event[]>([]);

async function fetchEvents(address: string): Promise<Event[]> {
  const events = await subgraphService.getEvents(address);
  return events;
}

const isOwner = computed<boolean>(() => {
  if (!auction.value) {
    return false;
  }
  const owner = auction.value.owner;
  const address = walletStore.address;
  return owner === address;
});

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

const chartData = computed(() => {
  if (!auction.value) {
    return {
      timestamps: [],
      series: [],
    };
  }
  const prices = getHistoricalPrice(auction.value);
  const timestamps = Object.keys(prices).map((val) => parseInt(val));
  const series = [
    {
      name: 'price',
      values: Object.values(prices),
    },
  ];
  return {
    timestamps,
    series,
  };
});

const hasPendingTx = ref(false);

async function init(): Promise<void> {
  if (!walletStore.isConnected) {
    return;
  }
  if (!auction.value) {
    return;
  }
  await hollanderService.connect();
  hasPendingTx.value = true;
  const blockStart = await hollanderService.init(auction.value.address);
  hasPendingTx.value = false;
  if (blockStart === null) {
    return;
  }
  auction.value.blockStart = parseInt(blockStart.toString());
}

async function approve(): Promise<void> {
  if (!walletStore.isConnected) {
    return;
  }
  if (!auction.value) {
    return;
  }
  await erc20Service.connect();
  hasPendingTx.value = true;
  await erc20Service.approve(auction.value.assetOut, auction.value.address);
  const allowance = await erc20Service.allowance(
    auction.value.assetOut,
    walletStore.address,
    auction.value.address,
  );
  hasPendingTx.value = false;
  if (allowance !== null) {
    assetStore.setAllowance(
      auction.value.assetOut,
      walletStore.address,
      auction.value.address,
      allowance,
    );
  }
}

async function withdraw(): Promise<void> {
  if (!walletStore.isConnected) {
    return;
  }
  if (!auction.value) {
    return;
  }
  await hollanderService.connect();
  hasPendingTx.value = true;
  await hollanderService.withdraw(auction.value.address);
  hasPendingTx.value = false;
  auction.value.amountIn = 0n;
}
</script>

<style scoped>
.page {
  display: flex;
  gap: 8px;
  flex-direction: column;
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

.event-title {
  margin: 24px 0 4px;
}

.events {
  display: flex;
  gap: 16px;
  flex-direction: column;
  max-width: 600px;
}
</style>
