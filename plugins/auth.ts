export default defineNuxtPlugin(async () => {
  const auth = useAuth()
  await auth.init()
  const router = useRouter()
  const authToken = useAuthToken()
  // Navigate to login page if user is unauthorized
  router.beforeEach(async (to) => {
    if (authToken.value || to.path.startsWith('/auth')) {
      return true
    }
    try {
      await auth.refreshTokens()
      await auth.fetchCurrentUser()
      return true
    }
    catch {
      return '/auth/login'
    }
  })
})
