import bcrypt from 'bcrypt'
import { z } from 'zod'
import { db } from '~/db'
import { generateJwtPair } from '~/server/utils/jwt'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const { username, password } = schema.parse(await readBody(event))

  const user = await db.user.findUnique({
    where: { username },
  })

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw createError({
      statusCode: 401,
    })
  }

  const { accessToken, refreshToken } = generateJwtPair(user.id)

  await db.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  })

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: true,
  })

  return {
    accessToken,
  }
})
