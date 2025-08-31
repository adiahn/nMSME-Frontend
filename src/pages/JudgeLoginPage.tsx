import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useUser } from '../App';
import { authAPI } from '../services/api';

const JudgeLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorType, setErrorType] = useState<'error' | 'warning' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
      setErrorType(null);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setErrorType(null);

    try {
      console.log('🏛️ Starting judge login process...');
      
      // Call the judge login API
      const response = await authAPI.judgeLogin({
        email: formData.email,
        password: formData.password
      });

      console.log('🏛️ Judge login response:', response);
      console.log('🏛️ Response success:', response.success);
      console.log('🏛️ Response data:', response.data);

      // Handle both direct response format and wrapped response format
      let user, token;
      
      if (response.success && response.data) {
        // Standard API response format
        user = response.data.user;
        token = response.data.token;
      } else if (response.token && response.user) {
        // Direct response format
        user = response.user;
        token = response.token;
      } else if (response.data && response.data.token && response.data.user) {
        // Alternative nested format
        user = response.data.user;
        token = response.data.token;
      } else {
        console.log('🏛️ Unexpected response format:', response);
        throw new Error('Invalid response format from server');
      }

      console.log('🏛️ Extracted user:', user);
      console.log('🏛️ Extracted token:', token);

      if (user && token) {
        
        // Check if the user is actually a judge
        if (user.role !== 'judge') {
          throw new Error('Access denied. This login is for judges only. Please use the regular login if you are not a judge.');
        }
        
        // Prepare judge data for user context
        const judgeData = {
          fullName: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone,
          isAuthenticated: true,
          role: 'judge' as const
        };

        // Store user data in context
        setUserData(judgeData);
        
        // Store token and basic judge data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', 'judge');
        localStorage.setItem('judgeData', JSON.stringify(user));

        console.log('🏛️ Judge login successful, navigating to dashboard...');
        console.log('🏛️ Judge user data:', user);
        
        // Navigate to judge dashboard
        navigate('/judge/dashboard', { replace: true });
      } else {
        console.log('🏛️ Login failed - missing user or token');
        throw new Error('Login failed - missing user or token data');
      }
    } catch (error: any) {
      console.error('🏛️ Judge login error:', error);
      
      // Handle specific error cases based on API response
      let errorMessage = 'Login failed. Please try again.';
      
      // Check if we have a structured error response
      if (error.response && !error.response.success) {
        const errorResponse = error.response;
        
        if (error.status === 401) {
          // 401 Unauthorized - Invalid credentials
          errorMessage = errorResponse.message || 'Invalid email or password. Please check your credentials.';
          setErrorType('error');
          console.log('🏛️ 401 Error - Invalid credentials:', errorResponse);
        } else if (error.status === 403) {
          // 403 Forbidden - Account not approved
          if (errorResponse.data && errorResponse.data.approval_status === 'pending') {
            const { estimated_approval_time, contact_support } = errorResponse.data;
            errorMessage = `${errorResponse.message}. Estimated approval time: ${estimated_approval_time}. For questions, contact: ${contact_support}`;
            setErrorType('warning');
            console.log('🏛️ 403 Error - Account pending approval:', errorResponse.data);
          } else {
            errorMessage = errorResponse.message || 'Access denied. Your judge account may be inactive.';
            setErrorType('error');
            console.log('🏛️ 403 Error - Access denied:', errorResponse);
          }
        } else if (error.status === 404) {
          errorMessage = 'Judge account not found. Please check your email address.';
          setErrorType('error');
        } else if (errorResponse.message) {
          errorMessage = errorResponse.message;
          setErrorType('error');
        } else if (errorResponse.error) {
          errorMessage = errorResponse.error;
          setErrorType('error');
        }
      } else {
        // Fallback error handling for non-structured responses
        setErrorType('error'); // Default to error type for fallback cases
        
        if (error.message?.includes('Invalid credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (error.message?.includes('Account not approved')) {
          errorMessage = 'Your judge account is pending approval. Please contact the administrator.';
          setErrorType('warning');
        } else if (error.message?.includes('Account disabled')) {
          errorMessage = 'Your judge account has been disabled. Please contact the administrator.';
        } else if (error.status === 404) {
          errorMessage = 'Judge account not found. Please check your email address.';
        } else if (error.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.status === 403) {
          errorMessage = 'Access denied. Your judge account may be inactive.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later or contact support.';
        } else if (error.message) {
          errorMessage = error.message;
        } else if (!navigator.onLine) {
          errorMessage = 'No internet connection. Please check your network and try again.';
        }
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/src/img/logo.png" 
              alt="nMSME Awards Logo" 
              className="h-24 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Judge Login</h2>
          <p className="mt-2 text-gray-600">Access the nMSME Awards Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className={`rounded-lg p-4 ${
                errorType === 'warning' 
                  ? 'bg-yellow-50 border border-yellow-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {errorType === 'warning' ? (
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${
                      errorType === 'warning' ? 'text-yellow-800' : 'text-red-800'
                    }`}>
                      {errorType === 'warning' ? 'Account Pending Approval' : 'Authentication Error'}
                    </h3>
                    <div className={`mt-1 text-sm ${
                      errorType === 'warning' ? 'text-yellow-700' : 'text-red-700'
                    }`}>
                      <p className="leading-relaxed">{errors.general}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Not a judge?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Go to regular login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeLoginPage;

