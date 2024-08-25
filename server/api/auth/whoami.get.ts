import { db } from '~/db'
import { getUserIdFromEventOrThrow } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const userId = getUserIdFromEventOrThrow(event)
  const user = await db.user.findUniqueOrThrow({
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
