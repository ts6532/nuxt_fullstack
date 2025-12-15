<script setup lang="ts">
import type { PopulatedProjectDTO } from "~~/server/models/project";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const { data: projects, refresh } = useAsyncData<PopulatedProjectDTO[]>(
  "admin-projects",
  () => $fetch("/api/admin/projects"),
  {},
);

const deleteProject = async (id: string) => {
  if (!confirm("Удалить проект?")) return;

  try {
    await $fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await refresh();
  } catch (error) {
    console.error("Ошибка при удалении:", error);
  }
};

const togglePublished = async (project: PopulatedProjectDTO) => {
  try {
    await $fetch(`/api/admin/projects/${project._id}`, {
      method: "PUT",
      body: { published: !project.published },
    });
    await refresh();
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
  }
};
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <UButton
          icon="i-heroicons-plus"
          color="primary"
          variant="solid"
          :to="'/admin/projects/new'"
        >
          Создать проект
        </UButton>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div v-if="projects" class="space-y-4">
        <div
          v-for="project in projects"
          :key="project._id"
          class="flex items-center justify-between p-4 border rounded"
        >
          <div>
            <h3 class="text-lg font-semibold">{{ project.title }}</h3>
            <p class="text-sm text-gray-600">{{ project.description }}</p>
            <div class="flex items-center gap-2 mt-1">
              <UIcon
                :name="project.published ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                :class="project.published ? 'text-green-500' : 'text-gray-400'"
              />
              <span class="text-sm">{{ project.published ? 'Опубликован' : 'Черновик' }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <UButton
              :to="`/admin/projects/${project._id}/edit`"
              icon="i-heroicons-pencil"
              variant="outline"
              size="sm"
            >
              Редактировать
            </UButton>
            <UButton
              v-if="project.published"
              :href="`/projects/${project.slug}`"
              target="_blank"
              icon="i-heroicons-arrow-top-right-on-square"
              variant="outline"
              size="sm"
            >
              Просмотр
            </UButton>
            <UButton
              @click="togglePublished(project)"
              :icon="project.published ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              variant="outline"
              size="sm"
            >
              {{ project.published ? 'Скрыть' : 'Опубликовать' }}
            </UButton>
            <UButton
              @click="deleteProject(project._id)"
              icon="i-heroicons-trash"
              variant="ghost"
              size="sm"
              class="text-red-500"
            >
              Удалить
            </UButton>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p>Загрузка проектов...</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
