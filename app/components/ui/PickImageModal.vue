<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

const emit = defineEmits<{
  close: [image?: FileDTO];
}>();

const { data } = useAsyncData("images", () => $fetch("/api/uploads"), {
  getCachedData: (key, nuxtApp) =>
    nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
});

const handleSelect = (image: FileDTO) => {
  emit("close", image);
};
</script>

<template>
  <UModal
    title="Выберите изображение"
    :close="{ onClick: () => emit('close') }"
    fullscreen
  >
    <template #body>
      <div class="flex flex-wrap gap-4 p-4">
        <div
          v-for="image in data"
          :key="image._id"
          @click="handleSelect(image)"
          class="h-48 shrink-0 cursor-pointer hover:opacity-75 transition-opacity hover:border rounded flex items-center justify-center overflow-hidden"
        >
          <img :src="image.path" class="h-full object-cover rounded" />
        </div>
      </div>
    </template>
  </UModal>
</template>
