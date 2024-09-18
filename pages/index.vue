<script setup lang="ts">
const user = useAuthUser()
</script>

<template>
  <div>
    <MainSection title="Home">
      <PostForm
        v-if="user"
        :user="user"
      />
    </MainSection>
  </div>
</template>

<style module lang="scss"></style>
