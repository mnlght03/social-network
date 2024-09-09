import type { ZodError, ZodTypeAny } from 'zod'
// import type { H3Event } from 'h3'

// async function parseEventBody(event: H3Event, schema: ZodTypeAny) {
//   try {
//     return schema.parse(await readBody(event))
//   }
//   catch (e) {
//     if (e instanceof ZodError) {
//       throw createError({
//         statusCode: 400,
//         statusMessage: 'Bad Request',
//         data: e.flatten().fieldErrors,
//       })
//     }
//     throw e
//   }
// }

/** Creates zod validation schema with 400 error on failed validation. */
export function createBodySchema<T extends ZodTypeAny>(schema: T) {
  return schema
    .catch(({ error }: { error: ZodError }) => {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: error.flatten().fieldErrors,
      })
    })
}
