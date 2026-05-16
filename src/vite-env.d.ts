/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORKER_API_BASE?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_BASE_PATH?: string;
  /** Canonical site origin for Open Graph (no path), e.g. https://pokemonprimalawakening.com */
  readonly VITE_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
