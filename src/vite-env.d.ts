/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_WEATHERBIT_API_KEY: string;
  readonly VITE_WEATHERBIT_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
