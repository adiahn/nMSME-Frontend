import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  User, 
  LogOut, 
  File, 
  Clock, 
  CheckCircle, 
  Award, 
  X,
  Bell,
  Mail,
  Phone,
  Building,
  MapPin,
  Upload,
  Save,
  ChevronRight,
  ChevronLeft,
  Menu,
  X as XIcon
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [applicationStep, setApplicationStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile

  // Mock data
  const user = {
    name: 'Amina Hassan',
    company: 'TechHub Solutions',
    email: 'amina@techhub.com'
  };

  const stats = [
    { title: 'Total Applications', value: '3', icon: File, color: 'blue' },
    { title: 'Under Review', value: '1', icon: Clock, color: 'yellow' },
    { title: 'Approved', value: '1', icon: CheckCircle, color: 'green' },
    { title: 'Average Score', value: '74', icon: Award, color: 'purple' }
  ];

  const applications = [
    {
      id: 1,
      category: 'Information Technology (IT) Award',
      status: 'Under Review',
      submittedDate: '2024-10-15',
      icon: Clock,
      color: 'yellow'
    },
    {
      id: 2,
      category: 'Light Manufacturing Award',
      status: 'Approved',
      submittedDate: '2024-09-20',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 3,
      category: 'Emerging Enterprise Award',
      status: 'Rejected',
      submittedDate: '2024-08-15',
      icon: X,
      color: 'red'
    }
  ];

  const categories = [
    'Fashion Award',
    'Information Technology (IT) Award',
    'Agribusiness Award',
    'Food & Beverage Award',
    'Light Manufacturing Award',
    'Creative Enterprise Award',
    'Special Nano Category',
    'Emerging Enterprise Award'
  ];

  const [applicationForm, setApplicationForm] = useState({
    // Stage 1: Registration & Profile Setup
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    ageBand: '',
    businessName: '',
    cacNumber: '',
    sector: '',
    msmeCategory: '',
    state: '',
    lga: '',
    startYear: '',
    employeeCount: '',
    revenueBand: '',
    
    // Stage 2: Application Form - Section A: Business Overview
    businessDescription: '',
    keyAchievements: '',
    productsServices: '',
    marketReach: '',
    
    // Stage 2: Application Form - Section B: Evidence Uploads
    cacDocument: null as File | null,
    taxIdNumber: '',
    productPhotos: [] as File[],
    website: '',
    socialMediaLinks: '',
    
    // Stage 2: Application Form - Section C: Pitch Video
    pitchVideo: null as File | null,
    videoLink: '',
    
    // Stage 2: Application Form - Section D: Impact & Plans
    jobsCreated: '',
    womenYouthPercentage: '',
    sustainabilityInitiatives: '',
    exportActivity: '',
    awardFundsUsage: ''
  });

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setApplicationForm(prev => ({
        ...prev,
        [field]: field === 'productPhotos' ? [...prev.productPhotos, ...files] : files[0]
      }));
    }
  };

  const removeFile = (field: string, index?: number) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: field === 'productPhotos' 
        ? prev.productPhotos.filter((_, i) => i !== index)
        : null
    }));
  };

  const handleSubmitApplication = () => {
    // Handle application submission
    console.log('Submitting application:', applicationForm);
    alert('Application submitted successfully!');
  };

  const nextStep = () => {
    if (applicationStep < 7) {
      setApplicationStep(applicationStep + 1);
    }
  };

  const prevStep = () => {
    if (applicationStep > 1) {
      setApplicationStep(applicationStep - 1);
    }
  };

  const renderHomeContent = () => {
    // Mock application timeline status
    const applicationStatus = {
      isOpen: true, // Set to false when applications are closed
      isUnderReview: false, // Set to true when judges start reviewing
      isResultsAnnounced: false, // Set to true when winners are announced
      deadline: '2025-01-31',
      reviewStartDate: '2025-02-01',
      resultsDate: '2025-03-15'
    };

    const getStatusMessage = () => {
      if (!applicationStatus.isOpen) {
        return {
          title: 'Applications Closed',
          message: 'The application period has ended. Thank you for your interest in the nMSME Awards.',
          color: 'bg-red-50 border-red-200 text-red-800',
          icon: '🔒'
        };
      } else if (applicationStatus.isUnderReview) {
        return {
          title: 'Applications Under Review',
          message: 'Your applications are currently being reviewed by our panel of judges. Results will be announced soon.',
          color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: '👨‍⚖️'
        };
      } else if (applicationStatus.isResultsAnnounced) {
        return {
          title: 'Results Announced',
          message: 'The winners have been announced! Check the results page to see if you won.',
          color: 'bg-green-50 border-green-200 text-green-800',
          icon: '🏆'
        };
      } else {
        return {
          title: 'Applications Open',
          message: 'Applications are currently open. Submit your application before the deadline.',
          color: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: '📝'
        };
      }
    };

    const status = getStatusMessage();

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Welcome Banner */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Welcome back, {user.name}</h1>
          <p className="text-gray-600">Track your applications and stay updated on your award journey.</p>
        </div>

        {/* Application Status */}
        <div className={`border rounded-lg p-4 sm:p-6 ${status.color}`}>
          <h2 className="text-lg font-semibold mb-1">{status.title}</h2>
          <p className="text-sm">{status.message}</p>
        </div>

        {/* Timeline Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Application Deadline</p>
                <p className="text-xs text-gray-600">Submit your application</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{applicationStatus.deadline}</p>
                <p className={`text-xs ${new Date(applicationStatus.deadline) < new Date() ? 'text-red-600' : 'text-green-600'}`}>
                  {new Date(applicationStatus.deadline) < new Date() ? 'Closed' : 'Open'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Review Period</p>
                <p className="text-xs text-gray-600">Judges review applications</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{applicationStatus.reviewStartDate}</p>
                <p className={`text-xs ${applicationStatus.isUnderReview ? 'text-yellow-600' : 'text-gray-600'}`}>
                  {applicationStatus.isUnderReview ? 'In Progress' : 'Pending'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Results Announcement</p>
                <p className="text-xs text-gray-600">Winners announced</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{applicationStatus.resultsDate}</p>
                <p className={`text-xs ${applicationStatus.isResultsAnnounced ? 'text-green-600' : 'text-gray-600'}`}>
                  {applicationStatus.isResultsAnnounced ? 'Announced' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  };

  const renderApplicationsContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Indicator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-2 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Submit New Application</h1>
          <div className="text-sm text-gray-600">Step {applicationStep} of 7</div>
        </div>
        
        {/* Progress Container */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress Container */}
            <div className="bg-gray-100 rounded-xl p-1 h-3 sm:h-4 relative overflow-hidden">
              {/* Filling Animation */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700 ease-out"
                style={{ 
                  width: `${(applicationStep / 7) * 100}%`,
                  borderRadius: '0.75rem'
                }}
              />
            </div>
            
            {/* Progress Info */}
            <div className="flex justify-end mt-4 text-sm text-gray-600">
              <span className="font-medium">{Math.round((applicationStep / 7) * 100)}% Complete</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Step 1: Personal Information */}
          {applicationStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={applicationForm.firstName}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={applicationForm.lastName}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender (Optional)
                </label>
                <select
                  name="gender"
                  value={applicationForm.gender}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Band (Optional)
                </label>
                <select
                  name="ageBand"
                  value={applicationForm.ageBand}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select age band</option>
                  <option value="18-25">18-25 years</option>
                  <option value="26-35">26-35 years</option>
                  <option value="36-45">36-45 years</option>
                  <option value="46-55">46-55 years</option>
                  <option value="55+">55+ years</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {applicationStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={applicationForm.businessName}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter business name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAC Registration Number *
                </label>
                <input
                  type="text"
                  name="cacNumber"
                  value={applicationForm.cacNumber}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter CAC number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector *
                </label>
                <select
                  name="sector"
                  value={applicationForm.sector}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select sector</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MSME Category *
                </label>
                <select
                  name="msmeCategory"
                  value={applicationForm.msmeCategory}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select MSME category</option>
                  <option value="nano">Nano (1-2 Staff or Sales &lt; N100,000/month)</option>
                  <option value="micro">Micro (3-9 Staff or Assets N500,000 - N2.5m)</option>
                  <option value="small">Small (10-50 Staff or Assets N2.5m - N50m)</option>
                  <option value="medium">Medium (51-199 Staff or Assets N50m - N500m)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={applicationForm.state}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter state"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LGA *
                </label>
                <input
                  type="text"
                  name="lga"
                  value={applicationForm.lga}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter LGA"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Established *
                </label>
                <input
                  type="number"
                  name="startYear"
                  value={applicationForm.startYear}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 2020"
                  min="1900"
                  max="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees *
                </label>
                <input
                  type="number"
                  name="employeeCount"
                  value={applicationForm.employeeCount}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter number of employees"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Band *
                </label>
                <select
                  name="revenueBand"
                  value={applicationForm.revenueBand}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select revenue band</option>
                  <option value="under-100k">Under N100,000/month</option>
                  <option value="100k-500k">N100,000 - N500,000/month</option>
                  <option value="500k-1m">N500,000 - N1,000,000/month</option>
                  <option value="1m-5m">N1,000,000 - N5,000,000/month</option>
                  <option value="5m-10m">N5,000,000 - N10,000,000/month</option>
                  <option value="10m+">Above N10,000,000/month</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Business Overview */}
          {applicationStep === 3 && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description * (Max 500 words)
                </label>
                <textarea
                  name="businessDescription"
                  value={applicationForm.businessDescription}
                  onChange={handleFormChange}
                  rows={6}
                  maxLength={2500}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your business, products/services, and market position..."
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {applicationForm.businessDescription.length}/2500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements * (Max 300 words)
                </label>
                <textarea
                  name="keyAchievements"
                  value={applicationForm.keyAchievements}
                  onChange={handleFormChange}
                  rows={4}
                  maxLength={1500}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Highlight your major accomplishments, awards, and milestones..."
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {applicationForm.keyAchievements.length}/1500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Products/Services Description
                </label>
                <textarea
                  name="productsServices"
                  value={applicationForm.productsServices}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your main products or services..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Market Reach
                </label>
                <select
                  name="marketReach"
                  value={applicationForm.marketReach}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select market reach</option>
                  <option value="local">Local</option>
                  <option value="regional">Regional</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Evidence Uploads */}
          {applicationStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAC Registration Document * (PDF/JPEG)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                  <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                  <p className="text-sm sm:text-lg text-gray-600 mb-1 sm:mb-2">
                    Upload your CAC registration document
                  </p>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'cacDocument')}
                    className="hidden"
                    id="cac-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="cac-upload"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    Choose File
                  </label>
                </div>
                {applicationForm.cacDocument && (
                  <div className="mt-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-700">✓ {applicationForm.cacDocument.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Identification Number (Optional)
                </label>
                <input
                  type="text"
                  name="taxIdNumber"
                  value={applicationForm.taxIdNumber}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter TIN if available"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product/Service Photos (3-5 photos)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                  <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                  <p className="text-sm sm:text-lg text-gray-600 mb-1 sm:mb-2">
                    Upload product or service photos
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'productPhotos')}
                    className="hidden"
                    id="photos-upload"
                    accept=".jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="photos-upload"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    Choose Files
                  </label>
                </div>
                {applicationForm.productPhotos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos:</p>
                    <div className="space-y-2">
                      {applicationForm.productPhotos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('productPhotos', index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={applicationForm.website}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Media Links (Optional)
                </label>
                <textarea
                  name="socialMediaLinks"
                  value={applicationForm.socialMediaLinks}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your social media links (Facebook, Instagram, LinkedIn, etc.)"
                />
              </div>
            </div>
          )}

          {/* Step 5: Pitch Video */}
          {applicationStep === 5 && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pitch Video * (2-3 minutes, Max 200MB)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                  <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                  <p className="text-sm sm:text-lg text-gray-600 mb-1 sm:mb-2">
                    Upload your pitch video or provide a link
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    MP4/AVI/MOV format, max 200MB, OR YouTube/Vimeo link
                  </p>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'pitchVideo')}
                    className="hidden"
                    id="video-upload"
                    accept=".mp4,.avi,.mov"
                  />
                  <label
                    htmlFor="video-upload"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm sm:text-base mr-2"
                  >
                    Upload Video
                  </label>
                </div>
                {applicationForm.pitchVideo && (
                  <div className="mt-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-700">✓ {applicationForm.pitchVideo.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OR Video Link (YouTube/Vimeo)
                </label>
                <input
                  type="url"
                  name="videoLink"
                  value={applicationForm.videoLink}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
          )}

          {/* Step 6: Impact & Plans */}
          {applicationStep === 6 && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jobs Created to Date *
                </label>
                <input
                  type="number"
                  name="jobsCreated"
                  value={applicationForm.jobsCreated}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter number of jobs created"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % of Women/Youth in Workforce
                </label>
                <input
                  type="number"
                  name="womenYouthPercentage"
                  value={applicationForm.womenYouthPercentage}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter percentage (0-100)"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sustainability Initiatives
                </label>
                <textarea
                  name="sustainabilityInitiatives"
                  value={applicationForm.sustainabilityInitiatives}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe any sustainability or green initiatives..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Activity
                </label>
                <textarea
                  name="exportActivity"
                  value={applicationForm.exportActivity}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your export activities if any..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How Will You Use Award Funds? *
                </label>
                <textarea
                  name="awardFundsUsage"
                  value={applicationForm.awardFundsUsage}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Explain how you plan to use the award funds to grow your business..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {applicationStep === 7 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Review Your Application</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Please review all the information you've provided before submitting your application.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Personal Information:</span>
                    <span className="text-sm text-blue-700">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Business Information:</span>
                    <span className="text-sm text-blue-700">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Business Overview:</span>
                    <span className="text-sm text-blue-700">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Documents:</span>
                    <span className="text-sm text-blue-700">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Pitch Video:</span>
                    <span className="text-sm text-blue-700">✓ Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Impact & Plans:</span>
                    <span className="text-sm text-blue-700">✓ Complete</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between pt-4 sm:pt-6 space-y-3 sm:space-y-0">
            <button
              type="button"
              onClick={prevStep}
              disabled={applicationStep === 1}
              className={`flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors ${
                applicationStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Save Draft
              </button>
              
              {applicationStep === 4 ? (
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Save className="h-4 w-4" />
                  <span>Submit Application</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } transition-transform duration-300 ease-in-out lg:transition-none`}>
        <div className={`${sidebarOpen ? 'w-72' : 'w-16'} bg-white shadow-lg h-full flex flex-col`}>
          {/* User Profile Header */}
          <div className={`${sidebarOpen ? 'p-6' : 'p-4'} border-b border-gray-200`}>
            <div className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-green-600" />
              </div>
              {sidebarOpen && (
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h1>
                  <p className="text-xs text-gray-600 truncate">{user.company}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${sidebarOpen ? 'p-4' : 'p-2'} space-y-1`}>
            <button
              onClick={() => {
                setActiveTab('home');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-3' : 'justify-center px-2'} py-2.5 rounded-lg transition-colors ${
                activeTab === 'home'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Home</span>}
            </button>
            
            <button
              onClick={() => {
                setActiveTab('applications');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-3' : 'justify-center px-2'} py-2.5 rounded-lg transition-colors ${
                activeTab === 'applications'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Applications</span>}
            </button>
          </nav>

          {/* Bottom Actions */}
          <div className={`${sidebarOpen ? 'p-4' : 'p-2'} border-t border-gray-200 space-y-1`}>
            <button className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-3' : 'justify-center px-2'} py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors`}>
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-16'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                {activeTab === 'home' ? 'Dashboard' : 'Applications'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 pt-0">
          {activeTab === 'home' && renderHomeContent()}
          {activeTab === 'applications' && renderApplicationsContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;