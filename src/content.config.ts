import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
      level: z.enum(['aspiring', 'new-em', 'experienced']).optional(),
      draft: z.boolean().default(false),
    }),
});

// Technical study material. The first folder under src/content/resources is the track (see RESOURCE_TRACKS).
const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    topic: z.string(),
    order: z.number().default(0),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, resources };
