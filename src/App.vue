<template>
  <div id="app">
    <HolHeader />
    <router-view />
    <HolFooter />
  </div>
</template>

<script setup lang="ts">
import '@fontsource/nunito/700.css';

import HolFooter from '@/components/HolFooter.vue';
import HolHeader from '@/components/HolHeader.vue';
</script>

<style>
:root {
  --font-sans: 'Nunito', -apple-system, 'BlinkMacSystemFont', avenir next,
    avenir, segoe ui, helvetica neue, helvetica, 'Ubuntu', roboto, noto, arial,
    sans-serif;
  --font-serif: 'Iowan Old Style', 'Apple Garamond', 'Baskerville',
    'Times New Roman', 'Droid Serif', 'Times', 'Source Serif Pro', serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono: 'Menlo', 'Consolas', 'Monaco', 'Liberation Mono',
    'Lucida Console', monospace;
  --color-background: #f9f4e7;
  --color-text: #31312d;
  --color-accent: #625598;
  --color-accent-lighter: #7364b3;
}

body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-weight: 700;
}

/* Reset */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#app {
  isolation: isolate;
}
</style>
