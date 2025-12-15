<template>
  <div class="my-8">
    <UCarousel
      v-slot="{ item }"
      :items="images"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
      arrows
      indicators
    >
      <UCarouselItem>
        <NuxtImg
          :src="item.path"
          :alt="item.filename || 'Carousel image'"
          class="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </UCarouselItem>
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
