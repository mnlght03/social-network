<script setup lang="ts">
const darkMode = useDarkMode()
// TODO: fix dark mode hydration
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full">
      <div class="grid grid-cols-12 mx-auto sm:px-5 lg:max-w-7xl lg:px-8 lg:gap-5">
        <Sidebar />
      </div>
    </div>
  </div>
</template>
