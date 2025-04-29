import React from 'react';
import ComplaintsList from '../../components/complaints/ComplaintsList';
import { useComplaints } from '../../contexts/ComplaintContext';

const AdminComplaintsPage: React.FC = () => {
  const { complaints } = useComplaints();

  // Get counts by status
  const statusCounts = {
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    rejected: complaints.filter(c => c.status === 'rejected').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Complaint Administration
      </h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{statusCounts.pending}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{statusCounts.inProgress}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500 dark:text-gray-400">Resolved</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{statusCounts.resolved}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{statusCounts.rejected}</p>
        </div>
      </div>
      
      <ComplaintsList
        complaints={complaints}
        title="All Complaints"
        showUserInfo={true}
      />
    </div>
  );
};

export default AdminComplaintsPage;