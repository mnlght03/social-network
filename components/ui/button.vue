<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    type?: ButtonHTMLAttributes['type']
  }>(),
  {
    disabled: false,
    type: 'button',
  },
)

const sizeVariant = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-2'
    case 'lg':
      return 'px-4 py-3'
    case 'md':
    default:
      return 'px-3 py-3'
  }
})

const fontVariant = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'text-md'
    default:
      return 'text-sm'
  }
})
</script>

<template>
  <button
    class="text-white shadow-sm bg-blue-400 rounded-full hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
    :type="type"
    :class="[sizeVariant, fontVariant]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
