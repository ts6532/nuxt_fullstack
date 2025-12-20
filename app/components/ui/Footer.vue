<script setup lang="ts">
import SocialIcons from "~/components/ui/SocialIcons.vue";
</script>

<template>
  <footer class="px-6 py-4 border-t border-gray-200 text-center">
    <p class="m-0 text-gray-500 text-sm">
      © {{ new Date().getFullYear() }} My Portfolio
    </p>

    <SocialIcons />
  </footer>
</template>
