import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Anime } from '../types/anime';
import { WatchlistButton } from './WatchlistButton';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
    >
      <div className="relative">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <WatchlistButton anime={anime} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">{anime.title}</h3>
        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span>{anime.score}</span>
        </div>
        <p className="text-gray-600 mt-2 line-clamp-2">{anime.synopsis}</p>
      </div>
    </div>
  );
};