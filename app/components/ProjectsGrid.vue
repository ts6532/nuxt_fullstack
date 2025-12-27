<template>
  <div class="container mx-auto px-4 py-8">
    <MasonryWall
      :items="projects"
      :ssr-columns="1"
      :min-columns="1"
      :max-columns="3"
      :gap="16"
      class="projects-grid"
    >
      <template #default="{ item }">
        <ProjectCard :project="item" />
      </template>
    </MasonryWall>

    <div ref="sentinel" class="h-4"></div>
  </div>
</template>

<script setup lang="ts">
import MasonryWall from "@yeger/vue-masonry-wall";
import type { ProjectPreviewDTO } from "~~/server/models/project";

const limit = 12;
const hasMore = ref(true);
const skip = ref(0);

const sentinel = useTemplateRef<HTMLElement>("sentinel");

const projects = ref<ProjectPreviewDTO[]>([]);

const { pending: loading, error: fetchError } = useFetch<ProjectPreviewDTO[]>(
  "/api/projects",
  {
    key: "projects-grid",
    query: { skip, limit },
    server: false,
    default: () => [],
    transform: (newData) => {
      if (Array.isArray(newData)) {
        if (newData.length < limit) hasMore.value = false;

        projects.value = [...projects.value, ...newData];
      }

      return newData;
    },
  },
);

onMounted(() => {
  if (sentinel.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading.value && hasMore.value) {
          skip.value += limit;
        }
      },
      { threshold: 0.1, rootMargin: "150px" },
    );

    observer.observe(sentinel.value);
  }
});
</script>

<style scoped>
.projects-grid {
  min-height: 50vh;
}
</style>
