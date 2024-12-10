export interface UserRating {
  animeId: number;
  rating: number;
  date: string;
}

export interface UserComment {
  animeId: number;
  comment: string;
  date: string;
}

export interface UserStats {
  totalWatched: number;
  averageRating: number;
  genreDistribution: Record<string, number>;
  watchingHistory: {
    date: string;
    count: number;
  }[];
}