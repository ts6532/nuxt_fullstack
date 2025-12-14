<script setup lang="ts">
import PickImageCard from "../../components/PickImageCard.vue";
import type { FileDTO } from "~~/server/models/file";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const { data, refresh } = useAsyncData(
  "settings",
  () => $fetch("/api/settings"),
  {},
);

const heroImage = computed(() => data.value?.heroImage);
const aboutImage = computed(() => data.value?.aboutImage);

const isSaving = ref(false);

const pickImage = (field: "heroImage" | "aboutImage", image: FileDTO) => {
  if (data.value) {
    const newData = { ...data.value };
    newData[field] = image;
    data.value = newData;
  }
};

const saveSettings = async () => {
  if (!data.value) return;

  isSaving.value = true;

  try {
    await $fetch("/api/settings", {
      method: "PUT",
      body: {
        heroImage: data.value.heroImage?._id,
        aboutImage: data.value.aboutImage?._id,
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
