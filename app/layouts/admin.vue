<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Общие настройки",
    icon: "i-heroicons-cog-6-tooth",
    to: "/admin/settings",
    active: route.path === "/admin/settings",
  },
  {
    label: "Фаилы",
    icon: "i-heroicons-folder",
    to: "/admin/files",
    active: route.path === "/admin/files",
  },
]);
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible>
      <template #header="{ collapsed }">
        <UDashboardSidebarCollapse variant="subtle" />

        <UColorModeButton v-if="!collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="navItems"
          orientation="vertical"
        />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
