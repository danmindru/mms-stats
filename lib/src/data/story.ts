/**
 * How the show works, in three frames. Written in the show's own voice:
 * plain, warm, a little playful. Facts come from morningmakershow.com and
 * the sponsor page.
 */

export interface Frame {
  id: 'live' | 'tryout' | 'travel'
  index: string
  kicker: string
  title: string
  body: string
  image: string
  alt: string
}

export const FRAMES: Frame[] = [
  {
    id: 'live',
    index: '01',
    kicker: 'why we do this',
    title: 'Good Morning',
    body: 'Our mission is to get people to ship and earn their first internet dollar. Your product will be part of this journey and hopefully, change some people’s lives.',
    image: '/story/live.webp',
    alt: 'Dan and Sandra at a desk with a microphone, going live in the morning.',
  },
  {
    id: 'tryout',
    index: '02',
    kicker: 'how we do this',
    title: 'We use it',
    body: 'We use your product on air, in front of the people we are helping to ship, and in the things we build ourselves. If it is good we say so. If something breaks, that is in the show too. People trust that, which is the whole point.',
    image: '/story/tryout.webp',
    alt: 'Dan typing while Sandra points at the screen, using a product on air.',
  },
  {
    id: 'travel',
    index: '03',
    kicker: 'the impact',
    title: 'Then it travels.',
    body: 'Your product is woven into our long-form videos, then becomes shorts and posts shared across YouTube, X and LinkedIn over the weeks, reaching millions. People subconsciously think about your product. That is why sponsors stay for months, not one-offs.',
    image: '/story/travel.webp',
    alt: 'The show at the centre with lines reaching out to a community of builders.',
  },
]

/** Who is on the other side. */
export const AUDIENCE = {
  title: 'Who is watching',
  body: 'Makers, solo founders and small teams who ship. The people who pick their own tools and tell each other what works.',
}

/** Where we spread the word. */
export const OUTLETS: { label: string; icon: 'youtube' | 'x' | 'linkedin' | 'spotify' | 'apple' | 'mail' | 'hunted' }[] = [
  { label: 'YouTube', icon: 'youtube' },
  { label: 'X', icon: 'x' },
  { label: 'LinkedIn', icon: 'linkedin' },
  { label: 'Spotify', icon: 'spotify' },
  { label: 'Apple Podcasts', icon: 'apple' },
  { label: 'Newsletter', icon: 'mail' },
  { label: 'Hunted.Space', icon: 'hunted' },
]
