<template>
  <div class="p-4">
    <h3 class="text-lg font-medium mb-2">{{ title }}</h3>

    <button
      type="button"
      @click="pickImage()"
      class="w-full h-48 overflow-hidden flex items-center focus:outline-none"
    >
      <template v-if="metaImage?.path">
        <img
          :src="metaImage.path"
          alt="About Image Preview"
          class="w-full h-full object-cover"
        />
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
  </div>
</template>

<script setup lang="ts">
import PickImageModal from "~/components/ui/PickImageModal.vue";
import type { FileDTO } from "~~/server/models/file";

const { metaImage: FileDTO = {}, title = "Выбери картинку" } = defineProps<{
  metaImage?: FileDTO;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "onPick", image: FileDTO): void;
}>();

const overlay = useOverlay();

const modal = overlay.create(PickImageModal);

const pickImage = async () => {
  const imagePickingInstance = modal.open();

  const image = await imagePickingInstance.result;

  if (image) emit("onPick", image);
};
</script>
