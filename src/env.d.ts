/// <reference types="vite/client" />

declare global {
  interface Window {
    // eslint-disable-next-line
    scroll: any;
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
