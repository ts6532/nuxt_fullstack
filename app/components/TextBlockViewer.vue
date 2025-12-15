<template>
  <div class="prose prose-lg max-w-none">
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content: string;
}

defineProps<Props>();
</script>
