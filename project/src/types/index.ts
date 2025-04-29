export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type Complaint = {
  id: string;
  userId: string;
  userName: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type ComplaintFormData = {
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
};