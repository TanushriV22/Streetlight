import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="ml-4 flex items-center">
              <div className="flex items-center">
                <div className="bg-blue-800 text-white p-1.5 rounded">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5"
                  >
                    <path d="M12 2v8M12 18v4M4.93 10.93l1.41 1.41M18.66 11.66l-1.41 1.41M2 18h2M20 18h2M5.6 5.6l1.41 1.41M18.66 5.6l-1.41 1.41" />
                  </svg>
                </div>
                <span className="ml-2 font-bold text-xl text-gray-900 dark:text-white">
                  StreetLight
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.role === 'admin' ? 'Administrator' : 'User'}
                    </span>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    <User size={18} />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut size={16} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;