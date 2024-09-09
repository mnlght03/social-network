<script setup lang="ts">
import type { User } from '~/types'
import IconPicture from '~/assets/icons/picture.svg'
import IconGif from '~/assets/icons/gif.svg'
import IconChart from '~/assets/icons/chart.svg'
import IconEmoji from '~/assets/icons/emoji.svg'
import IconCalendar from '~/assets/icons/calendar.svg'

defineProps<{
  user: User
}>()

const fileInput = ref<HTMLInputElement>()
const message = ref('')
const files = ref<File[]>([])
const previewImageUrl = ref<string | null>()

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) {
    return
  }
  files.value.push(file)
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    previewImageUrl.value = reader.result?.toString()
  })
  reader.readAsDataURL(file)
}

const submitting = ref(false)

async function submit() {
  const data = new FormData()
  data.append('text', message.value)
  files.value.forEach((file) => {
    data.append('image', file)
  })
  await $fetch('/api/posts/create', {
    method: 'post',
    body: data,
  })
  message.value = ''
  files.value = []
}

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div v-if="submitting" class="flex items-center justfiy-center py-6">
    <UiSpinner />
  </div>
  <div v-else class="flex items-centershrink-0 p-4 pb-0">
    <div class="flex w-12 items-top">
      <img :src="user.profileImage ?? undefined" alt="profile image" class="w-10 h-10 rounded-full">
    </div>

    <div class="grow">
      <div class="w-full p-2">
        <textarea v-model.trim="message" class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0" />
      </div>

      <input v-show="false" ref="fileInput" type="file" accept="image/jpeg,image/png" @change="handleFileChange">
      <div v-if="previewImageUrl" class="p-2">
        <img :src="previewImageUrl" alt="" class="border rounded-2xl" :class="borderColor">
      </div>

      <div class="flex p-2">
        <button class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800" @click="fileInput?.click()">
          <IconPicture class="h-5 w-5" />
        </button>
        <button class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800">
          <IconGif class="h-5 w-5" />
        </button>
        <button class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800">
          <IconChart class="h-5 w-5" />
        </button>
        <button class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800">
          <IconEmoji class="h-5 w-5" />
        </button>
        <button class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800">
          <IconCalendar class="h-5 w-5" />
        </button>

        <UiButton class="ml-auto" size="sm" @click="submit()">
          <span class="font-bold">
            Submit
          </span>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<style module lang="scss"></style>
