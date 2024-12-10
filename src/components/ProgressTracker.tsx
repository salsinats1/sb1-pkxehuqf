import React from 'react';
import { Play } from 'lucide-react';

interface ProgressTrackerProps {
  currentEpisode: number;
  totalEpisodes: number;
  onProgressUpdate: (progress: number) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentEpisode,
  totalEpisodes,
  onProgressUpdate,
}) => {
  const progress = (currentEpisode / totalEpisodes) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{currentEpisode} / {totalEpisodes} episodes</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onProgressUpdate(Math.max(0, currentEpisode - 1))}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          disabled={currentEpisode === 0}
        >
          -1
        </button>
        <button
          onClick={() => onProgressUpdate(Math.min(totalEpisodes, currentEpisode + 1))}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-1"
          disabled={currentEpisode === totalEpisodes}
        >
          <Play className="w-3 h-3" />
          Next Episode
        </button>
      </div>
    </div>
  );
};