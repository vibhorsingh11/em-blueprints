export const SITE_TITLE = 'The Mindful EM';
export const SITE_DESCRIPTION =
  'Practical frameworks, systems, and deep dives for transitioning from engineer to engineering manager.';
export const AUTHOR = {
  name: 'Vibhor Singh',
  bio: 'Engineering manager and solution architect. I lead cross-functional teams and write about the move from engineer to manager.',
};
// `slug` must match the folder name under src/content/resources. Remove `comingSoon` once a track has published articles.
export const RESOURCE_TRACKS = [
  {
    slug: 'system-design',
    title: 'System Design',
    blurb: 'Rendering, scaling, caching, and the trade-offs behind how systems are built.',
    accent: 'bg-sage',
    comingSoon: true,
  },
  {
    slug: 'machine-coding',
    title: 'Machine Coding',
    blurb: 'Build small, working systems under time pressure. Coming soon.',
    accent: 'bg-butter',
    comingSoon: true,
  },
] as const;
// `match` lists every path prefix that should highlight the link (series and topic pages live under Blog).
export const NAV_LINKS = [
  { href: '/blog', label: 'Blog', match: ['/blog', '/series', '/tags'] },
  { href: '/resources', label: 'Resources', match: ['/resources'] },
  { href: '/about', label: 'About', match: ['/about'] },
];
