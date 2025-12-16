<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="block group">
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div v-if="project.previewImage" class="">
        <NuxtImg
          :src="project.previewImage.path"
          :alt="project.title"
          class="w-full h-full object-cover max-h-[600px] group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {{ project.title }}
        </h3>
        <p v-if="project.description" class="text-gray-600 text-sm mt-2 line-clamp-2">
          {{ project.description }}
        </p>
        <div v-if="project.tags.length" class="flex flex-wrap gap-1 mt-3">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>
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
