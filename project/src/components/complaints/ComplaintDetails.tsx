import React, { useState } from 'react';
import { Clock, MapPin, Edit } from 'lucide-react';
import { Complaint } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import { useAuth } from '../../contexts/AuthContext';
import { useComplaints } from '../../contexts/ComplaintContext';

interface ComplaintDetailsProps {
  complaint: Complaint;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({ complaint }) => {
  const { user } = useAuth();
  const { updateComplaintStatus } = useComplaints();
  
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(complaint.status);
  const [adminNotes, setAdminNotes] = useState(complaint.adminNotes || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleUpdateStatus = async () => {
    setError('');
    setIsUpdating(true);
    
    try {
      await updateComplaintStatus(complaint.id, status, adminNotes);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <StatusBadge status={complaint.status} className="text-sm px-3 py-1" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-3">
            Complaint #{complaint.id}
          </h2>
        </div>
        
        {user?.role === 'admin' && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            icon={<Edit size={16} />}
            onClick={() => setIsEditing(true)}
          >
            Update Status
          </Button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg my-4 text-sm">
          {error}
        </div>
      )}
      
      {isEditing && user?.role === 'admin' ? (
        <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Update Complaint Status
          </h3>
          
          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'rejected', label: 'Rejected' },
            ]}
            className="mb-3"
          />
          
          <TextArea
            label="Admin Notes"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add notes about the resolution process or explanation for status change"
          />
          
          <div className="flex justify-end gap-3 mt-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              loading={isUpdating}
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Location
              </h3>
              <div className="mt-2 flex items-start">
                <MapPin size={18} className="text-gray-400 dark:text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 dark:text-gray-100">
                    {complaint.location.address}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Coordinates: {complaint.location.coordinates.lat.toFixed(6)}, {complaint.location.coordinates.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Reported by
              </h3>
              <p className="mt-2 text-gray-900 dark:text-gray-100">
                {complaint.userName}
              </p>
              
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
                Timeline
              </h3>
              <div className="mt-2 flex items-center">
                <Clock size={18} className="text-gray-400 dark:text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Created: {formatDate(complaint.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Last Updated: {formatDate(complaint.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Description
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {complaint.description}
            </p>
          </div>
          
          {complaint.adminNotes && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Admin Notes
              </h3>
              <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-300 whitespace-pre-line">
                  {complaint.adminNotes}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ComplaintDetails;