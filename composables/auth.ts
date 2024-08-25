import type { LoginRequest, RegisterRequest } from '~/server/types'
import type { User } from '~/types'

export const useAuthToken = () => useState<string | undefined>(() => undefined)
export const useAuthUser = () => useState<User | undefined>(() => undefined)

export function useAuth() {
  const refreshTokens = async () => {
    try {
      const { accessToken } = await $fetch('/api/auth/refresh', { method: 'post' })
      useAuthToken().value = accessToken
    }
    catch {
      useAuthToken().value = undefined
    }
  }

  // Send authorization token on each request,
  // on 401 error refresh tokens and try reqeust again
  const $fetchWithToken = $fetch.create({
    onRequest({ options }) {
      const token = useAuthToken().value
      if (token) {
        options.headers ??= {}
        const headers = options.headers as Record<string, string>
        headers.authorization = `Bearer ${token}`
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
    const user = await $fetchWithToken('/api/auth/whoami')
    useAuthUser().value = user
  }

  const login = async (data: LoginRequest) => {
    const { accessToken } = await $fetch('/api/auth/login', {
      method: 'post',
      body: data,
    })
    useAuthToken().value = accessToken
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

  return { login, register, refreshTokens, init, fetchCurrentUser, $fetchWithToken }
}
