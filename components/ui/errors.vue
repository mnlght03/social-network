<script setup lang="ts">
defineProps<{
  errors: string[]
}>()
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="error, i in errors"
      :key="i"
      class="text-sm text-red-500"
    >
      {{ error }}
    </div>
  </div>
</template>
