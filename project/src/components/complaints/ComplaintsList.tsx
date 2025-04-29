import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Complaint } from '../../types';
import ComplaintCard from './ComplaintCard';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface ComplaintsListProps {
  complaints: Complaint[];
  title?: string;
  showUserInfo?: boolean;
}

const ComplaintsList: React.FC<ComplaintsListProps> = ({
  complaints,
  title = 'Complaints',
  showUserInfo = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredComplaints = complaints.filter((complaint) => {
    // Status filter
    if (statusFilter !== 'all' && complaint.status !== statusFilter) return false;
    
    // Search filter (check location and description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        complaint.location.address.toLowerCase().includes(query) ||
        complaint.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort by most recent first
  const sortedComplaints = [...filteredComplaints].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
          {filteredComplaints.length > 0 && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({filteredComplaints.length})
            </span>
          )}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0">
          <div className="w-full sm:w-48">
            <Select
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              icon={<Filter size={16} />}
            />
          </div>
          
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>
        </div>
      </div>
      
      {sortedComplaints.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-gray-700 dark:text-gray-300 mb-1">No complaints found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'Create a new complaint to get started'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              showUserInfo={showUserInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;