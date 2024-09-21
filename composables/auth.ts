import type { LoginRequest, RegisterRequest } from '~/server/types'
import type { User } from '~/types'

export function useAuth() {
  const token = useState<string | undefined>(() => undefined)
  const user = useState<User | undefined>(() => undefined)

  const refreshTokens = async () => {
    const { accessToken } = await $fetch('/api/auth/refresh', {
      method: 'post',
      credentials: 'same-origin',
    })
    token.value = accessToken
  }

  // Send authorization token on each request,
  // on 401 error refresh tokens and try reqeust again.
  const $fetchWithToken = $fetch.create({
    credentials: 'same-origin',
    onRequest({ options }) {
      if (token.value) {
        options.headers ??= {}
        const headers = options.headers as Record<string, string>
        headers.authorization = `Bearer ${token.value}`
      }
    },
    async onResponseError() {
      try {
        await refreshTokens()
      }
      catch (e) {
        console.error(e)
      }
    },
    retryStatusCodes: [401],
    // Arbitrary number > 1 is needed to retry
    // on POST, PATCH, PUT and DELETE requests.
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
      credentials: 'same-origin',
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
