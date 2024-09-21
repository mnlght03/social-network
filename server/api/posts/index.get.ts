// import { z } from 'zod'
import { db } from '~/db'
import type { UserPost } from '~/types'

// const querySchema = createValidationSchema(z.object({
//   author: z.string().min(1),
// }))

export default defineEventHandler(async (event) => {
  const userId = await getEventUserIdOrThrow(event)

  const posts: UserPost[] = await db.userPost.findMany({
    where: {
      deleted: false,
      authorId: userId,
      // TODO: add replies in select query
      // replyToId: null,
    },
    select: {
      id: true,
      text: true,
      author: {
        select: {
          id: true,
          username: true,
          profileImage: true,
        },
      },
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts
})
