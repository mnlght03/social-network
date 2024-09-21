// import { z } from 'zod'
import { selectUserPostForView } from '.'
import { db } from '~/db'
import type { UserPostView } from '~/types'

// const querySchema = createValidationSchema(z.object({
//   author: z.string().min(1),
// }))

export default defineEventHandler(async (event) => {
  const userId = await getEventUserIdOrThrow(event)

  const posts: UserPostView[] = await db.userPost.findMany({
    where: {
      deleted: false,
      authorId: userId,
      // TODO: add replies in select query
      // replyToId: null,
    },
    select: selectUserPostForView,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts
})
