<script setup lang="ts">
import { FetchError } from 'ofetch'
import type { LoginRequest } from '~/server/types'

const auth = useAuth()

const data = reactive<LoginRequest>({
  username: '',
  password: '',
})

const error = ref<FetchError>()

async function submit() {
  try {
    await auth.login(data)
    await navigateTo('/')
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
      v-model.trim="data.username"
      label="Username"
      placeholder="@username"
      :errors="error?.data?.fieldErrors?.username"
      required
    />
    <UiInput
      v-model.trim="data.password"
      label="Password"
      placeholder="******"
      type="password"
      :errors="error?.data?.fieldErrors?.password"
      required
    />
    <template #bottom>
      <UiButton type="submit">
        Login
      </UiButton>
      <div class="text-sm text-gray-700">
        Do not have account?
        <NuxtLink
          to="/auth/register"
          class="font-medium underline underline-offset-2"
        >
          Register
        </NuxtLink>
      </div>
    </template>
  </UiForm>
</template>
