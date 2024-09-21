<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'
import type { UserView } from '~/types'

import IconPicture from '~/assets/icons/picture.svg'
import IconGif from '~/assets/icons/gif.svg'
import IconChart from '~/assets/icons/chart.svg'
import IconEmoji from '~/assets/icons/emoji.svg'
import IconCalendar from '~/assets/icons/calendar.svg'

defineProps<{
  user: UserView
}>()

const emit = defineEmits<{
  postCreate: []
}>()

const fileInput = ref<HTMLInputElement>()
const message = ref('')
const imageFile = ref<File>()
const previewImageUrl = ref<string | null>()

const loading = ref(false)
const submitDisabled = computed(() => loading.value || !message.value.length)

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (!file) {
    return
  }

  loading.value = true
  imageFile.value = file

  await new Promise<void>((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      previewImageUrl.value = reader.result?.toString()
      resolve()
    })
    reader.readAsDataURL(file)
  })
}

const { $fetchWithToken } = useAuth()

async function submit() {
  if (submitDisabled.value) {
    return
  }

  const data = new FormData()
  data.append('text', message.value)

  if (imageFile.value) {
    data.append('image', imageFile.value)
  }

  loading.value = true

  await $fetchWithToken('/api/posts/create', {
    method: 'post',
    body: data,
  }).then(() => {
    message.value = ''
    imageFile.value = undefined
    emit('postCreate')
  })
    .finally(() => loading.value = false)
}

const ctrlEnter = useMagicKeys()['Ctrl+Enter']

whenever(ctrlEnter, submit)

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div
    class="flex shrink-0 p-4 pb-0"
  >
    <div class="w-10 h-10 mt-2 rounded-full overflow-hidden">
      <img
        :src="user.profileImage ?? getRandomImageUrl()"
        alt="profile image"
        class="object-cover"
      >
    </div>

    <form
      class="grow"
      @submit.prevent="submit"
    >
      <div class="w-full p-2">
        <textarea
          v-model.trim="message"
          placeholder="What's on your mind?"
          class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
        />
      </div>

      <input
        v-show="false"
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png"
        @change="handleFileChange"
      >
      <div
        v-if="previewImageUrl"
        class="p-2"
      >
        <img
          :src="previewImageUrl"
          alt=""
          class="border rounded-2xl"
          :class="borderColor"
        >
      </div>

      <div class="flex p-2">
        <button
          type="button"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800"
          @click="fileInput?.click()"
        >
          <IconPicture class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800"
        >
          <IconGif class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800"
        >
          <IconChart class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800"
        >
          <IconEmoji class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800"
        >
          <IconCalendar class="h-5 w-5" />
        </button>

        <UiButton
          class="ml-auto"
          size="sm"
          :disabled="submitDisabled"
          type="submit"
        >
          <span class="font-bold">
            Post
          </span>
        </UiButton>
      </div>
    </form>
  </div>
</template>
