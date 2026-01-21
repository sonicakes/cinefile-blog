export type PostMeta = {
    id: string;
    title: string;
    excerpt: string;
    date?: string;
    slug: string;
    availability: Array<string>;
    image: string;
    location?: string;
    year: string;
    watchedPreviously: string;
    director?: string;
}