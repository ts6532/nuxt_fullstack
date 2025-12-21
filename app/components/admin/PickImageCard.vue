<script setup lang="ts">
import PickImageModal from "~/components/admin/PickImageModal.vue";
import ConfirmationModal from "~/components/admin/ConfirmationModal.vue";
import type { FileDTO } from "~~/server/models/file";

const metaImage = defineModel<FileDTO>("metaImage");

const overlay = useOverlay();

const modal = overlay.create(PickImageModal);
const confirmationModal = overlay.create(ConfirmationModal);

const pickImage = async () => {
  const imagePickingInstance = modal.open();

  const image = await imagePickingInstance.result;

  if (image) metaImage.value = image;
};

const clearImageWithConfirmation = async () => {
  const confirmationInstance = confirmationModal.open({ text: "удаление изображения" });

  const isConfirmed = await confirmationInstance.result;

  if (isConfirmed) metaImage.value = undefined;
};
</script>

<template>
  <button
    type="button"
    @click="pickImage()"
    class="w-48 h-48 overflow-hidden flex items-center focus:outline-none relative group"
  >
    <template v-if="metaImage?.path">
      <img
        :src="metaImage.path"
        alt="Image Preview"
        class="h-full object-cover"
      />
      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-50 rounded"
      >
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="ghost"
          size="sm"
          @click.stop="clearImageWithConfirmation()"
        />
      </div>
    </template>

    <template v-else>
      <div
        class="h-full flex flex-col items-center justify-center text-center bg-gray-100 rounded-md cursor-pointer p-3"
      >
        <UIcon name="i-heroicons-plus" />
        <div>Добавить изображение</div>
      </div>
    </template>
  </button>
</template>
