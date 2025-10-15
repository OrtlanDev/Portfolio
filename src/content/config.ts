import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  schema: z.object({
    name: z.string(),
    category: z.string(),
    tag: z.string(),
    images: z.array(z.string()),
    technologies: z.array(z.string()),
    description: z.string(),
    date: z.number(),
    order: z.number(),
    links: z
      .object({
        github: z.string().url().optional(),
        web: z.string().url().optional(),
      })
      .optional(),
    projectType: z.string(),
  }),
});

export const collections = { projects };
