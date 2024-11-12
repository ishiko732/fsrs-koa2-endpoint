import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export const CURRENT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

export const convertTimezone = (date: Date, tz: string) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  console.debug(
    CURRENT_TIMEZONE,
    tz,
    dayjs.tz(date, tz).format(),
    dayjs(date).tz(tz).unix()
  )
  return dayjs(date).tz(tz).format()
}
