<script setup lang="ts">
const { borderColor } = useTailwindConfig()
</script>

<template>
  <div
    class="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-400 border-b"
    :class="borderColor"
  >
    <slot />
  </div>
</template>
