import React from 'react';
import ComplaintsList from '../components/complaints/ComplaintsList';
import { useComplaints } from '../contexts/ComplaintContext';

const ComplaintsPage: React.FC = () => {
  const { userComplaints } = useComplaints();

  return (
    <div className="container mx-auto px-4 py-8">
      <ComplaintsList
        complaints={userComplaints}
        title="My Complaints"
      />
    </div>
  );
};

export default ComplaintsPage;