import { getCollection, type CollectionEntry } from 'astro:content';
import { RESOURCE_TRACKS } from '../consts';

export type Resource = CollectionEntry<'resources'>;

/** The track is the first folder in the entry id, e.g. `system-design/rendering/csr-ssr-ssg`. */
export const trackOf = (resource: Resource): string => resource.id.split('/')[0];

/** Path under the track, used as the article URL segment. */
export const slugOf = (resource: Resource): string => resource.id.split('/').slice(1).join('/');

export const resourceHref = (resource: Resource): string =>
  `/resources/${trackOf(resource)}/${slugOf(resource)}`;

export const getTrack = (slug: string) => RESOURCE_TRACKS.find((t) => t.slug === slug);

/** Published resources in reading order (topic first appearance, then `order`). Drafts are hidden. */
export async function getResources(): Promise<Resource[]> {
  const all = await getCollection('resources', ({ data }) => !data.draft);
  return all.sort(
    (a, b) =>
      trackOf(a).localeCompare(trackOf(b)) ||
      a.data.order - b.data.order ||
      a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
  );
}

export function inTrack(resources: Resource[], track: string): Resource[] {
  return resources.filter((r) => trackOf(r) === track);
}

/** Groups a track's resources by topic, keeping topics in the order they first appear. */
export function groupByTopic(resources: Resource[]): { topic: string; items: Resource[] }[] {
  const map = new Map<string, Resource[]>();
  for (const r of resources) map.set(r.data.topic, [...(map.get(r.data.topic) ?? []), r]);
  return [...map].map(([topic, items]) => ({ topic, items }));
}
