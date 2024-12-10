import React from 'react';
import { Play, Pause, CheckCircle2, XCircle, ListPlus } from 'lucide-react';
import { WatchStatus } from '../types/watchlist';

interface WatchStatusSelectProps {
  status: WatchStatus | undefined;
  onStatusChange: (status: WatchStatus) => void;
}

export const WatchStatusSelect: React.FC<WatchStatusSelectProps> = ({
  status,
  onStatusChange,
}) => {
  const statusOptions: { value: WatchStatus; label: string; icon: React.ReactNode }[] = [
    { value: 'planning', label: 'Plan to Watch', icon: <ListPlus className="w-4 h-4" /> },
    { value: 'watching', label: 'Watching', icon: <Play className="w-4 h-4" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2 className="w-4 h-4" /> },
    { value: 'dropped', label: 'Dropped', icon: <XCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-2">
      {statusOptions.map(option => (
        <button
          key={option.value}
          onClick={() => onStatusChange(option.value)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
            status === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};