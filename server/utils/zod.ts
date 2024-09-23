import type { ZodError, ZodTypeAny } from 'zod'

/** Creates zod validation schema with 400 error on failed validation. */
export function createValidationSchema<T extends ZodTypeAny>(schema: T) {
  return schema
    .catch(({ error }: { error: ZodError }) => {
      throw error.flatten()
    })
}
