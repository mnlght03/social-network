<script setup lang="ts">
const route = useRoute()
const postId = computed(() => route.params.id as string)

const { $fetchWithToken } = useAuth()

const { data: post, error, status } = await useFetch(() => `/api/posts/post/${postId.value}`, {
  $fetch: $fetchWithToken,
})

const loading = computed(() => status.value === 'pending')

watchEffect(() => {
  if (error.value) {
    throw createError(error.value)
  }
})
</script>

<template>
  <div>
    <MainSection
      title="Post"
      :loading="loading"
    >
      <PostItem
        v-if="post"
        :post="post"
      />
    </MainSection>
  </div>
</template>

<style module lang="scss"></style>
