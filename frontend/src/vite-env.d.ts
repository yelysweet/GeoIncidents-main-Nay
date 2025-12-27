/// <reference types="vite/client" />

declare module "leaflet/dist/images/marker-icon.png";
declare module "leaflet/dist/images/marker-shadow.png";
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
