<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

const props = defineProps<{
  url?: string;
  images?: FileDTO[];
  index?: number;
}>();

const emit = defineEmits<{ close: [boolean] }>();
</script>

<template>
  <UModal fullscreen>
    <template #body>
      <div v-if="url" class="flex items-center justify-center h-full">
        <NuxtImg
          class="h-full"
          :src="url"
          loading="lazy"
        />
      </div>

      <UCarousel
        v-if="images"
        :start-index="index ?? 0"
        :ui="{
          root: 'h-full',
          viewport: 'h-full',
          container: 'h-full',
          item: 'h-full',
          prev: 'sm:start-12 start-12',
          next: 'sm:end-12 end-12',
        }"
        :items="images"
        arrows
        v-slot="{ item }"
      >
      
        <div class="flex items-center justify-center h-full">
          <NuxtImg :src="item.path" class="h-full"/>
        </div>
      </UCarousel>
    </template>
  </UModal>
</template>
