<script setup lang="ts">
import PickImageModal from "~/components/ui/PickImageModal.vue";
import PickImageCard from "../../components/ui/PickImageCard.vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const { data: settings, refresh } = useAsyncData("settings", () =>
  $fetch("/api/settings"),
);

const isSaving = ref(false);

const overlay = useOverlay();

const modal = overlay.create(PickImageModal);

const pickImage = async (settingsField: "aboutImage" | "heroImage") => {
  const imagePickingInstance = modal.open();

  const image = await imagePickingInstance.result;

  if (image && settings.value) settings.value[settingsField] = image;
};

const saveSettings = async () => {
  if (!settings.value) return;

  try {
    isSaving.value = true;

    await $fetch("/api/settings", {
      method: "PUT",
      body: {
        heroImage: settings.value.heroImage,
        aboutImage: settings.value.aboutImage,
      },
    });

    useToast().add({
      title: "Успех",
      description: "Настройки успешно сохранены",
      color: "success",
      icon: "i-heroicons-check-circle",
    });

    await refresh();
  } catch (error) {
    console.error("Error saving settings:", error);
    useToast().add({
      title: "Ошибка",
      description: "Не удалось сохранить настройки",
      color: "error",
      icon: "i-heroicons-exclamation-circle",
    });
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
      <UContainer>
        <div class="flex flex-row flex-nowrap gap-6">
          <div class="w-1/2">
            <PickImageCard
              :metaImage="heroImage"
              title="Картинка на главной в самом верху"
              @pick="(image) => pickImage('heroImage', image)"
            />
          </div>

          <div class="w-1/2">
            <PickImageCard
              :meta-image="aboutImage"
              title="Картинка обо мне"
              @pick="(image) => pickImage('aboutImage', image)"
            />
          </div>
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
