import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useWatchlist } from '../hooks/useWatchlist';
import { Activity, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const StatsPage: React.FC = () => {
  const { watchlist } = useWatchlist();

  // Calculate genre distribution
  const genreDistribution = watchlist.reduce((acc: Record<string, number>, anime) => {
    anime.genres.forEach((genre) => {
      acc[genre.name] = (acc[genre.name] || 0) + 1;
    });
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(genreDistribution),
    datasets: [
      {
        data: Object.values(genreDistribution),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
          '#6366F1',
        ],
      },
    ],
  };

  const averageScore = watchlist.reduce((acc, anime) => acc + anime.score, 0) / watchlist.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Anime Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Quick Stats</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Total Anime Watched</p>
                <p className="text-2xl font-bold">{watchlist.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">{averageScore.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Genre Distribution</h2>
            </div>
            <div className="h-64">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};