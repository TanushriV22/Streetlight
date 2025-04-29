import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Complaint } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { Link } from 'react-router-dom';

interface ComplaintCardProps {
  complaint: Complaint;
  showUserInfo?: boolean;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  showUserInfo = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <Link 
      to={`/complaints/${complaint.id}`} 
      className="block"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between">
          <div>
            <div className="flex items-start gap-2">
              <StatusBadge status={complaint.status} />
              {showUserInfo && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Reported by {complaint.userName}
                </span>
              )}
            </div>
            <h3 className="mt-2 font-medium text-gray-900 dark:text-white truncate">
              {complaint.location.address}
            </h3>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <MapPin size={14} className="mr-1" />
              <span className="truncate max-w-[120px]">
                {complaint.location.coordinates.lat.toFixed(4)}, {complaint.location.coordinates.lng.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
        
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {complaint.description}
        </p>
        
        {complaint.adminNotes && (
          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs text-blue-800 dark:text-blue-300">
            <p className="font-semibold">Admin Notes:</p>
            <p>{complaint.adminNotes}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>Reported {formatDate(complaint.createdAt)}</span>
          </div>
          <div>
            Updated {getTimeAgo(complaint.updatedAt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ComplaintCard;