<script setup lang="ts">
definePageMeta({
  layout: "simple",
  middleware: "guest",
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md" title="Давай залогинимся!">
      <LoginForm :success-redirect-url="'/admin/settings'" />
    </UPageCard>
  </div>
</template>

<style scoped></style>
