
import React from 'react';
import { HomeIcon, CompassIcon, PlusCircleIcon, BellIcon, UserCircleIcon } from './icons';

const BottomNav: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black bg-opacity-80 backdrop-blur-sm z-50 border-t border-gray-800">
      <nav className="flex items-center justify-around h-20">
        <a href="#home" className="text-gray-400 hover:text-amber-400 transition-colors">
          <HomeIcon className="w-7 h-7" />
        </a>
        <a href="#explore" className="text-gray-400 hover:text-amber-400 transition-colors">
          <CompassIcon className="w-7 h-7" />
        </a>
        <a href="#create" className="text-amber-400 hover:text-amber-300 transition-transform transform hover:scale-110">
          <PlusCircleIcon className="w-12 h-12" />
        </a>
        <a href="#notifications" className="text-gray-400 hover:text-amber-400 transition-colors">
          <BellIcon className="w-7 h-7" />
        </a>
        <a href="#profile" className="text-gray-400 hover:text-amber-400 transition-colors">
          <UserCircleIcon className="w-7 h-7" />
        </a>
      </nav>
    </footer>
  );
};

export default BottomNav;
