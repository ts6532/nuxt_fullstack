<script setup lang="ts">
const content = defineModel<string>("content");
</script>

<template>
  <div class="border rounded p-4">
    <h3 class="text-lg font-semibold mb-2">Текстовый блок</h3>
    <TiptapEditor v-model:content="content" />
  </div>
</template>
