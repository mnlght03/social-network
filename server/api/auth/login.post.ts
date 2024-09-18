import bcrypt from 'bcrypt'
import { z } from 'zod'
import { db } from '~/db'
import { setRefreshCookie } from '~/server/utils/auth'
import { generateJwtPair } from '~/server/utils/jwt'

const schema = createBodyValidationSchema(z.object({
  username: z.string(),
  password: z.string(),
}))

export type LoginRequest = z.infer<typeof schema>

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, schema.parse)

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

  setRefreshCookie(event, refreshToken)

  return {
    accessToken,
  }
})
