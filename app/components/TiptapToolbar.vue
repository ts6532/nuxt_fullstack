<template>
  <div class="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
    <UTooltip text="Жирный" :popper="{ placement: 'top' }">
      <button
        type="button"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-blue-100': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-bold" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Курсив" :popper="{ placement: 'top' }">
      <button
        type="button"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-blue-100': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-italic" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Зачёркнутый" :popper="{ placement: 'top' }">
      <button
        type="button"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'bg-blue-100': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-minus" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Сбросить форматирование" :popper="{ placement: 'top' }">
      <button
        type="button"
        @click="editor.chain().focus().unsetAllMarks().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Очистить блоки" :popper="{ placement: 'top' }">
      <button
        type="button"
        @click="editor.chain().focus().clearNodes().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-backspace" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Параграф" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-bars-3" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Заголовок 1" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        H1
      </button>
    </UTooltip>

    <UTooltip text="Заголовок 2" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        H2
      </button>
    </UTooltip>

    <UTooltip text="Заголовок 3" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        H3
      </button>
    </UTooltip>

    <UTooltip text="Заголовок 4" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        H4
      </button>
    </UTooltip>

    <UTooltip text="Заголовок 5" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        H5
      </button>
    </UTooltip>

    <UTooltip text="Заголовок 6" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        H6
      </button>
    </UTooltip>

    <UTooltip text="Маркерный список" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Цитата" :popper="{ placement: 'top' }">
      <button
        type="button"
        :class="{ 'bg-blue-100': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Горизонтальная линия" :popper="{ placement: 'top' }">
      <button
        type="button"
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-minus" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Разрыв строки" :popper="{ placement: 'top' }">
      <button
        type="button"
        @click="editor.chain().focus().setHardBreak().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Отменить" :popper="{ placement: 'top' }">
      <button
        type="button"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        <UIcon name="i-heroicons-arrow-uturn-left" class="w-4 h-4" />
      </button>
    </UTooltip>

    <UTooltip text="Повторить" :popper="{ placement: 'top' }">
      <button
        type="button"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
        class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        <UIcon name="i-heroicons-arrow-uturn-right" class="w-4 h-4" />
      </button>
    </UTooltip>
  </div>
</template>

<script setup>
defineProps({
  editor: {
    type: Object,
    required: true,
  },
});
</script>