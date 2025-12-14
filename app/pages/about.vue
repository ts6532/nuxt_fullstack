<script setup lang="ts">
const { data: settings } = useAsyncData(
  "settings",
  () => $fetch("/api/settings"),
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  },
);
</script>

<template>
  <UContainer>
    <div class="flex flex-row min-lg:flex-nowrap gap-6">
      <div class="shrink-0 min-lg:w-1/2 max-w-full">
        <NuxtImg
          v-if="settings?.aboutImage?.path"
          :src="settings.aboutImage.path"
          alt="About Me Image"
          class="w-full"
        />
      </div>

      <div class="shrink-0 min-lg:w-1/2">Some text</div>
    </div>
  </UContainer>
</template>
