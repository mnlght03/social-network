<script setup lang="ts">
import type { UserPostView } from '~/types'

defineProps<{
  posts: UserPostView[]
}>()

const { borderColor, defaultTransition } = useTailwindConfig()

// TODO: add paginated scroll
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
        <NuxtLink :to="`/post/${post.id}`">
          <PostItem
            :post="post"
          />
        </NuxtLink>
      </li>
    </ul>
    <div v-else>
      <p class="text-center text-gray-500">
        No posts :(
      </p>
    </div>
  </div>
</template>
