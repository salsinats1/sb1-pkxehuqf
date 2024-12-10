import axios from 'axios';
import { Anime } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

export const getTopAnime = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/top/anime`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
};

export const getAnimeById = async (id: number): Promise<Anime | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${id}/full`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

export const searchAnime = async (query: string): Promise<Anime[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/anime`, {
      params: {
        q: query,
        limit: 20
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
};