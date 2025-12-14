<script setup>
import TiptapToolbar from "./TiptapToolbar.vue";

const content = defineModel("content");

const editor = useEditor({
  content: content.value,
  extensions: [TiptapStarterKit],
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML();
  },
});

onMounted(() => {
  const editorInstance = unref(editor);
  if (editorInstance) {
    editorInstance.commands.setContent(
      content.value || "<p>Start type text here...</p>",
    );
  }
});

onBeforeUnmount(() => {
  const editorInstance = unref(editor);
  if (editorInstance) {
    editorInstance.destroy();
  }
});
</script>

<template>
  <div v-if="editor" class="border border-gray-200 rounded-lg overflow-hidden">
    <TiptapToolbar :editor="editor" />

    <TiptapEditorContent :editor="editor" class="p-4 pl-6 min-h-64 size-full" />
  </div>
</template>

<style>
.tiptap {
  outline: none;
  height: 100%;
}
</style>
