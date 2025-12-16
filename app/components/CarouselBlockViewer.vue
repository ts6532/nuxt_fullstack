<template>
  <div class="my-8">
    <UCarousel
      v-slot="{ item, index }"
      :items="images"
      :ui="{ item: 'basis-full lg:basis-1/2' }"
      arrows
      indicators
      loop
    >
      <NuxtImg
        :src="item.path"
        :alt="item.filename || 'Carousel image'"
        class="w-full h-96 object-cover rounded-lg shadow-md"
        @click="useFullscreen({ images, index })"
      />
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

interface Props {
  images: FileDTO[];
}

defineProps<Props>();
</script>
