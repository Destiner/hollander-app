<template>
  <span class="wrapper">
    <input
      :model-value="modelValue"
      @update:model-value="handleValueUpdate($event)"
    />
    <div class="label">
      <slot />
    </div>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function handleValueUpdate(newValue: string): void {
  emit('update:modelValue', newValue);
}
</script>

<style scoped>
.wrapper {
  display: inline-flex;
  border: 1px solid var(--color-text);
  border-radius: 8px;
}

input {
  max-width: 120px;
  margin: 0;
  padding: 4px 8px;
  border: none;
  border-radius: 8px 0 0 8px;
  outline: none;
  background: #fafafa;
  font-size: 16px;
  text-align: right;
}

.label {
  padding: 4px;
  border-left: 1px solid var(--color-text);
  border-radius: 0 8px 8px 0;
  background: #fafafa;
  font-size: 16px;
}
</style>
