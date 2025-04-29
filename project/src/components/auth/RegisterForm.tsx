import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6"
          >
            <path d="M12 2v8M12 18v4M4.93 10.93l1.41 1.41M18.66 11.66l-1.41 1.41M2 18h2M20 18h2M5.6 5.6l1.41 1.41M18.66 5.6l-1.41 1.41" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Sign up to start reporting streetlight issues</p>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          icon={<User size={18} />}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          icon={<Mail size={18} />}
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          icon={<Lock size={18} />}
          required
        />
        
        <div className="flex items-center mb-6">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Create Account
        </Button>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;