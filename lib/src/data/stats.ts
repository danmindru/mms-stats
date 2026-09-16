/**
 * Source of truth for the viz. Every number here is read from the native
 * analytics exports in /stats (X Analytics, YouTube Studio, LinkedIn Content
 * analytics). Reporting window: Sep 16 2025 -> Sep 15 2026 (365 days), except
 * LinkedIn which only exposes a 400 day window (Aug 13 2025 -> Sep 16 2026).
 *
 * Monthly values are read off the bar/line charts in the screenshots and then
 * normalised so they sum exactly to the reported yearly totals. Headline
 * totals are copied verbatim.
 */

export type PlatformId = 'x' | 'youtube' | 'linkedin'
export type PersonId = 'dan' | 'sandra'
export type AccountId = 'dan-x' | 'sandra-x' | 'mms-youtube' | 'sandra-linkedin'

export const MONTHS = [
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
] as const

export const MONTH_LABELS = MONTHS.map((m, i) =>
  i === 0 ? `${m} '25` : i === MONTHS.length - 1 ? `${m} '26` : m,
)

export const WINDOW = {
  start: 'Sep 16, 2025',
  end: 'Sep 15, 2026',
  days: 365,
}

export interface Person {
  id: PersonId
  name: string
  fullName: string
  avatar: string
  role: string
  accent: string
}

export const PEOPLE: Record<PersonId, Person> = {
  dan: {
    id: 'dan',
    name: 'Dan',
    fullName: 'Dan',
    avatar: '/avatars/dan.png',
    role: 'Builder · Host',
    accent: '#1863dc',
  },
  sandra: {
    id: 'sandra',
    name: 'Sandra',
    fullName: 'Sandra',
    avatar: '/avatars/sandra.png',
    role: 'Creator · Host',
    accent: '#ff7759',
  },
}

export interface Platform {
  id: PlatformId
  name: string
  metricLabel: string
  brand: string
  onLight: string
}

export const PLATFORMS: Record<PlatformId, Platform> = {
  x: {
    id: 'x',
    name: 'X',
    metricLabel: 'impressions',
    brand: '#17171c',
    onLight: '#17171c',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    metricLabel: 'views',
    brand: '#ff0000',
    onLight: '#e11d1d',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    metricLabel: 'impressions',
    brand: '#0a66c2',
    onLight: '#0a66c2',
  },
}

export interface Metric {
  label: string
  value: number
  format?: 'compact' | 'percent' | 'currency' | 'hours'
  hint?: string
  delta?: number
}

export interface Account {
  id: AccountId
  handle: string
  url: string
  platform: PlatformId
  people: PersonId[]
  /** Reported impressions/views over the window. */
  total: number
  /** Monthly impressions, Sep '25 -> Sep '26 (13 buckets, both Septembers partial). */
  monthly: number[]
  windowNote?: string
  followers?: { label: string; value: number }
  metrics: Metric[]
  peak: { month: string; value: number; note: string }
}

const scaleTo = (values: number[], total: number) => {
  const sum = values.reduce((a, b) => a + b, 0)
  return values.map((v) => Math.round((v / sum) * total))
}

export const ACCOUNTS: Record<AccountId, Account> = {
  'dan-x': {
    id: 'dan-x',
    handle: '@d4m1n',
    url: 'https://x.com/d4m1n',
    platform: 'x',
    people: ['dan'],
    total: 20_500_000,
    monthly: scaleTo(
      [0.2, 1.0, 1.0, 0.9, 4.8, 2.3, 1.9, 3.6, 0.8, 1.2, 1.1, 1.4, 0.3],
      20_500_000,
    ),
    followers: { label: 'Followers', value: 32_200 },
    metrics: [
      { label: 'Impressions', value: 20_500_000 },
      { label: 'Engagements', value: 272_400 },
      { label: 'Engagement rate', value: 1.3, format: 'percent' },
      { label: 'Likes', value: 142_900 },
      { label: 'Bookmarks', value: 58_900 },
      { label: 'Profile visits', value: 37_400 },
      { label: 'Replies', value: 20_200 },
      { label: 'Reposts', value: 6_300 },
      { label: 'Shares', value: 6_400 },
      { label: 'Active followers', value: 22_200, hint: 'of 32.2K' },
    ],
    peak: {
      month: 'Jan 2026',
      value: 4_800_000,
      note: 'Shipping in public. 4.8M impressions in a single month.',
    },
  },
  'sandra-x': {
    id: 'sandra-x',
    handle: '@TakoTreba',
    url: 'https://x.com/TakoTreba',
    platform: 'x',
    people: ['sandra'],
    total: 43_500_000,
    monthly: scaleTo(
      [0.1, 37.2, 1.0, 0.2, 0.2, 1.7, 0.2, 0.2, 1.8, 0.2, 0.2, 0.3, 0.2],
      43_500_000,
    ),
    followers: { label: 'Followers', value: 22_800 },
    metrics: [
      { label: 'Impressions', value: 43_500_000 },
      { label: 'Engagements', value: 249_300 },
      { label: 'Engagement rate', value: 0.5, format: 'percent' },
      { label: 'Likes', value: 131_400 },
      { label: 'Profile visits', value: 69_600 },
      { label: 'Bookmarks', value: 20_200 },
      { label: 'Replies', value: 12_600 },
      { label: 'Reposts', value: 10_800 },
      { label: 'Shares', value: 4_400 },
      { label: 'Active followers', value: 15_900, hint: 'of 22.8K' },
    ],
    peak: {
      month: 'Oct 2025',
      value: 37_200_000,
      note: 'One month. Thirty-seven million impressions. No ad spend.',
    },
  },
  'mms-youtube': {
    id: 'mms-youtube',
    handle: 'Morning Maker Show',
    url: 'https://www.youtube.com/@MorningMakerShow',
    platform: 'youtube',
    people: ['dan', 'sandra'],
    total: 221_414,
    monthly: scaleTo(
      [7, 8, 45, 22, 14, 40, 22, 12, 10, 9, 16, 9, 7.4],
      221_414,
    ),
    followers: { label: 'Subscribers', value: 11_065 },
    metrics: [
      { label: 'Views', value: 221_414 },
      { label: 'Watch time', value: 10_200, format: 'hours', delta: 23 },
      { label: 'New subscribers', value: 5_600, delta: 15 },
      { label: 'Est. revenue', value: 921.62, format: 'currency' },
      { label: 'All-time views', value: 411_513 },
      { label: 'All-time watch time', value: 20_200, format: 'hours' },
    ],
    peak: {
      month: 'Nov 2025',
      value: 45_000,
      note: 'A single episode pushed the channel to 12K views a day.',
    },
  },
  'sandra-linkedin': {
    id: 'sandra-linkedin',
    handle: 'Sandra on LinkedIn',
    url: 'https://www.linkedin.com/',
    platform: 'linkedin',
    people: ['sandra'],
    total: 2_517_928,
    monthly: scaleTo(
      [0.35, 0.35, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.15, 0.1, 0.1, 0.07],
      2_517_928,
    ),
    windowNote:
      'Aug 13, 2025 → Sep 16, 2026 (LinkedIn reports a 400-day window)',
    metrics: [
      { label: 'Impressions', value: 2_517_928, delta: 58 },
      { label: 'Social engagements', value: 34_336 },
      { label: 'Reactions', value: 21_774 },
      { label: 'Comments', value: 5_935 },
      { label: 'Saves', value: 5_751 },
      { label: 'Link engagements', value: 1_393 },
      { label: 'Sends', value: 840 },
    ],
    peak: {
      month: 'Oct 2025',
      value: 184_000,
      note: '"Elon Musk just quoted me." 184K impressions from one post.',
    },
  },
}

export const ACCOUNT_LIST = Object.values(ACCOUNTS)

export const metric = (account: AccountId, label: string) =>
  ACCOUNTS[account].metrics.find((m) => m.label === label)?.value ?? 0

/* ------------------------------------------------------------------------ */
/* Derived aggregates                                                       */
/* ------------------------------------------------------------------------ */

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

export const addSeries = (series: number[][]) =>
  MONTHS.map((_, i) => sum(series.map((s) => s[i] ?? 0)))

export const cumulative = (series: number[]) => {
  let acc = 0
  return series.map((v) => (acc += v))
}

export const TOTAL_IMPRESSIONS = sum(ACCOUNT_LIST.map((a) => a.total))

export const PLATFORM_TOTALS: Record<PlatformId, number> = {
  x: ACCOUNTS['dan-x'].total + ACCOUNTS['sandra-x'].total,
  youtube: ACCOUNTS['mms-youtube'].total,
  linkedin: ACCOUNTS['sandra-linkedin'].total,
}

export const PLATFORM_MONTHLY: Record<PlatformId, number[]> = {
  x: addSeries([ACCOUNTS['dan-x'].monthly, ACCOUNTS['sandra-x'].monthly]),
  youtube: ACCOUNTS['mms-youtube'].monthly,
  linkedin: ACCOUNTS['sandra-linkedin'].monthly,
}

/** YouTube is a shared channel; each host is credited half. */
export const PERSON_MONTHLY: Record<PersonId, number[]> = {
  dan: addSeries([
    ACCOUNTS['dan-x'].monthly,
    ACCOUNTS['mms-youtube'].monthly.map((v) => v / 2),
  ]),
  sandra: addSeries([
    ACCOUNTS['sandra-x'].monthly,
    ACCOUNTS['sandra-linkedin'].monthly,
    ACCOUNTS['mms-youtube'].monthly.map((v) => v / 2),
  ]),
}

export const PERSON_TOTALS: Record<PersonId, number> = {
  dan: sum(PERSON_MONTHLY.dan),
  sandra: sum(PERSON_MONTHLY.sandra),
}

export const COMBINED_MONTHLY = addSeries(ACCOUNT_LIST.map((a) => a.monthly))
export const COMBINED_CUMULATIVE = cumulative(COMBINED_MONTHLY)

export const TOTAL_ENGAGEMENTS =
  272_400 + // Dan X
  249_300 + // Sandra X
  34_336 + // Sandra LinkedIn
  1_393 // LinkedIn link engagements

export const TOTAL_AUDIENCE = 32_200 + 22_800 + 11_065

export const TOTAL_WATCH_HOURS = 10_200

export const PEAK_MONTH_INDEX = COMBINED_MONTHLY.indexOf(
  Math.max(...COMBINED_MONTHLY),
)

/** Average impressions per day over the window. */
export const PER_DAY = Math.round(TOTAL_IMPRESSIONS / WINDOW.days)
export const PER_HOUR = Math.round(PER_DAY / 24)
export const PER_MINUTE = Math.round(PER_HOUR / 60)

/** Headline story beats shown in the "moments" list. */
export interface Moment {
  when: string
  monthIndex: number
  account: AccountId
  title: string
  value: number
  detail: string
}

export const MOMENTS: Moment[] = [
  {
    when: 'Oct 2025',
    monthIndex: 1,
    account: 'sandra-x',
    title: 'The 37M month',
    value: 37_200_000,
    detail:
      'Sandra’s X account did more impressions in October than most brands do in a decade. Organic. Zero spend.',
  },
  {
    when: 'Oct 2025',
    monthIndex: 1,
    account: 'sandra-linkedin',
    title: 'Quoted by Elon',
    value: 184_000,
    detail:
      '“Elon Musk just quoted me. Didn’t happen overnight. I post daily.” 184K impressions, 806 engagements from one post.',
  },
  {
    when: 'Nov 2025',
    monthIndex: 2,
    account: 'mms-youtube',
    title: 'The 12K-a-day episode',
    value: 45_000,
    detail:
      'One Morning Maker Show episode broke out of the feed and pulled 12,000 views a day at peak.',
  },
  {
    when: 'Jan 2026',
    monthIndex: 4,
    account: 'dan-x',
    title: 'Dan’s 4.8M January',
    value: 4_800_000,
    detail:
      'Build-in-public threads, shipped tools, and demos. Dan’s best month on X by a wide margin.',
  },
  {
    when: 'Feb 2026',
    monthIndex: 5,
    account: 'mms-youtube',
    title: 'The second wave',
    value: 40_000,
    detail:
      'A sustained plateau rather than a spike: a month of steady 1–5K daily views across the back catalogue.',
  },
  {
    when: 'Apr 2026',
    monthIndex: 7,
    account: 'dan-x',
    title: 'Dan’s 3.6M April',
    value: 3_600_000,
    detail:
      'Second-biggest month of the year: consistency compounding, not a one-off viral moment.',
  },
]
