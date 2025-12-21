<script setup lang="ts">

const { data: settings } = useNuxtData("settings");
</script>

<template>
  <UContainer>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start mb-8"
    >
      <div class="w-full">
        <NuxtImg
          v-if="settings?.aboutImage?.path"
          :src="settings.aboutImage.path"
          alt="About Me Image"
          class="w-full"
        />
      </div>

      <div
        v-if="settings?.aboutText"
        class="prose prose-gray dark:prose-invert max-w-none leading-relaxed"
        v-html="settings.aboutText"
      ></div>
    </div>
  </UContainer>
</template>
