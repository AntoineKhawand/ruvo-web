/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID: string;
  readonly VITE_FORMSPREE_SUPPORT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
