import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeById } from '../services/animeApi';
import { Anime } from '../types/anime';
import { Star, Clock, Film } from 'lucide-react';
import { RatingStars } from '../components/RatingStars';
import { CommentSection } from '../components/CommentSection';
import { useUserInteractions } from '../hooks/useUserInteractions';

export const AnimePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const { addRating, addComment, getUserRating, getComments } = useUserInteractions(
    parseInt(id || '0')
  );

  useEffect(() => {
    const fetchAnime = async () => {
      if (id) {
        const data = await getAnimeById(parseInt(id));
        setAnime(data);
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  if (loading || !anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="relative h-96">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span>{anime.score}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Film className="w-5 h-5" />
                  <span>{anime.episodes} episodes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{anime.status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed">{anime.synopsis}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span
                    key={genre.name}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Rating</h2>
              <RatingStars
                rating={getUserRating() || 0}
                onRate={addRating}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>
              <CommentSection
                comments={getComments()}
                onAddComment={addComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};