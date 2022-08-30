<template>
  <div class="chip">
    <div
      ref="icon"
      class="icon"
    />
    {{ formatAddress(address) }}
  </div>
</template>

<script setup lang="ts">
import jazzicon from '@metamask/jazzicon';
import { ref, onMounted, watch } from 'vue';

import { formatAddress } from '@/utils/formatters';

const props = defineProps<{
  address: string;
}>();

const icon = ref<HTMLElement | null>(null);

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
</style>
