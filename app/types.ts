export type PostMeta = {
  id: string;
  documentId: string;
  title: string;
  date_reviewed: string;
  date_watched: string;
  year: string;
  rating: number;
  meta_title: string;
  body_blog: string;
  excerpt: string;
  director: string;
  would_recommend: boolean;
  would_rewatch: boolean;
  review_provided: boolean;
  letterboxd_uri: string;
  image_description: string;
  rating_metric: string;
  quote: string;
  run_time: string;
  next_movie?: {
    reason?: string;
    movie?: StrapiPost;
  };
  spotify_episodes?: {
    title?: string;
    url?: string;
    podcastName: string;
  }[];
  availability?: { source: string; location: string }[];
  img?: string;
  genres: { id: string; name: string }[];
};

export type Stat = {
  minutes: number;
  text: string;
  time: number;
  words: number;
};
export type SearchInputProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearChange: () => void;
};

export type SortOption = "newest" | "oldest" | "alphabetical";

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiPost = {
  id: string;
  documentId: string;
  rating: number;
  title: string;
  date_reviewed: string;
  date_watched: string;
  meta_title: string;
  body_blog: string;
  excerpt: string;
  director: string;
  would_recommend: boolean;
  would_rewatch: boolean;
  review_provided: boolean;
  letterboxd_uri: string;
  image_description: string;
  rating_metric: string;
  quote: string;
  run_time: string;
  next_movie?: {
    reason?: string;
    movie?: StrapiPost;
  };
  spotify_episodes?: {
    title?: string;
    url?: string;
    podcastName: string;
  }[];
  availability?: { source: string; location: string }[];
  year: string;
  img?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  genres: { id: string; name: string; documentId: string }[];
};
