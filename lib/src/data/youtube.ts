/**
 * Morning Maker Show on YouTube, in depth.
 *
 * Two windows, both read from YouTube Studio (stats/morning-maker-show-youtube):
 *   total  – channel lifetime, Mar 11 2024 -> Sep 17 2026 (31 monthly buckets)
 *   year   – last 365 days, Sep 17 2025 -> Sep 17 2026 (13 buckets, both
 *            Septembers partial; same buckets as the rest of the page)
 *
 * Headline totals are copied verbatim. Monthly shapes are read off the native
 * daily charts and scaled so each window sums exactly to its reported total.
 * The lifetime series is built as "everything before the yearly window" +
 * "the yearly window", so the two never disagree.
 */
import { ACCOUNTS, cumulative } from '#/data/stats'

export type YoutubeWindow = 'total' | 'year'
export type YoutubeMetric = 'views' | 'hours' | 'subs'

const scaleTo = (values: number[], total: number) => {
  const sum = values.reduce((a, b) => a + b, 0)
  return values.map((v) => Math.round((v / sum) * total))
}

/* Yearly window (13 buckets, Sep '25 -> Sep '26) ------------------------- */

const YEAR_VIEWS = ACCOUNTS['mms-youtube'].monthly // 221,414
const YEAR_HOURS = scaleTo(
  [0.3, 0.5, 3.0, 1.2, 0.9, 1.6, 0.9, 0.5, 0.4, 0.35, 0.5, 0.3, 0.25],
  10_200,
)
const YEAR_SUBS = scaleTo(
  [0.15, 0.25, 1.9, 0.6, 0.4, 0.9, 0.5, 0.3, 0.25, 0.2, 0.3, 0.2, 0.15],
  5_600,
)

/* Before the yearly window (18 buckets, Mar '24 -> Aug '25) --------------- */

const PRIOR_VIEWS = scaleTo(
  [3, 5, 6, 6, 7, 8, 7, 6, 6, 5, 6, 6, 7, 7, 8, 60, 20, 15],
  411_513 - 221_414,
)
const PRIOR_HOURS = scaleTo(
  [2, 3, 4, 4, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 40, 14, 10],
  20_200 - 10_200,
)
const PRIOR_SUBS = scaleTo(
  [0.1, 0.15, 0.2, 0.2, 0.25, 0.3, 0.25, 0.2, 0.2, 0.2, 0.25, 0.25, 0.3, 0.3, 0.3, 1.8, 0.5, 0.4],
  11_100 - 5_600,
)

const PRIOR_LABELS = [
  "Mar '24", 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  "Jan '25", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
]
const YEAR_LABELS = [
  "Sep '25", 'Oct', 'Nov', 'Dec', "Jan '26", 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
]

export interface YoutubeSeries {
  labels: string[]
  monthly: number[]
  running: number[]
  total: number
}

export interface YoutubeWindowData {
  id: YoutubeWindow
  label: string
  range: string
  days: number
  views: YoutubeSeries
  hours: YoutubeSeries
  subs: YoutubeSeries
  revenue: number
  /** Change against the previous window of the same length, where YouTube reports one. */
  delta?: Partial<Record<YoutubeMetric, number>>
}

const series = (labels: string[], monthly: number[], total: number): YoutubeSeries => ({
  labels,
  monthly,
  running: cumulative(monthly),
  total,
})

export const YOUTUBE: Record<YoutubeWindow, YoutubeWindowData> = {
  total: {
    id: 'total',
    label: 'Total',
    range: 'Mar 11, 2024 – Sep 17, 2026',
    days: 921,
    views: series(
      [...PRIOR_LABELS, ...YEAR_LABELS],
      [...PRIOR_VIEWS, ...YEAR_VIEWS],
      411_513,
    ),
    hours: series(
      [...PRIOR_LABELS, ...YEAR_LABELS],
      [...PRIOR_HOURS, ...YEAR_HOURS],
      20_200,
    ),
    subs: series(
      [...PRIOR_LABELS, ...YEAR_LABELS],
      [...PRIOR_SUBS, ...YEAR_SUBS],
      11_100,
    ),
    revenue: 1_274.11,
  },
  year: {
    id: 'year',
    label: 'Past year',
    range: 'Sep 17, 2025 – Sep 17, 2026',
    days: 365,
    views: series(YEAR_LABELS, YEAR_VIEWS, 221_414),
    hours: series(YEAR_LABELS, YEAR_HOURS, 10_200),
    subs: series(YEAR_LABELS, YEAR_SUBS, 5_600),
    revenue: 921.62,
    delta: { hours: 23, subs: 15 },
  },
}

export const YOUTUBE_METRICS: {
  id: YoutubeMetric
  label: string
  unit: string
  format: 'compact' | 'hours'
  note: string
}[] = [
  {
    id: 'views',
    label: 'Views',
    unit: 'views',
    format: 'compact',
    note: 'Every view of every video and live stream.',
  },
  {
    id: 'hours',
    label: 'Watch time',
    unit: 'hours',
    format: 'hours',
    note: 'Hours people spent watching.',
  },
  {
    id: 'subs',
    label: 'Subscribers',
    unit: 'new subscribers',
    format: 'compact',
    note: 'Subscribers gained, net of people leaving.',
  },
]

/** Where the channel stands right now. */
export const YOUTUBE_NOW = {
  subscribers: 11_065,
  since: 'Mar 11, 2024',
}

export interface YoutubeVideo {
  /** YouTube video id, used for the link and the thumbnail. */
  id: string
  title: string
  views: number
  duration: string
}

/** The three most watched videos over the past year, from YouTube Studio on Sep 17, 2026. */
export const YOUTUBE_TOP_VIDEOS: YoutubeVideo[] = [
  {
    id: 'p_q7-iW606U',
    title: 'Vibe coding beautiful UIs in 3 simple steps',
    views: 156_000,
    duration: '8:10',
  },
  {
    id: 'dH4mc9VQ96g',
    title: 'TaskMaster AI and Cursor setup guide for vibe coding entire apps',
    views: 74_000,
    duration: '17:17',
  },
  {
    id: 'FpJ48a5S5lU',
    title: 'Cursor Rules guide for lazy devs',
    views: 38_000,
    duration: '9:27',
  },
]

export const youtubeUrl = (id: string) => `https://youtu.be/${id}`
export const youtubeThumb = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
