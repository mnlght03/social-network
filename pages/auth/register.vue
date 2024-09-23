<script setup lang="ts">
import { FetchError } from 'ofetch'
import type { RegisterRequest } from '~/server/types'

const auth = useAuth()

const data = reactive<RegisterRequest>({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
})

const error = ref<FetchError>()

async function submit() {
  try {
    await auth.register(data)
    await navigateTo('/auth/login')
  }
  catch (e) {
    if (e instanceof FetchError) {
      error.value = e
    }
  }
}
</script>

<template>
  <UiForm
    :errors="error?.data?.formErrors"
    @submit.prevent="submit"
  >
    <UiInput
      v-model.trim="data.email"
      label="Email"
      placeholder="your@email"
      type="email"
      required
      :errors="error?.data?.fieldErrors?.email"
    />
    <UiInput
      v-model.trim="data.username"
      label="Username"
      placeholder="@username"
      required
      :errors="error?.data?.fieldErrors?.username"
    />
    <UiInput
      v-model.trim="data.password"
      label="Password"
      placeholder="******"
      type="password"
      required
      :errors="error?.data?.fieldErrors?.password"
    />
    <UiInput
      v-model.trim="data.repeatPassword"
      label="Repeat Password"
      placeholder="******"
      type="password"
      required
      :errors="error?.data?.fieldErrors?.repeatPassword"
    />
    <template #bottom>
      <UiButton type="submit">
        Register
      </UiButton>
    </template>
  </UiForm>
</template>
