<script setup lang="ts">
const route = useRoute()
const postId = computed(() => route.params.id as string)

const { $fetchWithToken } = useAuth()

const { data: post, error, status } = await useFetch(() => `/api/posts/post/${postId.value}`, {
  $fetch: $fetchWithToken,
})

const loading = computed(() => status.value === 'pending')

watchFetchError(error)

const { borderColor } = useTailwindConfig()
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
        class="border-b"
        :class="borderColor"
      />
    </MainSection>
  </div>
</template>
