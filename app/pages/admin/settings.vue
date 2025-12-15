<script setup lang="ts">
import type { PopulatedSettingsDTO } from "~~/server/models/settings";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const { data, refresh } = useAsyncData<PopulatedSettingsDTO>("settings", () =>
  $fetch("/api/settings"),
);

const settings = ref<PopulatedSettingsDTO | null>(null);

watchEffect(() => {
  if (data.value) {
    settings.value = { ...data.value };
  }
});

const isSaving = ref(false);

const saveSettings = async () => {
  if (!settings.value) return;

  isSaving.value = true;

  try {
    await $fetch("/api/admin/settings", {
      method: "PUT",
      body: {
        heroImage: settings.value.heroImage?._id,
        aboutImage: settings.value.aboutImage?._id,
        aboutText: settings.value.aboutText,
      },
    });

    await refresh();
  } catch (error) {
    console.error("Ошибка при сохранении настроек:", error);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <UButton
          icon="i-heroicons-check"
          color="primary"
          variant="solid"
          :loading="isSaving"
          @click="saveSettings"
        >
          Сохранить
        </UButton>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UContainer v-if="settings">
        <div class="flex flex-row flex-nowrap gap-6">
          <div class="w-1/2">
            <UFormField label="Картинка на главной в самом верху">
              <PickImageCard v-model:metaImage="settings.heroImage" />
            </UFormField>
          </div>

          <div class="w-1/2">
            <UFormField label="Картинка обо мне">
              <PickImageCard v-model:metaImage="settings.aboutImage" />
            </UFormField>
          </div>
        </div>

        <div class="flex flex-row flex-nowrap gap-6 my-6">
          <div class="w-1/2"></div>

          <div class="w-1/2">
            <UFormField label="Текст на странице обо мне">
              <TiptapEditor v-model:content="settings.aboutText" />
            </UFormField>
          </div>
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
