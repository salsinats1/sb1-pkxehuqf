import React, { useState, useMemo } from 'react';
import { BookmarkX, Filter } from 'lucide-react';
import { AnimeCard } from '../components/AnimeCard';
import { useWatchlist } from '../hooks/useWatchlist';
import { WatchStatus } from '../types/watchlist';

export const WatchlistPage: React.FC = () => {
  const { watchlist, watchlistItems } = useWatchlist();
  const [statusFilter, setStatusFilter] = useState<WatchStatus | 'all'>('all');

  const filteredWatchlist = useMemo(() => {
    if (statusFilter === 'all') return watchlist;
    return watchlist.filter(anime => 
      watchlistItems.find(item => 
        item.animeId === anime.mal_id && item.status === statusFilter
      )
    );
  }, [watchlist, watchlistItems, statusFilter]);

  const statusCounts = useMemo(() => {
    return watchlistItems.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<WatchStatus, number>);
  }, [watchlistItems]);

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <BookmarkX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your watchlist is empty</h2>
          <p className="text-gray-500">Start adding anime to your watchlist to keep track of what you want to watch!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Watchlist</h1>
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({watchlist.length})
              </button>
              {(['watching', 'planning', 'completed', 'dropped'] as WatchStatus[]).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status] || 0})
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWatchlist.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};