export type PostMeta = {
    id: string;
    title: string;
    meta_title?: string;
    excerpt: string;
    date?: string;
    slug: string;
    availability: Array<string>;
    image: string;
    location?: string;
    year: string;
    watched_previously: string;
    director?: string;
    quote?: string;
    genres?: string[];
    image_description?: string;
    run_time?: string;
    review_provided?: boolean;
    rating?: number;
    rating_metric?: string;
    would_recommend?: boolean;
    would_rewatch?: boolean;
}