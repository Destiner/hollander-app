<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  padding: 10px;
  border: 4px solid var(--color-text);
  border-radius: 6px;
  box-shadow: 6px 7px 0 0 var(--color-text);
}

.card:hover {
  transform: translateY(-4px);
  transition: all 0.25s linear;
  box-shadow: 8px 11px 1px 0 var(--color-text);
  cursor: pointer;
}
</style>
