declare module '@metamask/jazzicon' {
  export default function jazzicon(size: number, seed: number): Node;
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue';

  const component: ComponentOptions;
  export default component;
}

interface Window {
  ethereum: any;
}
