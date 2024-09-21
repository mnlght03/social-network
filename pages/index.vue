<script setup lang="ts">
const user = useAuthUser()
const { $fetchWithToken } = useAuth()

// TODO: fix ssr fetch
const { data: posts, refresh, error, status } = await useFetch('/api/posts', {
  $fetch: $fetchWithToken,
  server: false,
})

const loading = computed(() => status.value === 'pending')

watchFetchError(error)

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div>
    <MainSection
      :loading="loading"
    >
      <template #title>
        qweqeq
      </template>
      <PostForm
        v-if="user"
        :user="user"
        class="border-b"
        :class="borderColor"
        @post-create="refresh"
      />
      <PostFeed
        v-if="posts"
        :posts="posts"
      />
    </MainSection>
  </div>
</template>

<style module lang="scss"></style>
