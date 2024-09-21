<script setup lang="ts">
import type { LoginRequest } from '~/server/types'

definePageMeta({
  layout: 'auth',
})

const auth = useAuth()

const data = reactive<LoginRequest>({
  username: '',
  password: '',
})

async function submit() {
  try {
    await auth.login(data)
    await navigateTo('/')
  }
  catch (e) {
    // TODO: add error handling
    console.error(e)
  }
}
</script>

<template>
  <form
    class="pt-5 space-y-6"
    @submit.prevent="submit"
  >
    <UiInput
      v-model.trim="data.username"
      label="Username"
      placeholder="@username"
      required
    />
    <UiInput
      v-model.trim="data.password"
      label="Password"
      placeholder="******"
      type="password"
      required
    />
    <button>
      Login
    </button>
  </form>
</template>
