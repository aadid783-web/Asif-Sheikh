
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Story } from '../types';
import { CloseIcon, OptionsIcon } from './icons';

interface StoryViewerProps {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<number | null>(null);

  const currentStory = stories[currentIndex];

  const goToNextStory = useCallback(() => {
    setCurrentIndex(prevIndex => {
      if (prevIndex < stories.length - 1) {
        return prevIndex + 1;
      }
      onClose();
      return prevIndex;
    });
  }, [stories.length, onClose]);

  const goToPreviousStory = useCallback(() => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      const el = progressRef.current;
      el.style.animation = 'none';
      void el.offsetWidth; // Trigger reflow to restart animation
      el.style.animation = `progress-bar ${STORY_DURATION / 1000}s linear`;
      el.style.animationPlayState = isPaused ? 'paused' : 'running';
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (!isPaused) {
      timerRef.current = window.setTimeout(goToNextStory, STORY_DURATION);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, goToNextStory]);
  
  const handlePointerDown = () => {
    longPressTimer.current = window.setTimeout(() => {
      setIsPaused(true);
      longPressTimer.current = null;
    }, 200); // 200ms for long press
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (longPressTimer.current) {
      // Short press (tap)
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      
      const { clientX, currentTarget } = e;
      const { left, width } = currentTarget.getBoundingClientRect();
      const clickPosition = clientX - left;

      if (clickPosition < width / 3) {
        goToPreviousStory();
      } else {
        goToNextStory();
      }
    } else {
      // Long press release
      setIsPaused(false);
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col select-none" role="dialog" aria-modal="true" aria-labelledby="story-viewer-heading">
      <style>{`
        @keyframes progress-bar {
          from { width: 0%; } to { width: 100%; }
        }
      `}</style>

      {/* Background image preloading */}
      <div style={{display: 'none'}}>
        {currentIndex < stories.length - 1 && <img src={stories[currentIndex + 1].imageUrl} alt="preload next story"/>}
      </div>

      {/* Progress Bars & Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center space-x-1">
          {stories.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              {index < currentIndex && <div className="h-full bg-white w-full"></div>}
              {index === currentIndex && (
                <div ref={progressRef} className="h-full bg-white"></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              <img src={currentStory.user.avatarUrl} alt={currentStory.user.username} className="w-10 h-10 rounded-full object-cover border-2 border-white/50" />
              <span id="story-viewer-heading" className="font-semibold text-white" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>{currentStory.user.username}</span>
            </div>
            <div className="flex items-center space-x-2">
                <button className="text-white/80 hover:text-white" aria-label="More options">
                    <OptionsIcon className="w-6 h-6"/>
                </button>
                <button onClick={onClose} className="text-white/80 hover:text-white" aria-label="Close stories">
                    <CloseIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <img 
            src={currentStory.imageUrl} 
            alt={`Story by ${currentStory.user.username}`} 
            className="w-full h-full object-cover"
        />
        {/* Navigation overlay */}
        <div 
            className="absolute inset-0"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        ></div>
      </div>
    </div>
  );
};

export default StoryViewer;
