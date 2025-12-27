<template>
  <div class="my-8">
    <NuxtImg
      v-if="image?.path"
      :src="image.path"
      :alt="image.filename || 'Project image'"
      fit="contain"
      class="w-full max-h-[90vh] mx-auto object-contain cursor-pointer"
      @click="useFullscreen({ image })"
    />
  </div>
</template>

<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

interface Props {
  image?: FileDTO;
}

defineProps<Props>();
</script>
