import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are visible only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Each series gets a stable accent colour (literal class names so Tailwind can see them). */
const ACCENT_BG = ['bg-sage', 'bg-clay', 'bg-butter', 'bg-lilac'] as const;

/** Small stable string hash, used to pick colours and cover styles deterministically. */
export function hashOf(value: string): number {
  let hash = 0;
  for (const ch of value) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash;
}

export function accentFor(name: string | undefined): (typeof ACCENT_BG)[number] {
  if (!name) return 'bg-sage';
  return ACCENT_BG[hashOf(name) % ACCENT_BG.length];
}

export function groupBySeries(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    const series = post.data.series;
    if (!series) continue;
    map.set(series, [...(map.get(series) ?? []), post]);
  }
  for (const list of map.values()) {
    list.sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
  }
  return map;
}

export function groupByTag(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, [...(map.get(tag) ?? []), post]);
    }
  }
  return map;
}

/** Posts sharing the most tags with `post`, excluding itself. */
export function getRelated(post: Post, all: Post[], limit = 3): Post[] {
  const tags = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}
