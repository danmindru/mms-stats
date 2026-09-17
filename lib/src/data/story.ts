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
    kicker: 'Monday and Friday, early',
    title: 'Good morning. We go live.',
    body: 'Dan and Sandra read what makers posted under #buildinpublic since the last show: launches, numbers, struggles, the odd piano in a park. Live on YouTube and X, then out as a podcast.',
    image: '/story/live.webp',
    alt: 'Dan and Sandra at a desk with a microphone, going live in the morning.',
  },
  {
    id: 'tryout',
    index: '02',
    kicker: 'When we share a product',
    title: 'We try it on air.',
    body: 'We open it and use it in front of everyone. If it is good we say so. If something breaks, that is in the show too. People trust that, which is the whole point.',
    image: '/story/tryout.webp',
    alt: 'Dan typing while Sandra points at the screen, trying a product on air.',
  },
  {
    id: 'travel',
    index: '03',
    kicker: 'After the show',
    title: 'Then it travels.',
    body: 'One episode becomes a podcast on Spotify and Apple, a newsletter with a 65% open rate, posts on our X and LinkedIn accounts, and a spot on Hunted.Space. Most sponsors stay for months. We end up using their tools in our own products.',
    image: '/story/travel.webp',
    alt: 'The show at the centre with lines reaching out to a community of builders.',
  },
]

/** Who is on the other side. */
export const AUDIENCE = {
  title: 'Who is watching',
  body: 'Makers, solo founders and small teams who ship. The people who pick their own tools and tell each other what works.',
}

/** Where one episode ends up. */
export const OUTLETS: { label: string; icon: 'youtube' | 'x' | 'linkedin' | 'spotify' | 'apple' | 'mail' | 'hunted' }[] = [
  { label: 'YouTube', icon: 'youtube' },
  { label: 'X', icon: 'x' },
  { label: 'LinkedIn', icon: 'linkedin' },
  { label: 'Spotify', icon: 'spotify' },
  { label: 'Apple Podcasts', icon: 'apple' },
  { label: 'Newsletter', icon: 'mail' },
  { label: 'Hunted.Space', icon: 'hunted' },
]
