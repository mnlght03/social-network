<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const props = defineProps<NuxtLinkProps>()

const { defaultTransition } = useTailwindConfig()
</script>

<template>
  <NuxtLink
    v-bind="props"
    class="flex items-center p-3 w-min rounded-full hover:bg-gray-300 font-normal dark:hover:bg-dim-200 dark:text-white"
    exact-active-class="font-semibold"
  >
    <div
      class="w-5 h-5 text-dark"
      :class="defaultTransition"
    >
      <slot name="icon" />
    </div>
    <div
      v-if="$slots.default"
      class="ml-4 text-md hidden xl:block"
    >
      <slot />
    </div>
  </NuxtLink>
</template>
