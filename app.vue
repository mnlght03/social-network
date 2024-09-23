<script setup lang="ts">
const dark = useDarkMode()
</script>

<template>
  <div :class="{ dark }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
