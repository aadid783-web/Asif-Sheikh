
import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, OptionsIcon } from './icons';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(prev => !prev);
  };

  return (
    <div className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img src={post.user.avatarUrl} alt={post.user.username} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold text-gray-200">{post.user.username}</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <OptionsIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Post Image */}
      <div className="w-full">
        <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />
      </div>
      
      {/* Actions & Stats */}
      <div className="p-3">
        <div className="flex items-center justify-between text-gray-300">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className="flex items-center space-x-1 group">
              <HeartIcon className={`w-7 h-7 transition-all duration-200 ${isLiked ? 'text-amber-400 fill-current' : 'group-hover:text-amber-300'}`} />
            </button>
            <button className="flex items-center space-x-1 group">
              <CommentIcon className="w-7 h-7 group-hover:text-amber-300" />
            </button>
            <button className="flex items-center space-x-1 group">
              <ShareIcon className="w-7 h-7 group-hover:text-amber-300" />
            </button>
          </div>
        </div>

        <div className="mt-2 text-sm">
          <span className="font-bold text-amber-400">{likeCount.toLocaleString()} stars</span>
          <span className="text-gray-400"> • </span>
          <span className="font-bold text-amber-400">{post.comments.toLocaleString()} comments</span>
        </div>
      </div>
      
      {/* Caption */}
      <div className="px-3 pb-3 text-sm">
        <p className="text-gray-300">
          <span className="font-semibold text-gray-100 mr-2">{post.user.username}</span>
          {post.caption}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
