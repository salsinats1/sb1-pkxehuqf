import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Search, BookmarkCheck, Home, BarChart2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Library className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl">AnimeTracker</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-2 ${
                isActive('/search') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </Link>
            <Link
              to="/watchlist"
              className={`flex items-center gap-2 ${
                isActive('/watchlist') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <BookmarkCheck className="w-5 h-5" />
              <span>Watchlist</span>
            </Link>
            <Link
              to="/stats"
              className={`flex items-center gap-2 ${
                isActive('/stats') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Stats</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};