<script setup lang="ts">
import type { UserPost } from '~/types'

defineProps<{
  post: UserPost
}>()

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div>
    <PostItemHeader
      :author="post.author"
      :created-at="post.createdAt"
    />
    <div class="ml-14 p-4 pt-0">
      <p class="flex-shrink font-medium text-gray-800 dark:text-white">
        {{ post.text }}
      </p>
      <div
        v-if="post.imageUrl"
        :class="borderColor"
        class="border-2 mt-4 rounded-2xl overflow-hidden"
      >
        <img
          :src="post.imageUrl"
          alt=""
          class="object-cover"
        >
      </div>
    </div>
  </div>
</template>

<style module lang="scss"></style>
