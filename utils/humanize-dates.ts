import humanizeDuration from 'humanize-duration'

export function humanizePostDate(createdOrUpdatedAt: string | Date) {
  const duration = +new Date() - +new Date(createdOrUpdatedAt)

  return duration > 1000 * 60
    ? `${humanizeDuration(
          duration,
          {
            units: ['mo', 'd', 'h', 'm'],
            largest: 1,
            round: true,
          },
        )} ago`
    : 'just now'
}
