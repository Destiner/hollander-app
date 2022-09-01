<template>
  <HolModal
    :is-open="isOpen"
    @close="handleClose"
  >
    <div class="content">
      <h2>Select Asset</h2>
      <div class="list">
        <div
          v-for="item in items"
          :key="item"
          class="item"
          @click="handleClick(item)"
        >
          <HolAsset
            :address="item"
            show-symbol
            show-icon
          />
        </div>
      </div>
    </div>
  </HolModal>
</template>

<script setup lang="ts">
import HolAsset from './HolAsset.vue';
import HolModal from './HolModal.vue';

import { getAssets } from '@/utils/assets';

withDefaults(
  defineProps<{
    isOpen: boolean;
  }>(),
  {
    isOpen: false,
  },
);

const emit = defineEmits<{
  (e: 'close');
  (e: 'select', address: string);
}>();

const items = getAssets();

function handleClose(): void {
  emit('close');
}

function handleClick(item: string): void {
  emit('close');
  emit('select', item);
}
</script>

<style scoped>
.content {
  width: 100%;
}

@media (min-width: 768px) {
  .content {
    width: 400px;
  }
}

h2 {
  margin: 8px 0;
}

.item {
  padding: 4px;
  border-radius: 4px;
}

.item:hover {
  background: #00000008;
  cursor: pointer;
}
</style>
