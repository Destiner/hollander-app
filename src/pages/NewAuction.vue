<template>
  <div class="page">
    <h2>New Auction</h2>
    <div class="form">
      <div class="order">
        <h3>Order</h3>
        <HolInput v-model="amount">
          <div class="pair">
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
        </HolInput>
      </div>
      <div>
        <h3>Params</h3>
        <div class="params">
          <div class="param">
            <span class="param-name">Initial price</span>
            <HolInput v-model="initialPrice">
              <HolAsset
                show-icon
                show-symbol
                :address="assetIn"
              />
            </HolInput>
          </div>
          <div class="param">
            <span class="param-name">Halving period</span>
            <HolInput v-model="halvingPeriod"> hours </HolInput>
          </div>
          <div class="param">
            <span class="param-name">Swap period</span>
            <HolInput v-model="swapPeriod"> hours </HolInput>
          </div>
        </div>
      </div>
      <div>
        <HolButton label="Create" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import HolAsset from '@/components/HolAsset.vue';
import HolButton from '@/components/HolButton.vue';
import HolInput from '@/components/HolInput.vue';

const amount = ref('');
const assetIn = ref('0xc');
const assetOut = ref('0xa');

const initialPrice = ref('');
const halvingPeriod = ref('');
const swapPeriod = ref('');
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

.pair {
  display: flex;
  gap: 8px;
  align-items: center;
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
