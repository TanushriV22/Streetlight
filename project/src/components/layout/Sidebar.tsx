import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Settings, Users, BarChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg
    ${
      isActive
        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }
    transition-colors duration-200
  `;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-900 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}
    >
      <div className="p-4">
        <div className="py-6 flex flex-col h-[calc(100vh-80px)]">
          <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-4 px-4">
            Navigation
          </p>
          
          <nav className="space-y-1">
            <NavLink to="/" className={linkClass}>
              <Home size={18} />
              Dashboard
            </NavLink>
            
            <NavLink to="/complaints/new" className={linkClass}>
              <FileText size={18} />
              Report Streetlight Issue
            </NavLink>
            
            <NavLink to="/complaints" className={linkClass}>
              <FileText size={18} />
              My Complaints
            </NavLink>
            
            {user?.role === 'admin' && (
              <>
                <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mt-6 mb-4 px-4">
                  Administration
                </p>
                
                <NavLink to="/admin/complaints" className={linkClass}>
                  <BarChart size={18} />
                  All Complaints
                </NavLink>
                
                <NavLink to="/admin/users" className={linkClass}>
                  <Users size={18} />
                  User Management
                </NavLink>
                
                <NavLink to="/admin/settings" className={linkClass}>
                  <Settings size={18} />
                  System Settings
                </NavLink>
              </>
            )}
          </nav>
          
          <div className="mt-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Need assistance?
              </h4>
              <p className="text-xs text-blue-800/80 dark:text-blue-300/80 mt-1">
                Contact our support team for help with the system.
              </p>
              <a
                href="mailto:support@streetlight.com"
                className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline block"
              >
                support@streetlight.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;