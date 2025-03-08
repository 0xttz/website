export interface Project {
    id: string;
    title: string;
    subtitle: string;
    date: string; // ISO format date string
    tags: string[];
    coverImage: string;
    architectureImage?: string;
    content: string; // Markdown content or HTML
    featured?: boolean;
}

export type ProjectFilter = 'all' | 'featured' | string; // string for tag-based filters 