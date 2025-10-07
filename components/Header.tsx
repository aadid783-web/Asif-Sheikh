
import React from 'react';
import { SearchIcon, BellIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-black bg-opacity-80 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-2xl font-bold tracking-wider text-amber-400 uppercase">
          Star Social
        </h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-amber-400 transition-colors">
            <SearchIcon className="w-6 h-6" />
          </button>
          <button className="relative text-gray-300 hover:text-amber-400 transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-black"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
