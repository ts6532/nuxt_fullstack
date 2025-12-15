<script setup lang="ts">
import PickImageModal from "~/components/admin/PickImageModal.vue";
import type { FileDTO } from "~~/server/models/file";

const images = defineModel<FileDTO[]>("images");

const overlay = useOverlay();

const modal = overlay.create(PickImageModal);

const addImage = async () => {
  const imagePickingInstance = modal.open();

  const image = await imagePickingInstance.result;

  if (image) {
    if (!images.value) images.value = [];
    images.value.push(image);
  }
};

const removeImage = (index: number) => {
  images.value?.splice(index, 1);
};
</script>

<template>
  <div class="border rounded p-4">
    <h3 class="text-lg font-semibold mb-2">Карусель изображений</h3>
    <div class="flex flex-wrap gap-2 mb-2">
      <div
        v-for="(image, index) in images"
        :key="image._id"
        class="relative"
      >
        <img
          :src="image.path"
          alt="Carousel image"
          class="w-20 h-20 object-cover rounded"
        />
        <button
          @click="removeImage(index)"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
        >
          ×
        </button>
      </div>
    </div>
    <UButton
      @click="addImage"
      icon="i-heroicons-plus"
      variant="outline"
      size="sm"
    >
      Добавить изображение
    </UButton>
  </div>
</template>
