import type { FetchError } from 'ofetch'

/**
 * Watches for reactive FetchError object and throws it if present
 *
 * NOTE: only to be called inside <script setup>
 */
export function watchFetchError(
  error: MaybeRefOrGetter<FetchError | null | undefined>,
  fatal = true,
) {
  return watchEffect(() => {
    const errorValue = toValue(error)
    if (errorValue) {
      throw createError({ ...errorValue, fatal })
    }
  })
}
