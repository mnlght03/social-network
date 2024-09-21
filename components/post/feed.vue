<script setup lang="ts">
import type { UserPost } from '~/types'

defineProps<{
  posts: UserPost[]
}>()

const { borderColor, defaultTransition } = useTailwindConfig()
</script>

<template>
  <div>
    <ul v-if="posts.length">
      <li
        v-for="post in posts"
        :key="post.id"
        class="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
        :class="[borderColor, defaultTransition]"
      >
        <PostItem
          :post="post"
        />
      </li>
    </ul>
    <div v-else>
      <p class="text-center text-gray-500">
        No posts :(
      </p>
    </div>
  </div>
</template>

<style module lang="scss"></style>
