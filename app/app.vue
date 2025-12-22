<script setup lang="ts">
import { useWindowScroll, useWindowSize } from "@vueuse/core";

useFetch("/api/settings", { key: "settings" });
const { y: scrollY } = useWindowScroll();
const { height: windowHeight } = useWindowSize();

const showScrollTop = computed(() => scrollY.value > windowHeight.value * 1.5);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>
<template>
  <div class="relative">
    <UApp>
      <NuxtLayout>
        <NuxtPage />
        <button
          v-show="showScrollTop"
          @click="scrollToTop"
          class="fixed bottom-4 right-4 lg:bottom-12 lg:right-12 bg-gray-500 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 opacity-0 transition-opacity duration-300 leading-none"
          :class="{ 'opacity-100': showScrollTop }"
        >
          <UIcon name="i-heroicons-arrow-up"/>
        </button>
      </NuxtLayout>
    </UApp>
  </div>
</template>
