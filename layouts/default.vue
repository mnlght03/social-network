<script setup lang="ts">
import { useDark } from '@vueuse/core'

// Initialize dark mode state
useDark()
</script>

<template>
  <div>
    <div class="bg-white dark:bg-dim-900">
      <div class="min-h-screen">
        <div class="grid grid-cols-12 mx-auto sm:px-5 lg:max-w-7xl lg:px-8 lg:gap-10">
          <LayoutNavbar />

          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <slot />
          </main>

          <LayoutSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss"></style>
