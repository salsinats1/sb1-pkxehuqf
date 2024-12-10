import React, { useState } from 'react';
import { StickyNote } from 'lucide-react';

interface WatchlistNotesProps {
  notes: string | undefined;
  onNotesUpdate: (notes: string) => void;
}

export const WatchlistNotes: React.FC<WatchlistNotesProps> = ({
  notes,
  onNotesUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes || '');

  const handleSubmit = () => {
    onNotesUpdate(currentNotes);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Notes</h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={currentNotes}
            onChange={(e) => setCurrentNotes(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Add your notes here..."
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setCurrentNotes(notes || '');
                setIsEditing(false);
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">
          {currentNotes || 'No notes added yet.'}
        </p>
      )}
    </div>
  );
};