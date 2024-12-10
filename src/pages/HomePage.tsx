import React, { useEffect, useState } from 'react';
import { getTopAnime } from '../services/animeApi';
import { AnimeCard } from '../components/AnimeCard';
import { Anime } from '../types/anime';
import { Library } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      const data = await getTopAnime();
      setAnimes(data);
      setLoading(false);
    };
    fetchAnimes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Library className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">My Anime Collection</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};