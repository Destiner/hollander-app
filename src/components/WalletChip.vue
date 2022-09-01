<template>
  <div class="chip">
    <div
      ref="icon"
      class="icon"
    />
    {{ formatAddress(address) }}
    <IconCross
      class="button"
      @click="disconnect"
    />
  </div>
</template>

<script setup lang="ts">
import jazzicon from '@metamask/jazzicon';
import { ref, onMounted, watch } from 'vue';

import IconCross from '@/components/icons/Cross.vue';
import { useWalletStore } from '@/stores';
import { formatAddress } from '@/utils/formatters';

const props = defineProps<{
  address: string;
}>();

const icon = ref<HTMLElement | null>(null);

const store = useWalletStore();

onMounted(() => {
  update();
});

watch(props, () => {
  update();
});

function update(): void {
  const address = props.address;
  if (!icon.value) {
    return;
  }
  icon.value.innerHTML = '';
  icon.value.appendChild(jazzicon(20, parseInt(address.slice(2, 10), 16)));
}

function disconnect(): void {
  store.disconnect();
}
</script>

<style scoped>
.chip {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px;
  border: 2px solid var(--color-text);
  border-radius: 8px;
  font-size: 14px;
}

.icon {
  height: 20px;
}

.button {
  cursor: pointer;
}
</style>
