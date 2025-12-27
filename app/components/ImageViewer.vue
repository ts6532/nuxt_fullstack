<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

const props = defineProps<{
  url?: string;
  images?: FileDTO[];
  index?: number;
}>();

const emit = defineEmits<{ close: [boolean] }>();

const isZoomed = ref(false);
const transformOrigin = ref("50% 50%");

const handleZoom = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  transformOrigin.value = `${x}% ${y}%`;
  isZoomed.value = !isZoomed.value;
};

const onSelect = () => {
  isZoomed.value = false;
  transformOrigin.value = "50% 50%";
};
</script>

<template>
  <UModal fullscreen>
    <template #body>
      <div
        v-if="url"
        class="flex items-center justify-center h-full overflow-clip"
        @click="handleZoom($event)"
        :class="{
          'cursor-zoom-in': !isZoomed,
          'cursor-zoom-out': isZoomed,
          'transition-transform duration-200': true,
        }"
      >
        <NuxtImg
          class="h-full"
          :src="url"
          :style="{
            transform: isZoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: transformOrigin,
          }"
          loading="lazy"
        />
      </div>

      <UCarousel
        v-if="images"
        :start-index="index ?? 0"
        :ui="{
          root: 'h-full',
          viewport: 'h-full',
          container: 'h-full',
          item: 'h-full',
          prev: 'sm:start-12 start-12',
          next: 'sm:end-12 end-12',
        }"
        :items="images"
        arrows
        @select="onSelect"
        v-slot="{ item }"
      >
        <div
          class="flex items-center justify-center h-full"
          @click="handleZoom($event)"
          :class="{
            'transition-transform duration-200': true,
          }"
        >
          <div class="h-full overflow-clip">
            <NuxtImg
              :src="item.path"
              class="h-full"
              :class="{
                'cursor-zoom-in': !isZoomed,
                'cursor-zoom-out': isZoomed,
              }"
              :style="{
                transform: isZoomed ? 'scale(1.7)' : 'scale(1)',
                transformOrigin: transformOrigin,
              }"
            />
          </div>
        </div>
      </UCarousel>
    </template>
  </UModal>
</template>
