<script setup lang="ts">
const { successRedirectUrl = "/admin/settings" } = defineProps<{
  successRedirectUrl?: string;
}>();

import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { authSchema, type AuthSchema } from "#shared/schemas/authSchema";

const fields: AuthFormField[] = [
  {
    label: "Login",
    name: "login",
    type: "text",
    placeholder: "Enter your login",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const { fetch: refreshSession } = useUserSession();

const toast = useToast();

const onSubmit = async ({ data }: FormSubmitEvent<AuthSchema>) => {
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: data,
    });

    await refreshSession();
    await navigateTo(successRedirectUrl);
  } catch ({ data }: any) {
    toast.add({
      title: "Error",
      description: data?.message,
      color: "error",
    });
  }
};
</script>

<template>
  <div>
    <UAuthForm
      :schema="authSchema"
      :fields="fields"
      icon="i-lucide-lock"
      @submit="onSubmit"
    />
  </div>
</template>

<style scoped></style>
