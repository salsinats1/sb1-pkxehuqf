import React from 'react';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import { Anime } from '../types/anime';

interface WatchlistButtonProps {
  anime: Anime;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ anime }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(anime.mal_id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(anime.mal_id);
    } else {
      addToWatchlist(anime);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full ${
        inWatchlist
          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {inWatchlist ? (
        <BookmarkCheck className="w-5 h-5" />
      ) : (
        <BookmarkPlus className="w-5 h-5" />
      )}
    </button>
  );
};