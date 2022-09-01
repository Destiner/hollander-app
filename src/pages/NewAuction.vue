<template>
  <div class="page">
    <h2>New Auction</h2>
    <div class="form">
      <div class="order">
        <h3>Order</h3>
        <HolInput v-model="amount">
          <div class="pair">
            <div
              class="input-label asset-selector"
              @click="openAssetModal('out')"
            >
              <HolAsset
                show-icon
                show-symbol
                :address="assetOut"
              />
            </div>
            →
            <div
              class="input-label asset-selector"
              @click="openAssetModal('in')"
            >
              <HolAsset
                show-icon
                show-symbol
                :address="assetIn"
              />
            </div>
          </div>
        </HolInput>
      </div>
      <div>
        <h3>Params</h3>
        <div class="params">
          <div class="param">
            <span class="param-name">Initial price</span>
            <HolInput v-model="initialPrice">
              <div class="input-label">
                <HolAsset
                  size="s"
                  show-icon
                  show-symbol
                  :address="assetIn"
                />
              </div>
            </HolInput>
          </div>
          <div class="param">
            <span class="param-name">Halving period</span>
            <HolInput v-model="halvingPeriod">
              <div class="input-label">hours</div>
            </HolInput>
          </div>
          <div class="param">
            <span class="param-name">Swap period</span>
            <HolInput v-model="swapPeriod">
              <div class="input-label">hours</div>
            </HolInput>
          </div>
        </div>
      </div>
      <div>
        <HolButton label="Create" />
      </div>
    </div>
    <AssetModal
      :is-open="isAssetModalOpen"
      @close="handleCloseModal"
      @select="handleAssetSelect($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AssetModal from '@/components/AssetModal.vue';
import HolAsset from '@/components/HolAsset.vue';
import HolButton from '@/components/HolButton.vue';
import HolInput from '@/components/HolInput.vue';

type PairAssetType = 'in' | 'out';

const amount = ref('');
const assetIn = ref('0xc');
const assetOut = ref('0xa');
const assetModalSelected = ref<PairAssetType | null>(null);

const initialPrice = ref('');
const halvingPeriod = ref('');
const swapPeriod = ref('');

const isAssetModalOpen = ref(false);

function openAssetModal(type: PairAssetType): void {
  isAssetModalOpen.value = true;
  assetModalSelected.value = type;
}

function handleCloseModal(): void {
  isAssetModalOpen.value = false;
}

function handleAssetSelect(address: string): void {
  if (assetModalSelected.value === 'in') {
    assetIn.value = address;
  } else {
    assetOut.value = address;
  }
}
</script>

<style scoped>
h2 {
  margin: 8px 0;
}

h3 {
  margin: 4px 0;
}

.page {
  margin: 64px 24px 0;
}

.form {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.input-label {
  padding: 4px;
}

.pair {
  display: flex;
  gap: 8px;
  align-items: center;
}

.asset-selector {
  margin: 4px;
}

.asset-selector:hover {
  border-radius: 8px;
  background: #eee;
  cursor: pointer;
}

.params {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.param {
  display: flex;
  gap: 8px;
  align-items: center;
}

.param-name {
  width: 120px;
}
</style>
