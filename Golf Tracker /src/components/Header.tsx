import React from 'react';
import { Golf, LogIn, LogOut } from 'lucide-react';

interface HeaderProps {
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSignedIn, onSignIn, onSignOut }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-golf-500 rounded-lg flex items-center justify-center">
                <Golf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Golf Lesson Tracker</h1>
                <p className="text-sm text-gray-500">Track your progress on the course</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-green-600 font-medium">
                  Connected to Google Calendar
                </span>
                <button
                  onClick={onSignOut}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center px-4 py-2 bg-golf-500 hover:bg-golf-600 text-white font-medium rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Connect Google Calendar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
