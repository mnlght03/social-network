import type { H3Event } from 'h3'
import { verifyToken } from './jwt'

export function setRefreshCookie(event: H3Event, token: string) {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true,
  })
}

export function deleteRefreshCookie(event: H3Event) {
  deleteCookie(event, 'refresh_token')
}

export function getRefreshCookie(event: H3Event) {
  return getCookie(event, 'refresh_token')
}

export function getUserIdFromEventOrThrow(event: H3Event) {
  const token = getRequestHeader(event, 'authorization')?.split(' ')[1]
  const payload = token ? verifyToken(token) : undefined
  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized.',
    })
  }
  return payload.userId
}
