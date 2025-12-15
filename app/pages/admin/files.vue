<script setup lang="ts">
import ConfirmationModal from "~/components/admin/ConfirmationModal.vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const {
  data: filesList,
  refresh,
  pending: isLoading,
} = useAsyncData(
  "files",
  async () => {
    const response = await $fetch("/api/admin/uploads");

    return response ?? [];
  },
  {
    default: () => [],
    watch: [],
  },
);

const overlay = useOverlay();

const modal = overlay.create(ConfirmationModal);

const deleteFileWithConfirmation = async (fileId: string) => {
  if (!fileId) return;

  const confirmationInstance = modal.open({ text: "удаление фаила" });

  const isConfirmed = await confirmationInstance.result;

  if (isConfirmed) deleteFile(fileId);
};

const deleteFile = async (fileId: string) => {
  try {
    const response = await $fetch(`/api/admin/upload?id=${fileId}`, {
      method: "DELETE",
    });

    if (response.success) {
      useToast().add({
        title: "Успех",
        description: "Файл успешно удален",
        color: "success",
        icon: "i-heroicons-check-circle",
      });

      await refresh();
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    useToast().add({
      title: "Ошибка",
      description: "Не удалось удалить файл",
      color: "error",
      icon: "i-heroicons-exclamation-circle",
    });
  }
};

const files = ref<File[]>([]);

const isUploading = ref(false);

const resetFiles = () => {
  files.value = [];
};

const uploadFiles = async () => {
  isUploading.value = true;

  let allSuccess = true;

  let uploadedCount = 0;

  try {
    for (let i = 0; i < files.value.length; i++) {
      const file: File = files.value[i]!;

      try {
        const formData = new FormData();
        formData.append("file", file);

        await $fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
          headers: {},
        });

        uploadedCount++;
      } catch (fileError) {
        console.error(`Error uploading file ${file.name}:`, fileError);
        allSuccess = false;

        useToast().add({
          title: "Ошибка загрузки",
          description: `Не удалось загрузить файл: ${file.name || "неизвестный файл"}`,
          color: "error",
          icon: "i-heroicons-exclamation-circle",
        });
      }
    }

    files.value = [];

    if (allSuccess && uploadedCount > 0) {
      useToast().add({
        title: "Успех",
        description: `Файлы успешно загружены! (${pluralize(uploadedCount, ["файл", "файла", "файлов"])})`,
        color: "success",
        icon: "i-heroicons-check-circle",
      });

      await refresh();
    } else if (uploadedCount === 0) {
      useToast().add({
        title: "Ошибка",
        description: "Не удалось загрузить ни один файл",
        color: "error",
        icon: "i-heroicons-exclamation-circle",
      });
    }
  } catch (error: any) {
    const errorMessage = error.message || "Ошибка при загрузке файлов";
    console.error("Upload error:", error);

    useToast().add({
      title: "Ошибка",
      description: errorMessage,
      color: "error",
      icon: "i-heroicons-exclamation-circle",
    });
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <UModal title="Загрузить файл" fullscreen @after:leave="resetFiles">
          <UButton icon="i-heroicons-plus" color="primary" variant="solid" />

          <template #body>
            <UFileUpload
              class="min-w-96 w-fit m-auto"
              icon="i-lucide-image"
              multiple
              v-model="files"
              label="Бросай картинки сюда"
              description="PNG, JPG or WEBP (max. 5MB)"
              :disabled="isUploading"
              :ui="{ file: 'h-60' }"
            />
          </template>
          <template #footer="{ close }">
            <UButton
              @click="uploadFiles()"
              :loading="isUploading"
              :disabled="isUploading || files.length === 0"
            >
              {{ isUploading ? "Загрузка..." : "Загрузить" }}
            </UButton>

            <UButton @click="close" :disabled="isUploading"> Отмена </UButton>
          </template>
        </UModal>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UContainer>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div v-for="file in filesList" :key="file._id" class="relative group">
            <UTooltip :text="`${file.filename}`" :popper="{ placement: 'top' }">
              <img
                :src="file.path"
                :alt="file.filename"
                class="w-full h-40 object-cover rounded-lg shadow-sm"
              />
            </UTooltip>
            <div
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-50 rounded"
            >
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="sm"
                @click="deleteFileWithConfirmation(file._id)"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<style scoped></style>
