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
        <ProjectPreview :project="item" />
      </template>
    </MasonryWall>

    <!-- <div v-if="loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
      ></div>
    </div>

    <div
      v-if="!hasMore && projects.length > 0"
      class="text-center py-8 text-gray-500"
    >
      Больше проектов нет
    </div>

    <div v-if="error" class="text-center py-8 text-red-500">
      Ошибка загрузки проектов
    </div> -->

    <!-- Sentinel for infinite scroll -->
    <!-- <div ref="sentinel" class="h-4"></div> -->
  </div>
</template>

<script setup lang="ts">
import MasonryWall from "@yeger/vue-masonry-wall";
import type { ProjectPreviewDTO } from "~~/server/models/project";

const hasMore = ref(true);
const skip = ref(0);
const limit = 12;

const sentinel = useTemplateRef<HTMLElement>("sentinel");

// const projects = ref<ProjectPreviewDTO[]>([]);

const { data: projects, pending: loading, error: fetchError } = useFetch<ProjectPreviewDTO[]>(
  "/api/projects",
  {
    key: "projects-grid",
    query: { skip, limit },
    server: false,
    default: () => [],
    transform: (fetchedProjects) => {
      if (fetchedProjects?.length)
        projects.value = [...projects.value, ...fetchedProjects];
      return fetchedProjects;
    },
  },
);

const error = computed(() => !!fetchError.value);

// onMounted(() => {
//   if (sentinel.value) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0]?.isIntersecting && !loading.value && hasMore.value) {
//           skip.value += limit;
//         }
//       },
//       { threshold: 0.1 },
//     );

//     observer.observe(sentinel.value);
//   }
// });
</script>

<style scoped>
.projects-grid {
  min-height: 50vh;
}
</style>
