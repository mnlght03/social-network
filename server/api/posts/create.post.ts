import formidable from 'formidable'
import { z } from 'zod'

import { db } from '~/db'

const bodySchema = createBodyValidationSchema(z.object({
  text: z.string().array()
    .transform(data => data[0]),
  replyToId: z.string().array()
    .transform(data => data[0])
    .optional(),
}))

const fileSchema = createBodyValidationSchema(z.object({
  image: z.object({
    filepath: z.string(),
  }).array()
    .transform(data => data[0])
    .optional(),
}))

export default defineEventHandler(async (event) => {
  const userId = await getEventUserIdOrThrow(event)

  const form = formidable()
  const [fields, files] = await form.parse(event.node.req)
  const { text, replyToId } = bodySchema.parse(fields)
  const { image } = fileSchema.parse(files)
  const imageUrl = await (async () => {
    if (!image) {
      return
    }
    const { secure_url } = await uploadMediaFile(image.filepath)
    return secure_url
  })()

  const post = await db.userPost.create({
    data: {
      authorId: userId,
      text,
      replyToId,
      imageUrl,
    },
    select: {
      id: true,
      text: true,
      replyToId: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  })

  return post
})
