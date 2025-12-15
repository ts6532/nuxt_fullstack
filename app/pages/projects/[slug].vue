<template>
  <UContainer class="py-8">
    <div v-if="project">
      <!-- Main Image -->
      <div class="mb-8">
        <NuxtImg
          v-if="project.mainImage?.path"
          :src="project.mainImage.path"
          :alt="project.title"
          class="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <!-- Title -->
      <h1 class="text-4xl font-bold mb-4">{{ project.title }}</h1>

      <!-- Description -->
      <p v-if="project.description" class="text-lg text-gray-600 mb-6">
        {{ project.description }}
      </p>

      <!-- Tags -->
      <div v-if="project.tags && project.tags.length" class="mb-8">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Content Blocks -->
      <div class="space-y-8">
        <component
          v-for="(block, index) in project.content"
          :key="index"
          :is="getBlockComponent(block.type)"
          v-bind="getBlockProps(block)"
        />
      </div>
    </div>

    <div v-else-if="error">
      <p class="text-red-500">Ошибка загрузки проекта: {{ error.message }}</p>
    </div>

    <div v-else>
      <p>Загрузка...</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import TextBlockViewer from "~/components/TextBlockViewer.vue";
import ImageBlockViewer from "~/components/ImageBlockViewer.vue";
import CarouselBlockViewer from "~/components/CarouselBlockViewer.vue";

definePageMeta({
  layout: "simple",
});

import type {
  PopulatedProjectDTO,
  PopulatedContentBlockUnion,
} from "~~/server/models/project";

const route = useRoute();
const slug = route.params.slug as string;

const { data: project, error } = await useAsyncData<PopulatedProjectDTO>(
  `project-${slug}`,
  () => $fetch(`/api/projects/${slug}`),
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  },
);

const getBlockComponent = (type: string) => {
  switch (type) {
    case "text":
      return TextBlockViewer;
    case "image":
      return ImageBlockViewer;
    case "carousel":
      return CarouselBlockViewer;
    default:
      return null;
  }
};

const getBlockProps = (block: PopulatedContentBlockUnion) => {
  switch (block.type) {
    case "text":
      return { content: block.content };
    case "image":
      return { image: block.image };
    case "carousel":
      return { images: block.images };
    default:
      return {};
  }
};
</script>
