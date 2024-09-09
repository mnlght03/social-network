<script setup lang="ts">
import type { User } from '~/types'
import IconPicture from '~/assets/icons/picture.svg'

defineProps<{
  user: User
}>()

const message = ref('')

async function submit() {
  const data = new FormData()
  data.append('text', message.value)

  await $fetch('/api/posts/create', {
    method: 'post',
    body: data,
  })
  message.value = ''
}
</script>

<template>
  <div>
    <div class="flex items-center shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img :src="user.profileImage ?? undefined" alt="profile image" class="w-10 h-10 rounded-full">
      </div>

      <div class="w-full p-2">
        <textarea v-model.trim="message" class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0" />
      </div>

      <div class="flex p-2 pl-14">
        <div class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800">
          <IconPicture class="h-5 w-5" />
        </div>
      </div>

      <div>
        <button class="button" @click="submit()">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss"></style>
