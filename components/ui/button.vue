<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
    disabled: false,
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
    class="text-white bg-blue-400 rounded-full hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
    :class="[sizeVariant, fontVariant]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style module lang="scss"></style>
