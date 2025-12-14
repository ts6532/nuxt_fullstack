<script setup lang="ts">
import type { PopulatedProjectDTO, PopulatedContentBlockUnion } from "~~/server/models/project";
import type { FileDTO } from "~~/server/models/file";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const router = useRouter();

const project = reactive({
  title: '',
  description: '',
  tags: [] as string[],
  mainImage: undefined as FileDTO | undefined,
  previewImage: undefined as FileDTO | undefined,
  published: false,
  order: 0,
  content: [] as PopulatedContentBlockUnion[],
});

const isSaving = ref(false);

const saveProject = async () => {
  if (!project.title.trim()) {
    alert('Название обязательно');
    return;
  }

  isSaving.value = true;

  try {
    // Convert content to save format
    const contentToSave = project.content.map(block => {
      if (block.type === 'text') {
        return { type: 'text', content: block.content };
      } else if (block.type === 'image') {
        return { type: 'image', image: block.image?._id || '' };
      } else if (block.type === 'carousel') {
        return { type: 'carousel', images: block.images.map(img => img._id) };
      }
    });

    await $fetch('/api/projects', {
      method: 'POST',
      body: {
        ...project,
        mainImage: project.mainImage?._id,
        previewImage: project.previewImage?._id,
        content: contentToSave,
      },
    });

    await router.push('/admin/projects');
  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    alert('Ошибка при сохранении проекта');
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <h1 class="text-xl font-semibold">Создать проект</h1>
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
        <div class="space-y-6">
          <UFormField label="Название">
            <UInput v-model="project.title" />
          </UFormField>

          <UFormField label="Описание">
            <UTextarea v-model="project.description" :rows="3" />
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
