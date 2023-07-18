export enum Time {
  Milliseconds = 1,
  Seconds = 1000,
  Minutes = 60 * 1000,
  Hours = 60 * 60 * 1000,
  Days = 24 * 60 * 60 * 1000,
  Months = 30 * 24 * 60 * 60 * 1000,
  Years = 12 * 30 * 24 * 60 * 60 * 1000,
}

export enum Interval {
  Bidaily = Time.Days * 0.5,
  Daily = Time.Days * 1,
  Weekly = Time.Days * 7,
  Biweekly = Time.Days * 14,
  Monthly = Time.Months * 1,
}
