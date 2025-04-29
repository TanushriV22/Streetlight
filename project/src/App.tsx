import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ComplaintProvider } from './contexts/ComplaintContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ComplaintsPage from './pages/ComplaintsPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import SubmitComplaintPage from './pages/SubmitComplaintPage';
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requireAdmin?: boolean;
}> = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected User Routes */}
        <Route path="complaints" element={
          <ProtectedRoute>
            <ComplaintsPage />
          </ProtectedRoute>
        } />
        <Route path="complaints/:id" element={
          <ProtectedRoute>
            <ComplaintDetailPage />
          </ProtectedRoute>
        } />
        <Route path="complaints/new" element={
          <ProtectedRoute>
            <SubmitComplaintPage />
          </ProtectedRoute>
        } />
        
        {/* Protected Admin Routes */}
        <Route path="admin/complaints" element={
          <ProtectedRoute requireAdmin>
            <AdminComplaintsPage />
          </ProtectedRoute>
        } />
        <Route path="admin/users" element={
          <ProtectedRoute requireAdmin>
            <AdminUsersPage />
          </ProtectedRoute>
        } />
        <Route path="admin/settings" element={
          <ProtectedRoute requireAdmin>
            <AdminSettingsPage />
          </ProtectedRoute>
        } />
        
        {/* 404 - Catch All */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The page you're looking for doesn't exist or has been moved.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
            >
              Go Home
            </button>
          </div>
        } />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ComplaintProvider>
            <AppRoutes />
          </ComplaintProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;