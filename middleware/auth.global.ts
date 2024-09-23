export default defineNuxtRouteMiddleware(async (to) => {
  const authToken = useAuthToken()
  if (authToken.value || to.path.startsWith('/auth')) {
    return true
  }
  const auth = useAuth()
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
