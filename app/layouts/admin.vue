<script setup lang="ts">
import { useAdminNav } from '~/composables/useAdminNav';

const { navItems } = useAdminNav();
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
