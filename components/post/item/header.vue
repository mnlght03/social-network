<script setup lang="ts">
import IconDot from '~/assets/icons/dot.svg'

const props = defineProps<{
  author: {
    username: string
    profileImageUrl?: string | null
  }
  createdAt: string
}>()

const postedAt = useState(() => humanizePostDate(props.createdAt))
</script>

<template>
  <div class="flex p-4 pb-0 gap-3">
    <div class="w-10 h-10 rounded-full overflow-hidden">
      <img
        :src="author.profileImageUrl || getRandomImageUrl()"
        alt=""
        class="object-cover"
      >
    </div>
    <div class="flex items-baseline gap-2">
      <span class="font-medium text-gray-800 dark:text-white">
        {{ author.username }}
      </span>
      <span class="text-sm font-medium text-gray-400 ">
        <NuxtLink
          to="#"
          @click.stop
        >
          {{ `@${author.username}` }}
        </NuxtLink>
        <IconDot class="inline" />
        <span>

          {{ postedAt }}
        </span>
      </span>
    </div>
  </div>
</template>
