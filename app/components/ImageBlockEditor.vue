<script setup lang="ts">
import type { FileDTO } from "~~/server/models/file";

const image = defineModel<FileDTO>("image");
</script>

<template>
  <div class="border rounded p-4">
    <h3 class="text-lg font-semibold mb-2">Изображение</h3>
    <PickImageCard v-model:metaImage="image" />
  </div>
</template>
