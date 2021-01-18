export const getAge = date => {
  let formattedDate = new Date(date)
  let diff_ms = Date.now() - formattedDate.getTime()
  let age_dt = new Date(diff_ms)
  return Math.abs(age_dt.getUTCFullYear() - 1970)
}
