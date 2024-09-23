export default defineNuxtPlugin(async () => {
  const auth = useAuth()
  if (!auth.token.value || !auth.user.value) {
    await auth.init()
  }
})
