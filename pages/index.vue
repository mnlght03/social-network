<script setup lang="ts">
const user = useAuthUser()
const { $fetchWithToken } = useAuth()

const { data: posts, refresh, error, status } = await useFetch('/api/posts', {
  $fetch: $fetchWithToken,
})

const loading = computed(() => status.value === 'pending')

watchFetchError(error)

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div>
    <MainSection
      title="Home"
      :loading="loading"
    >
      <template #persistent>
        <PostForm
          v-if="user"
          :user="user"
          class="border-b"
          :class="borderColor"
          @post-create="refresh"
        />
      </template>
      <PostFeed
        v-if="posts"
        :posts="posts"
      />
    </MainSection>
  </div>
</template>
