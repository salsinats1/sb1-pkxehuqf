export type WatchStatus = 'planning' | 'watching' | 'completed' | 'dropped';

export interface WatchlistItem {
  animeId: number;
  status: WatchStatus;
  progress: number;
  startDate?: string;
  completedDate?: string;
  notes?: string;
}

export interface WatchHistory {
  date: string;
  animeId: number;
  status: WatchStatus;
  progress: number;
}