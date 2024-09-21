<script setup lang="ts">
const user = useAuthUser()
const { $fetchWithToken } = useAuth()

// TODO: fix ssr fetch
const { data: posts, refresh } = await useFetch('/api/posts', {
  $fetch: $fetchWithToken,
  server: false,
})

const { borderColor } = useTailwindConfig()
</script>

<template>
  <div>
    <MainSection title="Home">
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
