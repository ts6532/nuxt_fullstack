<script setup lang="ts">
defineProps<{
  text: string;
}>();

const emit = defineEmits<{ close: [boolean] }>();
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :title="`Подтвердите ${text}`"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Нет" @click="emit('close', false)" />
        <UButton label="Да" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
