import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP verification
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (loginMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
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

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      // In real app, send OTP here
    } else if (step === 2 && validateStep2()) {
      // Complete login and redirect to dashboard
      navigate('/dashboard');
    }
  };

  const handleResendOTP = () => {
    // In real app, resend OTP here
    alert('OTP resent to your email/phone');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
              </div>
              {stepNumber < 2 && (
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
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Sign In</h3>
              
              {/* Login Method Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === 'email'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === 'phone'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Phone
                </button>
              </div>

              {loginMethod === 'email' ? (
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
              ) : (
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
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Verify Your Account</h3>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  We've sent a verification code to:
                </p>
                <p className="font-medium text-gray-900">
                  {loginMethod === 'email' ? formData.email : formData.phone}
                </p>
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
              </div>

              <div className="text-center">
                <button
                  onClick={handleResendOTP}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8">
            <button
              onClick={handleNextStep}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {step === 1 ? 'Send Verification Code' : 'Sign In'}
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
                Create account
              </Link>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-gray-500 hover:text-gray-700 text-sm">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
