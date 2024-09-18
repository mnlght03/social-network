import { db } from '~/db'

export default defineEventHandler(async (event) => {
  await getEventUserIdOrThrow(event)

  const posts = await db.userPost.findMany({
    where: {
      deleted: false,
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
        },
      },
      imageUrl: true,
    },
    orderBy: {
      id: 'desc',
    },
  })

  return posts
})
