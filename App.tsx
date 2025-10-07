
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Feed from './components/Feed';
import BottomNav from './components/BottomNav';
import { Post, Story } from './types';
import StoryViewer from './components/StoryViewer';

const App: React.FC = () => {
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const stories: Story[] = [
    { id: '1', user: { id: 'u1', username: 'nova_glow', avatarUrl: 'https://picsum.photos/seed/u1/100/100' }, imageUrl: 'https://picsum.photos/seed/s1/1080/1920' },
    { id: '2', user: { id: 'u2', username: 'cyb_er_punk', avatarUrl: 'https://picsum.photos/seed/u2/100/100' }, imageUrl: 'https://picsum.photos/seed/s2/1080/1920' },
    { id: '3', user: { id: 'u3', username: 'star_gazer', avatarUrl: 'https://picsum.photos/seed/u3/100/100' }, imageUrl: 'https://picsum.photos/seed/s3/1080/1920' },
    { id: '4', user: { id: 'u4', username: 'pixel_dreamer', avatarUrl: 'https://picsum.photos/seed/u4/100/100' }, imageUrl: 'https://picsum.photos/seed/s4/1080/1920' },
    { id: '5', user: { id: 'u5', username: 'echo_sphere', avatarUrl: 'https://picsum.photos/seed/u5/100/100' }, imageUrl: 'https://picsum.photos/seed/s5/1080/1920' },
    { id: '6', user: { id: 'u6', username: 'glitch_art', avatarUrl: 'https://picsum.photos/seed/u6/100/100' }, imageUrl: 'https://picsum.photos/seed/s6/1080/1920' },
    { id: '7', user: { id: 'u7', username: 'future_funk', avatarUrl: 'https://picsum.photos/seed/u7/100/100' }, imageUrl: 'https://picsum.photos/seed/s7/1080/1920' },
  ];

  const posts: Post[] = [
    {
      id: 'p1',
      user: { id: 'u3', username: 'star_gazer', avatarUrl: 'https://picsum.photos/seed/u3/100/100' },
      imageUrl: 'https://picsum.photos/seed/p1/600/800',
      caption: 'Lost in the cosmic dust. The universe is full of magic and wonder. ✨',
      likes: 1342,
      comments: 89,
    },
    {
      id: 'p2',
      user: { id: 'u4', username: 'pixel_dreamer', avatarUrl: 'https://picsum.photos/seed/u4/100/100' },
      imageUrl: 'https://picsum.photos/seed/p2/600/700',
      caption: 'City lights from above. A different perspective.',
      likes: 2048,
      comments: 150,
    },
    {
      id: 'p3',
      user: { id: 'u2', username: 'cyb_er_punk', avatarUrl: 'https://picsum.photos/seed/u2/100/100' },
      imageUrl: 'https://picsum.photos/seed/p3/600/600',
      caption: 'Neon dreams and digital streams.',
      likes: 987,
      comments: 65,
    },
  ];

  const openStoryViewer = (index: number) => {
    setSelectedStoryIndex(index);
    setStoryViewerOpen(true);
  };

  const closeStoryViewer = useCallback(() => {
    setStoryViewerOpen(false);
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans text-gray-100">
      <div className="max-w-md mx-auto relative h-screen overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="pt-16 pb-20">
          <Stories stories={stories} onStoryClick={openStoryViewer} />
          <Feed posts={posts} />
        </main>
        <BottomNav />
        {storyViewerOpen && (
          <StoryViewer
            stories={stories}
            startIndex={selectedStoryIndex}
            onClose={closeStoryViewer}
          />
        )}
      </div>
    </div>
  );
};

export default App;
