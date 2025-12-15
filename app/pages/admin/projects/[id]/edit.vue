<script setup lang="ts">
import type {
  PopulatedContentBlockUnion,
  PopulatedProjectDTO,
} from "~~/server/models/project";

const route = useRoute();
const router = useRouter();

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const projectId = route.params.id as string;

const { data: loadedProject } = await useAsyncData<PopulatedProjectDTO>(
  `project-${projectId}`,
  () => $fetch(`/api/admin/projects/${projectId}`),
);

if (!loadedProject.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

const projectData = loadedProject.value;

const project = reactive({
  title: projectData.title,
  slug: projectData.slug,
  description: projectData.description || "",
  tags: [...projectData.tags],
  mainImage: projectData.mainImage,
  previewImage: projectData.previewImage,
  published: projectData.published,
  order: projectData.order,
  content: [...projectData.content] as PopulatedContentBlockUnion[],
});

const isSaving = ref(false);

const saveProject = async () => {
  if (!project.title.trim()) {
    alert("Название обязательно");
    return;
  }

  isSaving.value = true;

  try {
    // Convert content to save format
    const contentToSave = project.content.map((block) => {
      if (block.type === "text") {
        return { type: "text", content: block.content };
      } else if (block.type === "image") {
        return { type: "image", image: block.image?._id || "" };
      } else if (block.type === "carousel") {
        return { type: "carousel", images: block.images.map((img) => img._id) };
      }
    });

    await $fetch(`/api/admin/projects/${projectId}`, {
      method: "PUT",
      body: {
        ...project,
        mainImage: project.mainImage?._id,
        previewImage: project.previewImage?._id,
        content: contentToSave,
      },
    });

    await router.push("/admin/projects");
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
    alert("Ошибка при сохранении проекта");
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <h1 class="text-xl font-semibold">Редактировать проект</h1>
        <UButton
          icon="i-heroicons-check"
          color="primary"
          variant="solid"
          :loading="isSaving"
          @click="saveProject"
        >
          Сохранить
        </UButton>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UContainer>
        <div class="flex flex-col gap-6">
          <div class="flex flex-row gap-6">
            <UFormField label="Название">
              <UInput v-model="project.title" />
            </UFormField>

            <UFormField label="Alias" hint="то что пишется в строке браузера" :ui="{ hint: 'ml-2'}">
              <UInput v-model="project.slug" disabled />
            </UFormField>
          </div>

          <UFormField label="Описание">
            <UTextarea v-model="project.description" :rows="3" class="w-full"/>
          </UFormField>

          <UFormField label="Теги">
            <UInputTags v-model="project.tags" />
          </UFormField>

          <div class="grid grid-cols-2 gap-6">
            <UFormField label="Главное изображение">
              <PickImageCard v-model:metaImage="project.mainImage" />
            </UFormField>

            <UFormField label="Превью изображение">
              <PickImageCard v-model:metaImage="project.previewImage" />
            </UFormField>
          </div>

          <div class="flex items-center gap-4">
            <UFormField label="Опубликовать">
              <UToggle v-model="project.published" />
            </UFormField>

            <UFormField label="Порядок">
              <UInput v-model.number="project.order" type="number" />
            </UFormField>
          </div>

          <UFormField label="Контент">
            <ContentBlockEditor v-model:contentBlocks="project.content" />
          </UFormField>
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
