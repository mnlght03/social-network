<script setup lang="ts">
defineProps<{
  errors?: string[]
}>()
</script>

<template>
  <form class="flex flex-col gap-6">
    <slot />
    <UiErrors
      v-if="errors?.length"
      :errors="errors"
    />
    <slot name="bottom" />
  </form>
</template>
