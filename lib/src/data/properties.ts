/**
 * Everything else the Morning Maker Show runs, and the companies it works with.
 * Figures are copied from the source noted on each entry.
 */

export type PropertyKind = 'site' | 'podcast' | 'newsletter' | 'product' | 'social'

export interface Property {
  id: string
  name: string
  kind: PropertyKind
  url: string
  /** Square icon served from /public. */
  icon: string
  /** One plain sentence. */
  what: string
  /** The one number worth knowing, if there is one. */
  stat?: {
    value: number
    format: 'compact' | 'raw'
    decimals?: number
    suffix?: string
    label: string
    source: string
  }
  /** Extra links, e.g. the two podcast apps. */
  links?: { label: string; url: string; icon: 'spotify' | 'apple' }[]
  /** Wide preview image (og image of the property), optional. */
  preview?: string
  /** Which part of the preview to keep when cropped. */
  previewPosition?: 'left' | 'center' | 'right'
}

export const PROPERTIES: Property[] = [
  {
    id: 'hunted',
    name: 'Hunted.Space',
    kind: 'site',
    url: 'https://hunted.space?ref=morningmaker',
    icon: '/properties/hunted-space.png',
    preview: '/properties/hunted-og.jpg',
    previewPosition: 'right',
    what: 'A launch-day dashboard for Product Hunt. Calendars, upvote speed and rankings from the first hours.',
    stat: {
      value: 3_050_000,
      format: 'compact',
      decimals: 2,
      label: 'Google impressions in 12 months',
      source: 'Google Search Console, 12 months to Sep 2026. 28.2K clicks.',
    },
  },
  {
    id: 'podcast',
    name: 'The podcast',
    kind: 'podcast',
    url: 'https://open.spotify.com/show/22T8p8PskKy0lQtA20yTfm',
    icon: '/avatars/mms.png',
    what: 'Every episode of the show, as audio, on Spotify and Apple Podcasts.',
    links: [
      {
        label: 'Spotify',
        url: 'https://open.spotify.com/show/22T8p8PskKy0lQtA20yTfm',
        icon: 'spotify',
      },
      {
        label: 'Apple Podcasts',
        url: 'https://podcasts.apple.com/us/podcast/morning-maker-show/id1723677441',
        icon: 'apple',
      },
    ],
  },
  {
    id: 'newsletter',
    name: 'The newsletter',
    kind: 'newsletter',
    url: 'https://morningmakershow.com/newsletter',
    icon: '/avatars/mms.png',
    preview: '/properties/newsletter-og.jpg',
    previewPosition: 'right',
    what: 'What we learned from makers that week, products we liked, and the odd discount. Written by Sandra.',
    stat: {
      value: 65,
      format: 'raw',
      suffix: '%',
      label: 'open rate',
      source: 'morningmakershow.com/sponsor',
    },
  },
  {
    id: 'website',
    name: 'morningmakershow.com',
    kind: 'site',
    url: 'https://morningmakershow.com',
    icon: '/properties/mms-512.png',
    preview: '/properties/mms-og.jpg',
    previewPosition: 'right',
    what: 'Every episode with a transcript, the blog, and links to what makers were building.',
    stat: {
      value: 40,
      format: 'raw',
      suffix: '+',
      label: 'domain rating',
      source: 'morningmakershow.com/sponsor',
    },
  },
  {
    id: 'ralphloop',
    name: 'ralphloop.sh',
    kind: 'product',
    url: 'https://ralphloop.sh',
    icon: '/properties/ralphloop.png',
    preview: '/properties/ralphloop-og.png',
    previewPosition: 'center',
    what: 'A long-running AI agent loop that codes for days. One of the tools we build and use on the show.',
  },
  {
    id: 'x',
    name: '@morningmakersho',
    kind: 'social',
    url: 'https://x.com/morningmakersho',
    icon: '/avatars/mms.png',
    what: 'The show’s own account on X. Clips, episode notes and the makers we read on air.',
  },
]

export type SponsorTier = 'headline' | 'partner' | 'sponsor'

export interface Sponsor {
  id: string
  name: string
  url: string
  tier: SponsorTier
  /** Logo for light backgrounds. */
  logo: string
  /** Logo for dark backgrounds, when the company ships one. */
  logoDark?: string
  /** Rendered height of the wordmark in px; logos have different proportions. */
  height: number
  /** The file is a square mark with no wordmark; render the name beside it. */
  iconOnly?: boolean
  what: string
  /** Longer note for featured sponsors. */
  note?: string
  /** Where the sponsor shows up. */
  placements?: string[]
}

const ref = (u: string) => `${u}${u.includes('?') ? '&' : '?'}ref=morningmaker`

/** From morningmakershow.com/sponsor, in the order shown there. */
export const SPONSORS: Sponsor[] = [
  {
    id: 'sentry',
    name: 'Sentry',
    url: ref('https://sentry.io'),
    tier: 'headline',
    logo: '/logos/sentry-light.svg',
    logoDark: '/logos/sentry-dark.svg',
    height: 40,
    what: 'Error and performance monitoring',
    note: 'Sentry has been with the show longest. It is in the episodes, the newsletter and the blog, where Dan writes about fixing bugs with Sentry and Seer. We run it on our own products.',
    placements: ['Show', 'Newsletter', 'Blog', 'Site', 'Our products'],
  },
  {
    id: 'sevalla',
    name: 'Sevalla by Kinsta',
    url: 'https://sevalla.com/?utm_source=morningmakershow&utm_medium=Referral&utm_campaign=website',
    tier: 'partner',
    logo: '/logos/sevalla-light.png',
    logoDark: '/logos/sevalla-dark.png',
    height: 44,
    what: 'App, database and static hosting',
  },
  {
    id: 'coderabbit',
    name: 'CodeRabbit',
    url: ref('https://www.coderabbit.ai/'),
    tier: 'partner',
    logo: '/logos/coderabbit-light.png',
    logoDark: '/logos/coderabbit-dark.png',
    height: 34,
    what: 'AI code review',
  },
  {
    id: 'supadata',
    name: 'Supadata',
    url: ref('https://supadata.ai'),
    tier: 'partner',
    logo: '/logos/supadata-light.png',
    logoDark: '/logos/supadata-dark.png',
    height: 34,
    what: 'Video and web data API',
  },
  {
    id: 'posthog',
    name: 'PostHog',
    url: ref('https://posthog.com'),
    tier: 'sponsor',
    logo: '/logos/posthog-light.png',
    logoDark: '/logos/posthog-dark.png',
    height: 34,
    what: 'Product analytics',
  },
  {
    id: 'lemonsqueezy',
    name: 'Lemon Squeezy',
    url: ref('https://lemonsqueezy.com'),
    tier: 'sponsor',
    logo: '/logos/lemonsqueezy-light.svg',
    logoDark: '/logos/lemonsqueezy-dark.svg',
    height: 30,
    what: 'Payments for software',
  },
  {
    id: 'buildship',
    name: 'BuildShip',
    url: ref('https://buildship.com'),
    tier: 'sponsor',
    logo: '/logos/buildship-light.webp',
    logoDark: '/logos/buildship-dark.webp',
    height: 34,
    what: 'Visual backend builder',
  },
  {
    id: 'emailoctopus',
    name: 'EmailOctopus',
    url: ref('https://emailoctopus.com'),
    tier: 'sponsor',
    logo: '/logos/emailoctopus-light.webp',
    height: 36,
    what: 'Email marketing',
  },
  {
    id: 'tolt',
    name: 'Tolt',
    url: ref('https://tolt.io/'),
    tier: 'sponsor',
    logo: '/logos/tolt-light.webp',
    logoDark: '/logos/tolt-dark.webp',
    height: 30,
    what: 'Affiliate programs for SaaS',
  },
  {
    id: 'pageai',
    name: 'Page AI',
    url: ref('https://pageai.pro'),
    tier: 'sponsor',
    logo: '/logos/pageai-light.webp',
    height: 40,
    iconOnly: true,
    what: 'AI website builder',
  },
  {
    id: 'inlinehelp',
    name: 'Inline Help',
    url: ref('https://inlinehelp.com'),
    tier: 'sponsor',
    logo: '/logos/inlinehelp-light.png',
    logoDark: '/logos/inlinehelp-dark.png',
    height: 38,
    what: 'In-app help',
  },
  {
    id: 'toolfolio',
    name: 'Toolfolio',
    url: ref('https://toolfolio.io'),
    tier: 'sponsor',
    logo: '/logos/toolfolio-light.png',
    logoDark: '/logos/toolfolio-dark.png',
    height: 26,
    what: 'Tools directory',
  },
  {
    id: 'magicspace',
    name: 'MagicSpace SEO',
    url: ref('https://magicspace.agency'),
    tier: 'sponsor',
    logo: '/logos/magicspace-light.png',
    logoDark: '/logos/magicspace-dark.png',
    height: 32,
    what: 'SEO agency',
  },
  {
    id: 'horse',
    name: 'Horse Browser',
    url: ref('https://gethorse.com/'),
    tier: 'sponsor',
    logo: '/logos/horse-light.webp',
    height: 30,
    what: 'A browser for research',
  },
  {
    id: 'shipixen',
    name: 'Shipixen',
    url: ref('https://shipixen.com'),
    tier: 'sponsor',
    logo: '/logos/shipixen-light.webp',
    logoDark: '/logos/shipixen-dark.webp',
    height: 40,
    what: 'Next.js boilerplate generator',
  },
  {
    id: 'uglyduckling',
    name: 'Ugly Duckling',
    url: ref('https://uglyduckling.app/'),
    tier: 'sponsor',
    logo: '/logos/uglyduckling-light.svg',
    height: 30,
    iconOnly: true,
    what: 'Design feedback',
  },
  {
    id: 'microassets',
    name: 'Microassets',
    url: ref('https://microassets.co'),
    tier: 'sponsor',
    logo: '/logos/microassets-light.webp',
    height: 34,
    what: 'Buy and sell small products',
  },
  {
    id: 'pageui',
    name: 'Page UI',
    url: ref('https://pageui.dev'),
    tier: 'sponsor',
    logo: '/logos/pageui-light.webp',
    height: 40,
    iconOnly: true,
    what: 'Landing page components',
  },
  {
    id: 'seostuff',
    name: 'SEO Stuff',
    url: ref('https://www.seo-stuff.com/'),
    tier: 'sponsor',
    logo: '/logos/seostuff-light.webp',
    height: 34,
    what: 'SEO tools',
  },
  {
    id: 'validatemysaas',
    name: 'Validate My SaaS',
    url: ref('https://www.validatemysaas.com/'),
    tier: 'sponsor',
    logo: '/logos/validatemysaas-light.webp',
    logoDark: '/logos/validatemysaas-dark.webp',
    height: 30,
    what: 'Idea validation',
  },
  {
    id: 'adkit',
    name: 'AdKit',
    url: ref('https://adkit.so/'),
    tier: 'sponsor',
    logo: '/logos/adkit-light.svg',
    height: 40,
    iconOnly: true,
    what: 'Ads toolbox',
  },
  {
    id: 'cadscene',
    name: 'CAD Scene',
    url: ref('https://cadscene.com/'),
    tier: 'sponsor',
    logo: '/logos/cadscene-light.png',
    height: 40,
    iconOnly: true,
    what: 'AI architectural rendering',
  },
  {
    id: 'saventify',
    name: 'Saventify',
    url: ref('https://www.saventify.com/'),
    tier: 'sponsor',
    logo: '/logos/saventify-light.webp',
    height: 40,
    iconOnly: true,
    what: 'Wedding invitations',
  },
]

export const SPONSORS_BY_TIER: Record<SponsorTier, Sponsor[]> = {
  headline: SPONSORS.filter((s) => s.tier === 'headline'),
  partner: SPONSORS.filter((s) => s.tier === 'partner'),
  sponsor: SPONSORS.filter((s) => s.tier === 'sponsor'),
}
