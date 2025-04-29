import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, FileText, Activity, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-blue-600 dark:border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                Report an Issue
              </h2>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Spotted a non-functional streetlight? Report it quickly and help improve your neighborhood's safety.
            </p>
            <Button 
              className="mt-4 w-full"
              onClick={() => navigate('/complaints/new')}
            >
              Submit New Report
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-amber-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                <FileText size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                Track Reports
              </h2>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              View the status of your submitted reports and receive updates as maintenance crews resolve issues.
            </p>
            <Button 
              variant="outline"
              className="mt-4 w-full"
              onClick={() => navigate('/complaints')}
            >
              View My Reports
            </Button>
          </div>
          
          {user.role === 'admin' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <Shield size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                  Admin Dashboard
                </h2>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Access the admin dashboard to manage all reports, update statuses, and view system statistics.
              </p>
              <Button 
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate('/admin/complaints')}
              >
                Open Dashboard
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-8 w-8 text-blue-800 dark:text-blue-200"
              >
                <path d="M12 2v8M12 18v4M4.93 10.93l1.41 1.41M18.66 11.66l-1.41 1.41M2 18h2M20 18h2M5.6 5.6l1.41 1.41M18.66 5.6l-1.41 1.41" />
              </svg>
            </div>
            
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Streetlight Complaint Management System
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Help keep your community well-lit and safe. Report non-functioning streetlights, track repair status, and contribute to a better neighborhood infrastructure.
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
          
          <div className="mt-16 max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <FileText className="h-6 w-6 text-blue-800 dark:text-blue-200" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Report
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Submit detailed reports about non-functional streetlights with precise location information.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Activity className="h-6 w-6 text-amber-800 dark:text-amber-200" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Track
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Monitor the status of your reports in real-time as maintenance crews work to resolve the issues.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <Lightbulb className="h-6 w-6 text-green-800 dark:text-green-200" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Resolve
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Receive notifications when issues are resolved, ensuring safer and well-lit communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;