import { z, defineCollection, reference } from 'astro:content';

const reviewCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string().max(75, "Maximum of 75 characters in title required.").min(1, "Minimum of 1 characters in title required."),
        description: z.string().max(200, "Maximum of 200 characters in description required.").min(25, "Minimum of 25 characters in description required."),
        author: z.string().optional(),
        cover: image(),
        hero: image(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        rating: z.number().max(5, "Max rating is 5.").min(0, "Minimum rating is 0"),
        apititle: z.string().optional(),
        similarGames: z.array(reference('reviews')).optional(),
        relevantBlogPosts: z.array(reference('posts')).optional(),
    })
});

const postCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string().max(75, "Maximum of 75 characters in title required.").min(1, "Minimum of 1 characters in title required."),
        description: z.string().max(200, "Maximum of 200 characters in description required.").min(25, "Minimum of 25 characters in description required."),
        author: z.string(),
        cover: image(),
        hero: image(),
        pubDate: z.date(),
        tags: z.array(z.string()),
        rating: z.number().max(5, "Max rating is 5.").min(0, "Minimum rating is 0"),
    })
});

export const collections = {
    'reviews': reviewCollection,
    'posts': postCollection,
};