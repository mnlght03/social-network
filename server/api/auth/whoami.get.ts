import { db } from '~/db'
import type { User } from '~/types'

export default defineEventHandler(async (event) => {
  const userId = getEventUserIdOrThrow(event)
  const user: User = await db.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      profileImage: true,
    },
  })
  return user
})
