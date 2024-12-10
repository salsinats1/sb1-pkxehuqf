import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { UserComment } from '../types/userInteraction';

interface CommentSectionProps {
  comments: UserComment[];
  onAddComment: (comment: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <p className="text-gray-700">{comment.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(comment.date), 'PPP')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};