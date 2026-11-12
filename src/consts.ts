export const SITE_TITLE = 'The Mindful EM';
export const SITE_DESCRIPTION =
  'Practical frameworks, systems, and deep dives for transitioning from engineer to engineering manager.';
export const AUTHOR = {
  name: 'Vibhor Singh',
  bio: 'Engineering leader writing about the craft of managing engineers.',
};
// `match` lists every path prefix that should highlight the link (series and topic pages live under Blog).
export const NAV_LINKS = [
  { href: '/resources', label: 'Resources', match: ['/resources'] },
  { href: '/blog', label: 'Blog', match: ['/blog', '/series', '/tags'] },
  { href: '/about', label: 'About', match: ['/about'] },
];
