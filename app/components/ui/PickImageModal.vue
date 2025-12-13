<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

const emit = defineEmits<{
  close: [image?: FileDTO];
}>();

const { data } = useAsyncData("images", () => $fetch("/api/uploads"));

const handleSelect = (image: FileDTO) => {
  emit("close", image);
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <UModal
    title="Выберите изображение"
    :close="{ onClick: () => emit('close') }"
    fullscreen
  >
    <template #body>
      <div class="grid grid-cols-3 gap-4 p-4">
        <div
          v-for="image in data"
          :key="image._id"
          @click="handleSelect(image)"
          class="cursor-pointer hover:opacity-75 transition-opacity hover:border rounded"
        >
          <img :src="image.path" class="w-full h-32 object-cover rounded" />
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
