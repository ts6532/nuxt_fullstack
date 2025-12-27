<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="block group">
    <div class="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div v-if="project.previewImage" class="">
        <NuxtImg
          :src="project.previewImage.path"
          :alt="project.title"
          class="w-full h-full object-cover max-h-[600px] group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h3 class="text-base text-center text-ellipsis text-gray-700 group-hover:text-gray-900 transition-colors">
          {{ project.title }}
        </h3>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ProjectPreviewDTO } from '~~/server/models/project';

defineProps<{
  project: ProjectPreviewDTO;
}>();
</script>
