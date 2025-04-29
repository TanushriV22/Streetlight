import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintForm from '../components/complaints/ComplaintForm';

const SubmitComplaintPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/complaints');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Report a Streetlight Issue
      </h1>
      
      {isSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-300 mb-6">
          <h2 className="text-lg font-semibold">Complaint Submitted Successfully!</h2>
          <p className="mt-1">Thank you for your report. You're being redirected to your complaints list...</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please provide details about the non-functional streetlight to help our maintenance team locate and fix the issue promptly.
          </p>
          
          <ComplaintForm onSuccess={handleSuccess} />
        </>
      )}
    </div>
  );
};

export default SubmitComplaintPage;