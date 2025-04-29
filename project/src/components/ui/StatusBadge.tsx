import React from 'react';
import { Complaint } from '../../types';

interface StatusBadgeProps {
  status: Complaint['status'];
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-500 dark:border-amber-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-500 dark:border-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-500 dark:border-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-500 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <span
      className={`
        px-2.5 py-0.5 rounded-full text-xs font-medium border
        inline-flex items-center
        ${getStatusStyles()}
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1 inline-block bg-current`}></span>
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;