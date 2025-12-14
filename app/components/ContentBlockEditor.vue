<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
import type { PopulatedContentBlockUnion } from "~~/server/models/project";

const contentBlocks = defineModel<PopulatedContentBlockUnion[]>("contentBlocks");

const addBlock = (type: 'text' | 'image' | 'carousel') => {
  if (!contentBlocks.value) contentBlocks.value = [];
  const newBlock = type === 'text'
    ? { type, content: '' }
    : type === 'image'
    ? { type, image: undefined }
    : { type, images: [] };
  contentBlocks.value.push(newBlock as PopulatedContentBlockUnion);
};

const removeBlock = (index: number) => {
  contentBlocks.value?.splice(index, 1);
};
</script>

<template>
  <div>
    <div class="flex gap-2 mb-4">
      <UButton
        @click="addBlock('text')"
        icon="i-heroicons-document-text"
        variant="outline"
        size="sm"
      >
        Добавить текст
      </UButton>
      <UButton
        @click="addBlock('image')"
        icon="i-heroicons-photo"
        variant="outline"
        size="sm"
      >
        Добавить изображение
      </UButton>
      <UButton
        @click="addBlock('carousel')"
        icon="i-heroicons-queue-list"
        variant="outline"
        size="sm"
      >
        Добавить карусель
      </UButton>
    </div>

    <VueDraggableNext
      v-model="contentBlocks"
      class="space-y-4"
      handle=".drag-handle"
    >
      <div
        v-for="(block, index) in contentBlocks"
        :key="index"
        class="relative border rounded p-2"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="drag-handle cursor-move text-gray-500">
            <UIcon name="i-heroicons-bars-3" />
          </div>
          <UButton
            @click="removeBlock(index)"
            icon="i-heroicons-trash"
            variant="ghost"
            size="xs"
            class="text-red-500 hover:text-red-700"
          >
            Удалить
          </UButton>
        </div>

        <TextBlockEditor
          v-if="block.type === 'text'"
          v-model:content="block.content"
        />
        <ImageBlockEditor
          v-else-if="block.type === 'image'"
          v-model:image="block.image"
        />
        <CarouselBlockEditor
          v-else-if="block.type === 'carousel'"
          v-model:images="block.images"
        />
      </div>
    </VueDraggableNext>
  </div>
</template>
