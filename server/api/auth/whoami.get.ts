import { db } from '~/db'

export default defineEventHandler(async (event) => {
  const userId = getEventUserIdOrThrow(event)
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
