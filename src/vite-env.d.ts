/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_WEATHERBIT_API_KEY: string;
  readonly VITE_WEATHERBIT_BASE_API_URL: string;

  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_AUTH_DOMAIN: string;
  readonly VITE_APP_PROJECT_ID: string;
  readonly VITE_APP_STORAGE_BUCKET: string;
  readonly VITE_APP_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_APP_ID: string;
  readonly VITE_APP_VAPID_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
