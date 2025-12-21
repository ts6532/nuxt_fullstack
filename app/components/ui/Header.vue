<script setup lang="ts">
import SocialIcons from "~/components/ui/SocialIcons.vue";

const { data: settings } = useNuxtData("settings");
</script>

<template>
  <section
    v-if="settings?.heroImage?.path"
    class="max-sm:hidden w-full flex justify-center pt-10 pb-20"
  >
    <UColorModeImage
      class="max-w-96 max-h-80"
      :dark="settings.heroImage.path"
      :light="settings.heroImage.path"
    />
  </section>

  <header
    class="px-6 py-4 border-b border-gray-200 sticky top-0 sm:static bg-white dark:bg-gray-900"
  >
    <UContainer>
      <div class="flex items-center justify-between">
        <nav class="flex items-center gap-4 max-sm:justify-center">
          <NuxtLink to="/" class="font-bold">Projects</NuxtLink>
          <NuxtLink to="/about" class="font-bold">About me</NuxtLink>
        </nav>

        <SocialIcons class="max-sm:hidden m-l-auto" />
      </div>
    </UContainer>
  </header>
</template>
