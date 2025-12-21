<script setup lang="ts">
useFetch("/api/settings", { key: "settings" });
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
