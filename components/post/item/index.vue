<script setup lang="ts">
import type { UserPost } from '~/types'

defineProps<{
  post: UserPost
}>()
</script>

<template>
  <div>
    <PostItemHeader
      :author="post.author"
      :created-at="post.createdAt"
    />
    <div>
      <p class="flex-shrink font-medium text-gray-800 dark:text-white">
        {{ post.text }}
      </p>
      <div
        v-if="post.imageUrl"
        class="border-2 rounded-2xl"
      >
        <img
          :src="post.imageUrl"
          alt=""
          class="object-co"
        >
      </div>
    </div>
  </div>
</template>

<style module lang="scss"></style>
