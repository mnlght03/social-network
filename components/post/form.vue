<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  user: User
}>()
</script>

<template>
  <div>
    <PostFormInput :user="user" />
  </div>
</template>

<style module lang="scss"></style>
