<template>
  <div class="wrapper">
    <div
      class="badge"
      :class="{
        draft: status === 'draft',
        active: status === 'active',
        complete: status === 'complete',
      }"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { AuctionStatus, getStatus } from '@/utils/auction';

const props = defineProps<{
  blockStart: number;
  amountOut: bigint;
}>();

const status = computed<AuctionStatus>(() =>
  getStatus(props.blockStart, props.amountOut),
);

// eslint-disable-next-line vue/return-in-computed-property
const label = computed(() => {
  switch (status.value) {
    case 'draft':
      return 'Draft';
    case 'active':
      return 'Active';
    case 'complete':
      return 'Complete';
  }
});
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}

.badge {
  display: flex;
  align-items: center;
  padding: 2px 8px;
  border: 1px solid var(--color-text);
  border-radius: 4px;
  font-size: 12px;
}

.badge.draft {
  border-color: #1d86dd;
  color: #1d86dd;
}

.badge.active {
  border-color: #0f8c2b;
  color: #0f8c2b;
}

.badge.complete {
  border-color: #6f6f6f;
  color: #6f6f6f;
}
</style>
