<script setup lang="ts">
import PickImageModal from "~/components/ui/PickImageModal.vue";
import type { FileDTO } from "~~/server/models/file";

interface Props {
  metaImage?: FileDTO;
  title?: string;
}

const { metaImage = {}, title = "Выбери картинку" } = defineProps<Props>()

const emit = defineEmits<{
  (e: "pick", image: FileDTO): void;
}>();

const overlay = useOverlay();

const modal = overlay.create(PickImageModal);

const pickImage = async () => {
  const imagePickingInstance = modal.open();

  const image = await imagePickingInstance.result;
  console.log("Picked image:", image);
  if (image) emit("pick", image);
};
</script>

<template>
  <div class="p-4">
    <h3 class="text-lg font-medium mb-2">{{ title }}</h3>

    <button
      type="button"
      @click="pickImage()"
      class="w-48 h-48 overflow-hidden flex items-center focus:outline-none"
    >
      <template v-if="metaImage?.path">
        <img
          :src="metaImage.path"
          alt="Image Preview"
          class="h-full object-cover"
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
