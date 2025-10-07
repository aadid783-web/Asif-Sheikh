
import React from 'react';
import { Story } from '../types';
import { PlusIcon } from './icons';

interface StoriesProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

const Stories: React.FC<StoriesProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="py-3 border-b border-gray-800">
      <div className="flex items-center space-x-4 overflow-x-auto px-4 scrollbar-hide">
        {/* Add Story Button */}
        <div className="flex-shrink-0 flex flex-col items-center space-y-1">
          <button className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 hover:border-amber-400 transition-colors">
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </button>
          <span className="text-xs text-gray-400">Add Story</span>
        </div>

        {/* Stories */}
        {stories.map((story, index) => (
          <div key={story.id} className="flex-shrink-0 flex flex-col items-center space-y-1">
            <button
              onClick={() => onStoryClick(index)}
              className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-yellow-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label={`View story from ${story.user.username}`}
            >
              <div className="bg-black p-0.5 rounded-full">
                <img src={story.user.avatarUrl} alt={story.user.username} className="w-full h-full rounded-full object-cover" />
              </div>
            </button>
            <span className="text-xs text-gray-300 truncate w-16 text-center">{story.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
