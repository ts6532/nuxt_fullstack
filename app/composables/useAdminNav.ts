import type { NavigationMenuItem } from "@nuxt/ui";

export function useAdminNav() {
  const route = useRoute();

  const navItems = computed<NavigationMenuItem[]>(() => [
    {
      label: "Общие настройки",
      icon: "i-heroicons-cog-6-tooth",
      to: "/admin/settings",
      active: route.path === "/admin/settings",
    },
    {
      label: "Проекты",
      icon: "i-heroicons-briefcase",
      to: "/admin/projects",
      active: route.path.startsWith("/admin/projects"),
    },
    {
      label: "Файлы",
      icon: "i-heroicons-folder",
      to: "/admin/files",
      active: route.path === "/admin/files",
    },
  ]);

  return {
    navItems,
  };
}
