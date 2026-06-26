import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/blog"
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        draft: z.boolean().optional().default(false),
    })
});

const experience = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/experience"
    }),
    schema: z.object({
        title: z.string(),
        logo: z.string(),
        description: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        current: z.boolean().optional().default(false),
    })
});

const projects = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/projects"
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
        githubUrl: z.string().url().optional(),
        featured: z.boolean().optional().default(false),
        techs: z.array(z.string()).optional(),
        image: z.string().optional(),
        artistUrl: z.string().url().optional(),
    })
});

const site = defineCollection({
    loader: file("./src/content/site/config.json"),
    schema: z.object({
        name: z.string(),
        title: z.string(),
        introduction: z.string(),
        sections: z.object({
            education: z.object({
                title: z.string(),
                viewAllText: z.string(),
            }),
            blog: z.object({
                title: z.string(),
                viewAllText: z.string(),
            }),
            intelligence: z.object({
                title: z.string(),
                viewAllText: z.string(),
            }),
            projects: z.object({
                title: z.string(),
                viewAllText: z.string(),
            }),
            experience: z.object({
                title: z.string(),
                viewAllText: z.string(),
            }),
        }),
        socialLinks: z.array(z.object({
            platform: z.string(),
            url: z.string().url(),
        })).optional(),
    })
});

const education = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/education"
    }),
    schema: z.object({
        title: z.string(),
        institution: z.string(),
        institutionUrl: z.string().url(),
        logo: z.string(),
        description: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        current: z.boolean().optional().default(false),
        type: z.enum(["college", "postgraduate"]),
    })
});

const notes = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/notes"
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        category: z.string(),
        draft: z.boolean().optional().default(false),
    })
});

const bookmarks = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/bookmarks"
    }),
    schema: z.object({
        title: z.string(),
        type: z.enum(["article", "book", "video", "doc"]),
        author: z.string(),
        url: z.string().url(),
        publishedAt: z.coerce.date(),
        createdAt: z.coerce.date(),
        description: z.string().optional(),
    })
});

const intelligence = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/intelligence"
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        source: z.string().optional(),
        sourceUrl: z.string().url().optional(),
        draft: z.boolean().optional().default(false),
    })
});

export const collections = {
    blog,
    experience,
    projects,
    site,
    notes,
    bookmarks,
    education,
    intelligence,
}; 