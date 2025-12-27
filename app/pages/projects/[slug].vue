<script setup lang="ts">
import TextBlockViewer from "~/components/TextBlockViewer.vue";
import ImageBlockViewer from "~/components/ImageBlockViewer.vue";
import CarouselBlockViewer from "~/components/CarouselBlockViewer.vue";

import type {
  PopulatedProjectDTO,
  PopulatedContentBlockUnion,
} from "~~/server/models/project";

definePageMeta({
  layout: "simple",
});

const route = useRoute();

const slug = computed(() => route.params.slug as string);

const { data: project } = useFetch<PopulatedProjectDTO>(
  `/api/projects/${slug.value}`,
  { key: `project-${slug.value}` },
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

<template>
  <div v-if="project">
    <div class="max-sm:hidden">
      <NuxtImg
        v-if="project.mainImage?.path"
        :src="project.mainImage.path"
        :alt="project.title"
        class="w-full max-h-96 object-cover"
      />
    </div>

    <UContainer class="max-sm:py-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <UButton color="neutral" variant="ghost" icon="i-heroicons-arrow-left" @click="navigateTo('/')"></UButton>
        <h1 class="text-4xl font-bold leading-none">{{ project.title }}</h1>
      </div>

      <p v-if="project.description" class="text-lg text-gray-600 mb-6">
        {{ project.description }}
      </p>

      <div class="space-y-8">
        <component
          v-for="(block, index) in project.content"
          :key="index"
          :is="getBlockComponent(block.type)"
          v-bind="getBlockProps(block)"
        />
      </div>
    </UContainer>
  </div>
</template>
