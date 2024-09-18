<script setup lang="ts">
import type { RegisterRequest } from '~/server/types'

definePageMeta({
  layout: 'auth',
})

const auth = useAuth()

const data = reactive<RegisterRequest>({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
})

async function submit() {
  try {
    await auth.register(data)
    await navigateTo('/auth/login')
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
      v-model.trim="data.email"
      label="Email"
      placeholder="your@email"
      type="email"
      required
    />
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
    <UiInput
      v-model.trim="data.repeatPassword"
      label="Repeat Password"
      placeholder="******"
      type="password"
      required
    />
    <button>
      Register
    </button>
  </form>
</template>
