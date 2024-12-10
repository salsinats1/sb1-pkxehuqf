import { useState, useEffect } from 'react';
import { Anime } from '../types/anime';
import { WatchStatus, WatchlistItem, WatchHistory } from '../types/watchlist';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Anime[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('anime-watchlist');
    const storedItems = localStorage.getItem('anime-watchlist-items');
    const storedHistory = localStorage.getItem('anime-watch-history');
    
    if (stored) setWatchlist(JSON.parse(stored));
    if (storedItems) setWatchlistItems(JSON.parse(storedItems));
    if (storedHistory) setWatchHistory(JSON.parse(storedHistory));
  }, []);

  const addToWatchlist = (anime: Anime, status: WatchStatus = 'planning') => {
    const newWatchlist = [...watchlist, anime];
    const newItem: WatchlistItem = {
      animeId: anime.mal_id,
      status,
      progress: 0,
      startDate: status === 'watching' ? new Date().toISOString() : undefined,
    };
    
    const newWatchlistItems = [...watchlistItems, newItem];
    const historyEntry: WatchHistory = {
      date: new Date().toISOString(),
      animeId: anime.mal_id,
      status,
      progress: 0,
    };
    
    setWatchlist(newWatchlist);
    setWatchlistItems(newWatchlistItems);
    setWatchHistory([...watchHistory, historyEntry]);
    
    localStorage.setItem('anime-watchlist', JSON.stringify(newWatchlist));
    localStorage.setItem('anime-watchlist-items', JSON.stringify(newWatchlistItems));
    localStorage.setItem('anime-watch-history', JSON.stringify([...watchHistory, historyEntry]));
  };

  const removeFromWatchlist = (animeId: number) => {
    const newWatchlist = watchlist.filter(anime => anime.mal_id !== animeId);
    const newWatchlistItems = watchlistItems.filter(item => item.animeId !== animeId);
    
    setWatchlist(newWatchlist);
    setWatchlistItems(newWatchlistItems);
    
    localStorage.setItem('anime-watchlist', JSON.stringify(newWatchlist));
    localStorage.setItem('anime-watchlist-items', JSON.stringify(newWatchlistItems));
  };

  const updateWatchStatus = (animeId: number, status: WatchStatus) => {
    const updatedItems = watchlistItems.map(item => {
      if (item.animeId === animeId) {
        const updates: Partial<WatchlistItem> = { status };
        if (status === 'watching' && !item.startDate) {
          updates.startDate = new Date().toISOString();
        }
        if (status === 'completed') {
          updates.completedDate = new Date().toISOString();
          updates.progress = getAnimeEpisodes(animeId);
        }
        return { ...item, ...updates };
      }
      return item;
    });

    const historyEntry: WatchHistory = {
      date: new Date().toISOString(),
      animeId,
      status,
      progress: getWatchProgress(animeId),
    };

    setWatchlistItems(updatedItems);
    setWatchHistory([...watchHistory, historyEntry]);
    
    localStorage.setItem('anime-watchlist-items', JSON.stringify(updatedItems));
    localStorage.setItem('anime-watch-history', JSON.stringify([...watchHistory, historyEntry]));
  };

  const updateProgress = (animeId: number, progress: number) => {
    const updatedItems = watchlistItems.map(item => {
      if (item.animeId === animeId) {
        const updates: Partial<WatchlistItem> = { 
          progress,
          status: progress === getAnimeEpisodes(animeId) ? 'completed' : item.status,
        };
        if (progress === getAnimeEpisodes(animeId)) {
          updates.completedDate = new Date().toISOString();
        }
        return { ...item, ...updates };
      }
      return item;
    });

    const historyEntry: WatchHistory = {
      date: new Date().toISOString(),
      animeId,
      status: updatedItems.find(item => item.animeId === animeId)?.status || 'watching',
      progress,
    };

    setWatchlistItems(updatedItems);
    setWatchHistory([...watchHistory, historyEntry]);
    
    localStorage.setItem('anime-watchlist-items', JSON.stringify(updatedItems));
    localStorage.setItem('anime-watch-history', JSON.stringify([...watchHistory, historyEntry]));
  };

  const updateNotes = (animeId: number, notes: string) => {
    const updatedItems = watchlistItems.map(item => 
      item.animeId === animeId ? { ...item, notes } : item
    );
    
    setWatchlistItems(updatedItems);
    localStorage.setItem('anime-watchlist-items', JSON.stringify(updatedItems));
  };

  const getAnimeEpisodes = (animeId: number) => {
    return watchlist.find(anime => anime.mal_id === animeId)?.episodes || 0;
  };

  const getWatchProgress = (animeId: number) => {
    return watchlistItems.find(item => item.animeId === animeId)?.progress || 0;
  };

  const getWatchStatus = (animeId: number) => {
    return watchlistItems.find(item => item.animeId === animeId)?.status;
  };

  const getNotes = (animeId: number) => {
    return watchlistItems.find(item => item.animeId === animeId)?.notes;
  };

  const isInWatchlist = (animeId: number) => {
    return watchlist.some(anime => anime.mal_id === animeId);
  };

  return {
    watchlist,
    watchlistItems,
    watchHistory,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchStatus,
    updateProgress,
    updateNotes,
    getWatchProgress,
    getWatchStatus,
    getNotes,
    isInWatchlist,
  };
};