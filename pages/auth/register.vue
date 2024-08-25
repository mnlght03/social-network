<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const username = ref('')
const password = ref('')

async function handleClick() {
  const res = await $fetch('/api/auth/refresh')
}
</script>

<template>
  <div class="pt-5 space-y-6">
    <UiInput v-model="username" label="Username" placeholder="@username" required />
    <UiInput v-model="password" label="Password" placeholder="******" type="password" required />
    <button @click="handleClick()">
      Register
    </button>
  </div>
</template>

<style module lang="scss"></style>
