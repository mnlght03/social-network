import type { LoginRequest, RegisterRequest } from '~/server/types'
import type { User } from '~/types'

export function useAuth() {
  const token = useState<string | undefined>(() => undefined)
  const user = useState<User | undefined>(() => undefined)

  const refreshTokens = async () => {
    try {
      const { accessToken } = await $fetch('/api/auth/refresh', { method: 'post' })
      token.value = accessToken
    }
    catch {
      token.value = undefined
    }
  }

  // Send authorization token on each request,
  // on 401 error refresh tokens and try reqeust again.
  const $fetchWithToken = $fetch.create({
    onRequest({ options }) {
      if (token.value) {
        options.headers ??= {}
        const headers = options.headers as Record<string, string>
        headers.authorization = `Bearer ${token.value}`
      }
    },
    async onResponseError() {
      await refreshTokens()
    },
    retryStatusCodes: [401],
    // Arbitrary number > 1 is needed to retry on POST, PATCH, PUT and DELETE requests
    retry: 2,
  })

  const fetchCurrentUser = async () => {
    const fetchedUser = await $fetchWithToken('/api/auth/whoami')
    user.value = fetchedUser
  }

  const login = async (data: LoginRequest) => {
    const { accessToken } = await $fetch('/api/auth/login', {
      method: 'post',
      body: data,
    })
    token.value = accessToken
    await fetchCurrentUser()
  }

  const register = async (data: RegisterRequest) => {
    await $fetch('/api/auth/register', {
      method: 'post',
      body: data,
    })
  }

  const init = async () => {
    try {
      await refreshTokens()
      await fetchCurrentUser()
    }
    catch (e) {
      console.error(e)
    }
  }

  return {
    token,
    user,
    login,
    register,
    refreshTokens,
    init,
    fetchCurrentUser,
    $fetchWithToken,
  }
}

export function useAuthToken() {
  const token = useAuth().token
  return computed(() => token.value)
}

export function useAuthUser() {
  const user = useAuth().user
  return computed(() => user.value)
}
