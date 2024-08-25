import type { H3Event } from 'h3'
import { db } from '~/db'
import { deleteRefreshCookie, setRefreshCookie } from '~/server/utils/auth'
import { verifyToken } from '~/server/utils/jwt'

function handleError(event: H3Event) {
  deleteRefreshCookie(event)
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized.',
  })
}

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')
  const payload = refreshToken ? verifyToken(refreshToken) : undefined
  if (!payload) {
    return handleError(event)
  }

  const user = await db.user.findUnique({ where: { id: payload.userId } })
  const dbToken = await db.refreshToken.findUnique({ where: { token: refreshToken, userId: payload.userId } })
  if (!user || !dbToken) {
    return handleError(event)
  }

  await db.refreshToken.delete({ where: { token: refreshToken, userId: payload.userId } })
  const newPair = generateJwtPair(payload.userId)
  await db.refreshToken.create({
    data: {
      token: newPair.refreshToken,
      userId: payload.userId,
    },
  })

  setRefreshCookie(event, newPair.refreshToken)

  return {
    accessToken: newPair.accessToken,
  }
})
