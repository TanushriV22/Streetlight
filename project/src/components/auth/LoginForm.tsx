import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'user') => {
    setIsLoading(true);
    try {
      if (role === 'admin') {
        await login({ email: 'admin@example.com', password: 'admin123' });
      } else {
        await login({ email: 'user@example.com', password: 'user123' });
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo login failed.');
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to your account</p>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
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
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Forgot password?
          </a>
        </div>
        
        <Button
          type="submit"
          className="w-full mb-4"
          loading={isLoading}
        >
          Sign In
        </Button>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with demo accounts
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('user')}
              disabled={isLoading}
            >
              User Demo
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
            >
              Admin Demo
            </Button>
          </div>
        </div>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;