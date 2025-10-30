import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { file } from 'astro/loaders';
import { parse as csvParse } from 'csv-parse/sync';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			shortDesc: z.string().optional(),
			description: z.string(),
			pubDate: z.coerce.date(),
			status: z.enum(["Prototype", "In-Development", "Released"]),
			credits: z.array(z.string()).optional(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).optional(),
			download: z.string().optional(),
			image: image().optional(),
		}),
})

const team = defineCollection({
	loader: file("src/content/team.csv", {
		parser: (text) => csvParse(text, {
			columns: true,
			skipEmptyLines: true,
		})
	}),
	schema: ({ image }) =>
		z.object({
			prio: z.coerce.number(),
			name: z.string(),
			email: z.string(),
			socials: z.string().optional(),
			title: z.string().optional(),
			image: image().optional(),
		})
})

export const collections = { blog, projects, team };
