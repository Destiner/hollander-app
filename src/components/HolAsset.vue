<template>
  <div
    class="asset"
    :class="{ small: size === 's' }"
  >
    <span
      v-if="showSymbol"
      class="symbol"
    >
      {{ symbol }}
    </span>
    <img
      v-if="showIcon"
      class="icon"
      :src="iconUrl"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { getIconUrl, getSymbol } from '@/utils/assets';

type Size = 's' | 'm';

const props = withDefaults(
  defineProps<{
    size: Size;
    address: string;
    showSymbol: boolean;
    showIcon: boolean;
  }>(),
  {
    size: 'm',
    showSymbol: false,
    showIcon: false,
  },
);

const iconUrl = computed(() => {
  return getIconUrl(props.address);
});

const symbol = computed(() => {
  return getSymbol(props.address);
});
</script>

<style scoped>
.asset {
  display: flex;
  gap: 8px;
}

.symbol {
  font-size: 20px;
}

.asset.small > .symbol {
  font-size: 16px;
}

.icon {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-text);
  border-radius: 50%;
}

.asset.small > .icon {
  width: 20px;
  height: 20px;
}
</style>
