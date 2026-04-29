export type Movie = {
  id: string;
  documentId: string;
  slug: string;
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
    movie?: RawMovie;
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
  times_watched?: number;
};

export type SortOption =
  | "newest"
  | "oldest"
  | "alphabetical"
  | "rating-high"
  | "rating-low"
  | "year-newest"
  | "year-oldest";

export type RawMovie = {
  id: string;
  documentId: string;
  slug: string;
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
    movie?: RawMovie;
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
  times_watched?: number;
};

export type RawPost = {
  id: string;
  documentId: string;
  slug: string;
  title: string;
  date?: string;
  meta_title?: string;
  excerpt?: string;
  body_blog?: string;
  image_description?: string;
  img?: { url: string; formats?: { medium?: { url: string }; small?: { url: string } } };
  further_reading?: { title: string; author?: string; url?: string }[];
  spotify_episodes?: { title?: string; url?: string; podcastName: string }[];
};

export type Post = {
  id: string;
  documentId: string;
  slug: string;
  title: string;
  date?: string;
  meta_title?: string;
  excerpt?: string;
  body_blog?: string;
  image_description?: string;
  img?: string;
  further_reading?: { title: string; author?: string; url?: string }[];
  spotify_episodes?: { title?: string; url?: string; podcastName: string }[];
};
