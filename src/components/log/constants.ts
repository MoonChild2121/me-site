import type { LogEntry, LogFilterTag } from './types';

export const LOG_TAGS: readonly LogFilterTag[] = ['all', 'post', 'book', 'drawing'];

export const LOG_ENTRIES: LogEntry[] = [
  {
    id: 1,
    type: 'post',
    tag: 'CSS',
    title: 'Why stacking contexts still trip me up',
    excerpt:
      'Every few months I rediscover that z-index only works inside the same stacking context and promptly forget again. Here\u2019s the mental model that finally stuck.',
    date: 'Apr 2025',
    readTime: '4 min',
  },
  {
    id: 2,
    type: 'book',
    title: 'The Remains of the Day',
    author: 'Kazuo Ishiguro',
    quote:
      'It is perhaps too easy to see in retrospect how much one has been complicit in one\u2019s own diminishment.',
    thought:
      'The whole book is about dignity as a cage. Stevens is so committed to professionalism that he mistakes it for a life. Quietly devastating.',
    date: 'Mar 2025',
  },
  {
    id: 3,
    type: 'drawing',
    title: 'hands study #3',
    date: 'Mar 2025',
    bg: '#D4C5A9',
    sketchLines: [
      { x1: 60, y1: 140, x2: 80, y2: 80 },
      { x1: 80, y1: 80, x2: 85, y2: 50 },
      { x1: 85, y1: 50, x2: 90, y2: 80 },
      { x1: 90, y1: 80, x2: 100, y2: 45 },
      { x1: 100, y1: 45, x2: 108, y2: 78 },
      { x1: 108, y1: 78, x2: 118, y2: 48 },
      { x1: 118, y1: 48, x2: 124, y2: 80 },
      { x1: 124, y1: 80, x2: 135, y2: 60 },
      { x1: 135, y1: 60, x2: 138, y2: 90 },
      { x1: 60, y1: 140, x2: 138, y2: 130 },
      { x1: 138, y1: 130, x2: 138, y2: 90 },
      { x1: 70, y1: 140, x2: 65, y2: 160 },
      { x1: 65, y1: 160, x2: 90, y2: 170 },
      { x1: 90, y1: 170, x2: 138, y2: 155 },
      { x1: 138, y1: 155, x2: 138, y2: 130 },
    ],
  },
  {
    id: 4,
    type: 'post',
    tag: 'Browser',
    title: 'Event delegation is underrated',
    excerpt:
      'Attaching one listener to a parent instead of hundreds to children isn\u2019t just a perf trick \u2014 it fundamentally changes how you think about dynamic DOM.',
    date: 'Feb 2025',
    readTime: '3 min',
  },
  {
    id: 5,
    type: 'book',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    quote: 'The Beauty of the House is immeasurable; its Kindness infinite.',
    thought:
      'A book about a man who has forgotten himself, written in the voice of someone piecing the world together from pure observation. The form IS the story.',
    date: 'Jan 2025',
  },
  {
    id: 6,
    type: 'drawing',
    title: 'coffee shop, Tuesday',
    date: 'Feb 2025',
    bg: '#C9B99A',
    sketchLines: [
      { x1: 70, y1: 160, x2: 130, y2: 160 },
      { x1: 75, y1: 160, x2: 80, y2: 110 },
      { x1: 125, y1: 160, x2: 120, y2: 110 },
      { x1: 80, y1: 110, x2: 120, y2: 110 },
      { x1: 95, y1: 110, x2: 90, y2: 90 },
      { x1: 105, y1: 110, x2: 110, y2: 90 },
      { x1: 90, y1: 90, x2: 110, y2: 90 },
      { x1: 100, y1: 90, x2: 100, y2: 75 },
      { x1: 90, y1: 75, x2: 110, y2: 75 },
      { x1: 120, y1: 130, x2: 135, y2: 135 },
      { x1: 135, y1: 135, x2: 133, y2: 145 },
    ],
  },
  {
    id: 7,
    type: 'post',
    tag: 'Performance',
    title: 'What I learned profiling a real app with Lighthouse',
    excerpt:
      'The score is almost never the point. The waterfall is. Here\u2019s what I found hiding in a client project that looked fine on the surface.',
    date: 'Jan 2025',
    readTime: '6 min',
  },
  {
    id: 8,
    type: 'book',
    title: 'Ways of Seeing',
    author: 'John Berger',
    quote:
      'We never look at just one thing; we are always looking at the relation between things and ourselves.',
    thought:
      'Changed how I look at interfaces. Every design choice is a claim about who is looking and why. Very relevant to building UIs people actually inhabit.',
    date: 'Dec 2024',
  },
  {
    id: 9,
    type: 'drawing',
    title: 'plant on my desk',
    date: 'Jan 2025',
    bg: '#BDB09A',
    sketchLines: [
      { x1: 100, y1: 165, x2: 100, y2: 120 },
      { x1: 100, y1: 140, x2: 75, y2: 110 },
      { x1: 75, y1: 110, x2: 65, y2: 90 },
      { x1: 100, y1: 130, x2: 125, y2: 100 },
      { x1: 125, y1: 100, x2: 135, y2: 80 },
      { x1: 100, y1: 125, x2: 80, y2: 95 },
      { x1: 100, y1: 120, x2: 115, y2: 88 },
      { x1: 85, y1: 160, x2: 115, y2: 160 },
      { x1: 82, y1: 165, x2: 118, y2: 165 },
    ],
  },
];
