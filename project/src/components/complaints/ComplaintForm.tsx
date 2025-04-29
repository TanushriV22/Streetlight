import React, { useState } from 'react';
import { MapPin, FileText } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { useComplaints } from '../../contexts/ComplaintContext';
import { ComplaintFormData } from '../../types';

interface ComplaintFormProps {
  onSuccess?: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSuccess }) => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Mock coordinates - In a real app, we'd use a map picker or geolocation
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  
  const { addComplaint } = useComplaints();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const complaintData: ComplaintFormData = {
        location: {
          address,
          coordinates,
        },
        description,
      };
      
      await addComplaint(complaintData);
      setAddress('');
      setDescription('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate updating coordinates when address changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    
    // Just a mock function - would use geocoding API in real implementation
    if (value.length > 5) {
      setCoordinates({
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.0060 + (Math.random() - 0.5) * 0.01,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Report a Streetlight Issue</h2>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Location Address"
          placeholder="Enter the street address of the faulty streetlight"
          value={address}
          onChange={handleAddressChange}
          icon={<MapPin size={18} />}
          required
        />
        
        <div className="mb-4">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <MapPin className="mx-auto mb-2" size={24} />
              <p className="text-sm">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
              <p className="text-xs mt-1">
                Map would display here in the fully implemented version
              </p>
            </div>
          </div>
        </div>
        
        <TextArea
          label="Description of Issue"
          placeholder="Please describe the problem with the streetlight in detail (flickering, completely out, damaged pole, etc.)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          icon={<FileText size={18} />}
          required
        />
        
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            loading={isSubmitting}
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;