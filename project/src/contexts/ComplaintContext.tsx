import React, { createContext, useContext, useState } from 'react';
import { Complaint, ComplaintFormData } from '../types';
import { useAuth } from './AuthContext';

// Mock initial data for the application
const initialComplaints: Complaint[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Regular User',
    location: {
      address: '123 Main St, Anytown',
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    description: 'Streetlight flickering and going out at night',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Regular User',
    location: {
      address: '456 Elm St, Springfield',
      coordinates: { lat: 40.7135, lng: -74.0043 },
    },
    description: 'Streetlight completely out for the past week',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    adminNotes: 'Technician scheduled for tomorrow',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Jane Smith',
    location: {
      address: '789 Oak Rd, Riverdale',
      coordinates: { lat: 40.7109, lng: -74.0021 },
    },
    description: 'Three consecutive streetlights out on highway exit',
    status: 'resolved',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
    adminNotes: 'All lights repaired and functioning properly',
  },
];

interface ComplaintContextType {
  complaints: Complaint[];
  userComplaints: Complaint[];
  addComplaint: (complaint: ComplaintFormData) => Promise<void>;
  updateComplaintStatus: (
    id: string,
    status: Complaint['status'],
    adminNotes?: string
  ) => Promise<void>;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const { user } = useAuth();

  const userComplaints = user
    ? complaints.filter((complaint) => complaint.userId === user.id)
    : [];

  const addComplaint = async (complaintData: ComplaintFormData) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!user) throw new Error('User not authenticated');

    const newComplaint: Complaint = {
      id: (complaints.length + 1).toString(),
      userId: user.id,
      userName: user.name,
      location: complaintData.location,
      description: complaintData.description,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setComplaints((prev) => [...prev, newComplaint]);
  };

  const updateComplaintStatus = async (
    id: string,
    status: Complaint['status'],
    adminNotes?: string
  ) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized to update complaint status');
    }

    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              status,
              updatedAt: new Date().toISOString(),
              adminNotes: adminNotes || complaint.adminNotes,
            }
          : complaint
      )
    );
  };

  return (
    <ComplaintContext.Provider
      value={{ complaints, userComplaints, addComplaint, updateComplaintStatus }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};