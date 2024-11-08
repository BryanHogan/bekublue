import { z, defineCollection } from 'astro:content';

const reviewCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string().max(75, "Maximum of 75 characters in title required.").min(1, "Minimum of 1 characters in title required."),
        description: z.string().max(200, "Maximum of 200 characters in description required.").min(25, "Minimum of 25 characters in description required."),
        author: z.string(),
        cover: image()
            .refine((img) => img.width > 350, {
                message: "Cover image must be at least 350 pixel wide!",
            })
            .refine((img) => img.height > 200, {
                message: "Cover image must be at least 200 pixel high!",
            }),
        coverAlt: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()),
    })
});

const postCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        title: z.string().max(60, "Maximum of 60 characters in title required.").min(10, "Minimum of 10 characters in title required."),
    })
});

export const collections = {
    'reviews': reviewCollection,
    'posts': postCollection,
};