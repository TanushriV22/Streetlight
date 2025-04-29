import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ComplaintDetails from '../components/complaints/ComplaintDetails';
import { useComplaints } from '../contexts/ComplaintContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const ComplaintDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { complaints } = useComplaints();
  const { user } = useAuth();
  
  const complaint = complaints.find((c) => c.id === id);
  
  // Check if the user has permission to view this complaint
  const canViewComplaint = 
    complaint && 
    (user?.role === 'admin' || complaint.userId === user?.id);
  
  if (!complaint) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Complaint Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The complaint you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate(-1)}
            icon={<ArrowLeft size={16} />}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  if (!canViewComplaint) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You don't have permission to view this complaint.
          </p>
          <Button
            onClick={() => navigate(-1)}
            icon={<ArrowLeft size={16} />}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
      
      <ComplaintDetails complaint={complaint} />
    </div>
  );
};

export default ComplaintDetailPage;