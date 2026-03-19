export type Post = {
  id: string;
  documentId: string;
  title: string;
  date_reviewed?: string;
  date_watched?: string;
  year: string;
  rating: number;
  meta_title?: string;
  body_blog?: string;
  excerpt?: string;
  director: string;
  would_recommend: boolean;
  would_rewatch: boolean;
  review_provided: boolean;
  letterboxd_uri?: string;
  image_description?: string;
  rating_metric: string;
  quote?: string;
  run_time: string;
  next_movie?: {
    movie?: RawPost;
  };
  spotify_episodes?: {
    title?: string;
    url?: string;
    podcastName: string;
  }[];
  further_reading?: { title: string; author?: string; url?: string }[];
  sims_scenario?: { scenarioName: string; description?: string; url?: string }[];
  availability?: { source: string; location: string }[];
  img?: string;
  genres: { id: string; name: string }[];
};

export type SortOption =
  | "newest"
  | "oldest"
  | "alphabetical"
  | "rating-high"
  | "rating-low"
  | "year-newest"
  | "year-oldest";

export type RawPost = {
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
    movie?: RawPost;
  };
  spotify_episodes?: {
    title?: string;
    url?: string;
    podcastName: string;
  }[];
  further_reading?: { title: string; author?: string; url?: string }[];
  sims_scenario?: { scenarioName: string; description?: string; url?: string }[];
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
