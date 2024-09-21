import type { FetchError } from 'ofetch'

/** Watches for reactive FetchError object and throws it if present. */
export function watchFetchError(
  error: MaybeRefOrGetter<FetchError | null | undefined>,
) {
  return watchEffect(() => {
    const errorValue = toValue(error)
    if (errorValue) {
      throw createError({ ...errorValue, fatal: true })
    }
  })
}
