<script setup lang="ts">
const { data: settings } = useFetch("/api/settings", {
  key: "settings",
  getCachedData: useNuxtApp().$useClientCash,
  pick: ["vkLink", "instLink", "beLink"],
});
</script>
<template>
  <div class="flex justify-center space-x-4 mt-4">
    <a v-if="settings?.vkLink" :href="settings.vkLink" target="_blank">
      <UIcon
        name="cib:vk"
        class="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      />
    </a>
    <a v-if="settings?.instLink" :href="settings.instLink" target="_blank">
      <UIcon
        name="cib:instagram"
        class="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      />
    </a>
    <a v-if="settings?.beLink" :href="settings.beLink" target="_blank">
      <UIcon
        name="cib:behance"
        class="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      />
    </a>
  </div>
</template>
