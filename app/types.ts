// export type PostMeta = {
//   id: string;
//   title: string;
//   date_reviewed?: string;
//   read_time?: string;
//   meta_title?: string;
//   excerpt?: string;
//   date?: string;
//   slug: string;
//   availability?: { medium: string; location: string }[];
//   image?: string;
//   year: string;
//   watched: boolean | null;
//   director?: string;
//   quote?: string;
//   genres?: string[];
//   image_description?: string;
//   run_time?: string;
//   review_provided?: boolean;
//   rating?: number;
//   rating_metric?: string;
//   would_recommend?: boolean;
//   would_rewatch?: boolean;
//   spotify_episodes?: { title: string; podcastName: string; url: string }[];
//   next_movie?: {
//     title?: string;
//     year?: number;
//     reason?: string;
//     url?: string;
//     thumbnailUrl?: string;
//   };
// };

export type PostMeta = {
  id: string;
  title: string;
  date_reviewed: string;
  year: string;
  rating: number;
  meta_title: string;
  body_blog: string;
  slug: string;
  excerpt: string;
  watched: boolean;
  director: string;
  would_recommend: boolean;
  would_rewatch: boolean;
  review_provided: boolean;
  letterboxd_uri: string;
  image_description: string;
  image: string;
  rating_metric: string;
  quote: string;
  run_time: string;
  img?: string;
  genres: { id: string; name: string; }[]; // This means "an array containing any number of objects"
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
  meta_title: string;
  body_blog: string;
  slug: string;
  excerpt: string;
  watched: boolean;
  director: string;
  would_recommend: boolean;
  would_rewatch: boolean;
  review_provided: boolean;
  letterboxd_uri: string;
  image_description: string;
  image: string;
  rating_metric: string;
  quote: string;
  run_time: string;
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
 genres: { id: string; name: string; documentId: string; }[]; // This means "an array containing any number of objects"
};
