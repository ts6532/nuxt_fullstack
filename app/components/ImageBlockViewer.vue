<template>
  <div class="my-8">
    <NuxtImg
      v-if="image?.path"
      :src="image.path"
      :alt="image.filename || 'Project image'"
      class="w-full rounded-lg shadow-lg"
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
