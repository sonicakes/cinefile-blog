export type PostMeta = {
  id: string;
  title: string;
  date_reviewed?: string;
  read_time?: string;
  meta_title?: string;
  excerpt: string;
  date?: string;
  slug: string;
  availability: Array<string>;
  image: string;
  location?: string;
  year: string;
  watched: boolean;
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
  spotify_episodes?: { title: string; podcastName: string; url: string }[];
  next_movie?: {
    title?: string;
    year?: number;
    reason?: string;
    url?: string;
    thumbnailUrl?: string;
  };
};

export type Stat = {
  
      minutes: number;
      text: string;
      time: number;
      words: number
}
export type SearchInputProps = {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onClearChange: () => void;
}


export type SortOption = 'newest' | 'oldest' | 'alphabetical';
