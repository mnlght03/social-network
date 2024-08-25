import type { LoginRequest, RegisterRequest } from '~/server/types'
import type { User } from '~/types'

const useAuthToken = () => useState<string | undefined>(() => undefined)
const useAuthUser = () => useState<User | undefined>(() => undefined)

export function useAuth() {
  const $fetchWithToken = $fetch.create({
    onRequest({ options }) {
      const token = useAuthToken().value
      if (token) {
        options.headers ??= {}
        const headers = options.headers as Record<string, string>
        headers.authorization = `Bearer ${token}`
      }
    },
  })

  const login = async (data: LoginRequest) => {
    const { accessToken } = await $fetch('/api/auth/login', {
      method: 'post',
      body: data,
    })
    useAuthToken().value = accessToken
  }

  const register = async (data: RegisterRequest) => {
    const { accessToken } = await $fetch('/api/auth/login', {
      method: 'post',
      body: data,
    })
    useAuthToken().value = accessToken
  }

  const refreshTokens = async () => {
    try {
      const { accessToken } = await $fetch('/api/auth/refresh', { method: 'post' })
      useAuthToken().value = accessToken
    }
    catch {
      useAuthToken().value = undefined
    }
  }

  const fetchCurrentUser = async () => {
    const user = await $fetchWithToken('/api/auth/whoami')
    useAuthUser().value = user
  }

  const init = async () => {
    await refreshTokens()
    await fetchCurrentUser()
  }

  return { login, register, refreshTokens, init, fetchCurrentUser, $fetchWithToken }
}
