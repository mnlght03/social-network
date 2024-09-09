export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return
  }
  const authToken = useAuthToken()
  const auth = useAuth()
  if (authToken.value || to.path.startsWith('/auth')) {
    return true
  }
  try {
    await auth.refreshTokens()
    await auth.fetchCurrentUser()
    return true
  }
  // Navigate to login page if user is unauthorized
  catch (e) {
    console.error(e)
    return '/auth/login'
  }
})
