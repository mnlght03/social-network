<script setup lang="ts">
defineProps<{
  title?: string
  loading?: boolean
}>()

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div
    class="border-x"
    :class="borderColor"
  >
    <div
      class="sticky top-0 px-4 py-3 bg-white/80 dark:bg-dim-900/80 backdrop-filter-blur-md border-b"
      :class="borderColor"
    >
      <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>
    </div>
    <div v-if="$slots.persistent">
      <slot name="persistent" />
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center p-4 border-b"
      :class="borderColor"
    >
      <UiSpinner />
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style module lang="scss"></style>
