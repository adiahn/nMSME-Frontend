import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { useUser } from '../App';
import { authAPI } from '../services/api';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [step, setStep] = useState(1); // 1: Basic info, 2: OTP verification, 3: Password setup
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>(''); // Add this to store user_id
  const [successMessage, setSuccessMessage] = useState<string>(''); // Add success message state
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    otp: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (step === 1 && validateStep1()) {
      setIsLoading(true);
      setSuccessMessage(''); // Clear any previous messages
      try {
        // Split full name into first and last name
        const nameParts = formData.fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        const response = await authAPI.registerStep1({
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone
        });

        if (response.success && response.data?.user_id) {
          setUserId(response.data.user_id); // Store user_id for next steps
          setStep(2);
        } else {
          setErrors({ email: response.message || 'Failed to send OTP' });
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        
        // Handle backend validation errors
        if (error.message && error.message.includes('Validation failed')) {
          // Parse validation errors from backend
          const validationErrors: { [key: string]: string } = {};
          
          // Map backend field names to frontend field names
          if (error.message.includes('first_name') || error.message.includes('last_name')) {
            validationErrors.fullName = 'Please enter a valid full name (2-50 characters)';
          }
          if (error.message.includes('email')) {
            validationErrors.email = 'Please enter a valid email address';
          }
          if (error.message.includes('phone')) {
            validationErrors.phone = 'Please enter a valid Nigerian phone number';
          }
          if (error.message.includes('User already exists')) {
            validationErrors.email = 'An account with this email or phone already exists';
          }
          
          setErrors(validationErrors);
        } else {
          // Generic error
          setErrors({ email: error.message || 'Failed to send OTP. Please try again.' });
        }
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2 && validateStep2()) {
      setIsLoading(true);
      setSuccessMessage(''); // Clear any previous messages
      try {
        const response = await authAPI.registerStep2({
          user_id: userId, // Use stored user_id
          otp: formData.otp
        });

        if (response.success && response.data?.user_id) {
          // OTP verified successfully - show success message and move to next step
          setSuccessMessage('OTP verified successfully');
          setErrors({}); // Clear any existing errors
          setTimeout(() => {
            setStep(3);
            setSuccessMessage(''); // Clear success message when moving to next step
          }, 1500); // Wait 1.5 seconds to show success message
        } else {
          setErrors({ otp: response.message || 'Invalid OTP' });
        }
      } catch (error: any) {
        console.error('OTP verification error:', error);
        
        // Handle specific OTP errors
        if (error.message.includes('expired')) {
          setErrors({ otp: 'OTP has expired. Please request a new one.' });
        } else if (error.message.includes('Invalid OTP')) {
          setErrors({ otp: 'Invalid OTP code. Please check and try again.' });
        } else {
          setErrors({ otp: error.message || 'Invalid OTP. Please try again.' });
        }
      } finally {
        setIsLoading(false);
      }
    } else if (step === 3 && validateStep3()) {
      setIsLoading(true);
      setSuccessMessage(''); // Clear any previous messages
      try {
        const response = await authAPI.registerStep3({
          user_id: userId, // Use stored user_id
          password: formData.password
        });

        if (response.success && response.data?.token && response.data?.user) {
          // Save user data to global context and localStorage
          setUserData({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            isAuthenticated: true
          });

          // Save token to localStorage
          localStorage.setItem('token', response.data.token);
          
          navigate('/dashboard');
        } else {
          setErrors({ password: response.message || 'Registration failed' });
        }
      } catch (error: any) {
        console.error('Registration completion error:', error);
        
        // Handle password validation errors
        if (error.message.includes('Password must be at least 6 characters')) {
          setErrors({ password: 'Password must be at least 6 characters long' });
        } else {
          setErrors({ password: error.message || 'Registration failed. Please try again.' });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await authAPI.registerStep1({
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone
      });

      if (response.success && response.data?.user_id) {
        setUserId(response.data.user_id); // Update user_id if resending
        alert('OTP resent to your email/phone');
      } else {
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join the awards program and showcase your business</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+234 xxx xxx xxxx"
                  />
                  <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <div>
                  <label className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Verify Your Account</h3>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  We've sent a verification code to:
                </p>
                <p className="font-medium text-gray-900">{formData.email}</p>
                <p className="font-medium text-gray-900">{formData.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 6-digit OTP *
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  maxLength={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl font-mono ${
                    errors.otp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="000000"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
                {successMessage && (
                  <p className="text-green-600 text-sm mt-1 font-medium">{successMessage}</p>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : "Didn't receive code? Resend"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Set Your Password</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8">
            <button
              onClick={handleNextStep}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {step === 1 ? 'Sending OTP...' : step === 2 ? 'Verifying...' : 'Creating Account...'}
                </div>
              ) : (
                step === 1 ? 'Send Verification Code' : step === 2 ? 'Verify Code' : 'Create Account'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
