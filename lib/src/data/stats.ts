/**
 * Source of truth for the viz. Every number here is read from the native
 * analytics exports in /stats (X Analytics, YouTube Studio, LinkedIn Content
 * analytics). Yearly window: Sep 16 2025 -> Sep 15 2026 (365 days), except
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
  short: 'Sep 2025 – Sep 2026',
  days: 365,
}

export const SHOW = {
  name: 'Morning Maker Show',
  icon: '/avatars/mms.png',
  url: 'https://www.youtube.com/@MorningMakerShow',
  color: '#7e22ce',
}

export interface Person {
  id: PersonId
  name: string
  avatar: string
  role: string
}

export const PEOPLE: Record<PersonId, Person> = {
  dan: {
    id: 'dan',
    name: 'Dan',
    avatar: '/avatars/dan.png',
    role: 'Co-host',
  },
  sandra: {
    id: 'sandra',
    name: 'Sandra',
    avatar: '/avatars/sandra.png',
    role: 'Co-host',
  },
}

export interface Platform {
  id: PlatformId
  name: string
  metricLabel: string
  onLight: string
}

export const PLATFORMS: Record<PlatformId, Platform> = {
  x: { id: 'x', name: 'X', metricLabel: 'impressions', onLight: '#1e1035' },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    metricLabel: 'views',
    onLight: '#e11d1d',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    metricLabel: 'impressions',
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
  label: string
  url: string
  platform: PlatformId
  people: PersonId[]
  /** Reported impressions/views over the yearly window. */
  total: number
  /** Monthly impressions, Sep '25 -> Sep '26 (13 buckets, both Septembers partial). */
  monthly: number[]
  windowNote?: string
  followers?: { label: string; value: number }
  metrics: Metric[]
  peak: { month: string; monthIndex: number; value: number; note: string }
}

const scaleTo = (values: number[], total: number) => {
  const sum = values.reduce((a, b) => a + b, 0)
  return values.map((v) => Math.round((v / sum) * total))
}

export const ACCOUNTS: Record<AccountId, Account> = {
  'dan-x': {
    id: 'dan-x',
    handle: '@d4m1n',
    label: 'Dan on X',
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
      { label: 'Followers', value: 32_200 },
    ],
    peak: {
      month: 'Jan 2026',
      monthIndex: 4,
      value: 4_800_000,
      note: 'Best month on this account: 4.8M impressions.',
    },
  },
  'sandra-x': {
    id: 'sandra-x',
    handle: '@TakoTreba',
    label: 'Sandra on X',
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
      { label: 'Followers', value: 22_800 },
    ],
    peak: {
      month: 'Oct 2025',
      monthIndex: 1,
      value: 37_200_000,
      note: 'Best month on this account: 37.2M impressions.',
    },
  },
  'mms-youtube': {
    id: 'mms-youtube',
    handle: 'Morning Maker Show',
    label: 'Morning Maker Show on YouTube',
    url: SHOW.url,
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
      { label: 'Subscribers', value: 11_065 },
      { label: 'Est. revenue', value: 921.62, format: 'currency' },
      { label: 'All-time views', value: 411_513 },
      { label: 'All-time watch time', value: 20_200, format: 'hours' },
    ],
    peak: {
      month: 'Nov 2025',
      monthIndex: 2,
      value: 45_000,
      note: 'Best month on the channel: about 45K views, peaking at 12K a day.',
    },
  },
  'sandra-linkedin': {
    id: 'sandra-linkedin',
    handle: 'Sandra on LinkedIn',
    label: 'Sandra on LinkedIn',
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
      monthIndex: 1,
      value: 184_000,
      note: 'Best single post: 184K impressions and 806 engagements.',
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

const addSeries = (series: number[][]) =>
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

/** Running total of all four accounts, month by month. */
export const COMBINED_CUMULATIVE = cumulative(
  addSeries(ACCOUNT_LIST.map((a) => a.monthly)),
)

export const TOTAL_ENGAGEMENTS =
  metric('dan-x', 'Engagements') +
  metric('sandra-x', 'Engagements') +
  metric('sandra-linkedin', 'Social engagements') +
  metric('sandra-linkedin', 'Link engagements')

export const TOTAL_AUDIENCE =
  metric('dan-x', 'Followers') +
  metric('sandra-x', 'Followers') +
  metric('mms-youtube', 'Subscribers')

export const TOTAL_WATCH_HOURS = metric('mms-youtube', 'Watch time')

/** Average impressions per day over the yearly window. */
export const PER_DAY = Math.round(TOTAL_IMPRESSIONS / WINDOW.days)

/** Month in which the running total first passed each threshold. */
export const MILESTONES = [10_000_000, 25_000_000, 50_000_000].map((t) => ({
  threshold: t,
  monthIndex: COMBINED_CUMULATIVE.findIndex((v) => v >= t),
}))

/** Notable months, listed plainly. */
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
    title: '37.2M impressions on X in one month',
    value: 37_200_000,
    detail:
      'Sandra’s biggest month on X. Several posts were shared very widely in the same few weeks. None of it was paid.',
  },
  {
    when: 'Oct 2025',
    monthIndex: 1,
    account: 'sandra-linkedin',
    title: 'Top LinkedIn post: 184K impressions',
    value: 184_000,
    detail:
      'One post about being quoted by Elon Musk. 184K impressions and 806 engagements.',
  },
  {
    when: 'Nov 2025',
    monthIndex: 2,
    account: 'mms-youtube',
    title: 'Best month on YouTube: about 45K views',
    value: 45_000,
    detail:
      'One episode reached 12,000 views a day at its peak. Watch time for the year is up 23% on the year before.',
  },
  {
    when: 'Jan 2026',
    monthIndex: 4,
    account: 'dan-x',
    title: '4.8M impressions on X in one month',
    value: 4_800_000,
    detail:
      'Dan’s biggest month on X, from posts about the tools and demos he was building.',
  },
  {
    when: 'Feb 2026',
    monthIndex: 5,
    account: 'mms-youtube',
    title: 'Second-best month on YouTube: about 40K views',
    value: 40_000,
    detail:
      'No single spike this time. Steady daily views across older episodes for the whole month.',
  },
  {
    when: 'Apr 2026',
    monthIndex: 7,
    account: 'dan-x',
    title: '3.6M impressions on X in one month',
    value: 3_600_000,
    detail: 'Dan’s second-biggest month on X.',
  },
]
