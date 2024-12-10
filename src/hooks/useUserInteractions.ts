import { useState, useEffect } from 'react';
import { UserRating, UserComment } from '../types/userInteraction';

export const useUserInteractions = (animeId: number) => {
  const [ratings, setRatings] = useState<UserRating[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);

  useEffect(() => {
    const storedRatings = localStorage.getItem('anime-ratings');
    const storedComments = localStorage.getItem('anime-comments');
    
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const addRating = (rating: number) => {
    const newRating: UserRating = {
      animeId,
      rating,
      date: new Date().toISOString(),
    };
    const updatedRatings = [...ratings.filter(r => r.animeId !== animeId), newRating];
    setRatings(updatedRatings);
    localStorage.setItem('anime-ratings', JSON.stringify(updatedRatings));
  };

  const addComment = (comment: string) => {
    const newComment: UserComment = {
      animeId,
      comment,
      date: new Date().toISOString(),
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem('anime-comments', JSON.stringify(updatedComments));
  };

  const getUserRating = () => ratings.find(r => r.animeId === animeId)?.rating;
  const getComments = () => comments.filter(c => c.animeId === animeId);

  return {
    addRating,
    addComment,
    getUserRating,
    getComments,
  };
};