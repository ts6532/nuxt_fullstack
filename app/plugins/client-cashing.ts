import type { NuxtApp } from "#app";

type UseClientCash = (key: string, nuxtApp: NuxtApp) => any;

export default defineNuxtPlugin(() => {
  const useClientCash: UseClientCash = (key: string, nuxtApp: NuxtApp) =>
    nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];

  return {
    provide: {
      useClientCash,
    },
  };
});
