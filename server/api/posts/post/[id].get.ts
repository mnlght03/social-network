import { selectUserPostForView } from '..'
import { db } from '~/db'
import type { UserPostView } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const post: UserPostView = await db.userPost.findUniqueOrThrow({
    where: {
      id,
    },
    select: selectUserPostForView,
  })
  return post
})
