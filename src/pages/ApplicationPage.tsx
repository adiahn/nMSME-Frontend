import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Upload, FileText, Building, User, Mail, Phone, MapPin, Calendar, DollarSign, Users, Award, AlertCircle } from 'lucide-react';

const ApplicationPage: React.FC = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || 1;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    registrationNumber: '',
    yearEstablished: '',
    location: '',
    website: '',
    
    // Contact Information
    ownerName: '',
    position: '',
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Business Details
    category: selectedCategory,
    businessDescription: '',
    products_services: '',
    targetMarket: '',
    numberOfEmployees: '',
    annualRevenue: '',
    
    // Application Specific
    whyDeserveAward: '',
    achievements: '',
    challenges: '',
    futureGoals: '',
    
    // Documents
    businessLicense: null,
    taxClearance: null,
    financialStatements: null,
    supportingDocuments: null
  });

  const categories = [
    { id: 1, name: "Fashion Award" },
    { id: 2, name: "Information Technology (IT) Award" },
    { id: 3, name: "Agribusiness Award" },
    { id: 4, name: "Food & Beverage Award" },
    { id: 5, name: "Light Manufacturing Award" },
    { id: 6, name: "Creative Enterprise Award" },
    { id: 7, name: "Special Nano Category" },
    { id: 8, name: "Emerging Enterprise Award" }
  ];

  const steps = [
    { id: 1, title: "Business Information", icon: <Building className="h-5 w-5" /> },
    { id: 2, title: "Contact Details", icon: <User className="h-5 w-5" /> },
    { id: 3, title: "Business Profile", icon: <FileText className="h-5 w-5" /> },
    { id: 4, title: "Application Details", icon: <Award className="h-5 w-5" /> },
    { id: 5, title: "Documents Upload", icon: <Upload className="h-5 w-5" /> },
    { id: 6, title: "Review & Submit", icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Application submitted successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your business name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select business type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="limited-company">Limited Liability Company</option>
                  <option value="cooperative">Cooperative Society</option>
                  <option value="ngo">Non-Governmental Organization</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="CAC Registration Number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Established *
                </label>
                <input
                  type="number"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, Local Government Area"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://www.yourwebsite.com"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner/CEO Full Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position/Title *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="CEO, Managing Director, etc."
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="email@example.com"
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Profile</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Award Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Provide a detailed description of your business..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Products/Services Offered *
                </label>
                <textarea
                  name="products_services"
                  value={formData.products_services}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="List and describe your main products/services..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Market *
                </label>
                <textarea
                  name="targetMarket"
                  value={formData.targetMarket}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your target customers and market..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees *
                  </label>
                  <select
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select range</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Revenue Range *
                  </label>
                  <select
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select range</option>
                    <option value="under-1m">Under ₦1 Million</option>
                    <option value="1m-10m">₦1M - ₦10M</option>
                    <option value="10m-50m">₦10M - ₦50M</option>
                    <option value="50m-200m">₦50M - ₦200M</option>
                    <option value="200m+">₦200M+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you deserve this award? *
                </label>
                <textarea
                  name="whyDeserveAward"
                  value={formData.whyDeserveAward}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Explain why your business deserves this award, highlighting your unique value proposition..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements (Last 2-3 Years) *
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="List your major achievements, milestones, awards, recognitions..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major Challenges & How You Overcame Them *
                </label>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe significant challenges faced and your solutions..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Future Goals & Expansion Plans *
                </label>
                <textarea
                  name="futureGoals"
                  value={formData.futureGoals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Share your vision and plans for business growth..."
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Document Upload</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Document Requirements</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    Please ensure all documents are in PDF format and not larger than 5MB each.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Business License *</h4>
                <p className="text-sm text-gray-600 mb-4">Upload CAC certificate or business registration</p>
                <input
                  type="file"
                  name="businessLicense"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="businessLicense"
                />
                <label
                  htmlFor="businessLicense"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                >
                  Choose File
                </label>
                {formData.businessLicense && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {(formData.businessLicense as File).name}
                  </p>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Tax Clearance *</h4>
                <p className="text-sm text-gray-600 mb-4">Latest tax clearance certificate</p>
                <input
                  type="file"
                  name="taxClearance"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="taxClearance"
                />
                <label
                  htmlFor="taxClearance"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                >
                  Choose File
                </label>
                {formData.taxClearance && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {(formData.taxClearance as File).name}
                  </p>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Financial Statements *</h4>
                <p className="text-sm text-gray-600 mb-4">Last 2 years financial statements</p>
                <input
                  type="file"
                  name="financialStatements"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="financialStatements"
                />
                <label
                  htmlFor="financialStatements"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                >
                  Choose File
                </label>
                {formData.financialStatements && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {(formData.financialStatements as File).name}
                  </p>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Supporting Documents</h4>
                <p className="text-sm text-gray-600 mb-4">Awards, certificates, testimonials (Optional)</p>
                <input
                  type="file"
                  name="supportingDocuments"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  className="hidden"
                  id="supportingDocuments"
                />
                <label
                  htmlFor="supportingDocuments"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  Choose Files
                </label>
                {formData.supportingDocuments && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Files selected
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold text-green-800">Application Summary</h4>
                  <p className="text-green-700 text-sm mt-1">
                    Please review your information before submitting your application.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Business Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {formData.businessName}</p>
                  <p><span className="font-medium">Type:</span> {formData.businessType}</p>
                  <p><span className="font-medium">Registration:</span> {formData.registrationNumber}</p>
                  <p><span className="font-medium">Established:</span> {formData.yearEstablished}</p>
                  <p><span className="font-medium">Location:</span> {formData.location}</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Owner:</span> {formData.ownerName}</p>
                  <p><span className="font-medium">Position:</span> {formData.position}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Application Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Category:</span> {categories.find(c => c.id === parseInt(formData.category.toString()))?.name}</p>
                  <p><span className="font-medium">Employees:</span> {formData.numberOfEmployees}</p>
                  <p><span className="font-medium">Revenue:</span> {formData.annualRevenue}</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Documents Uploaded</h4>
                <div className="space-y-2 text-sm">
                  <p className={formData.businessLicense ? "text-green-600" : "text-red-600"}>
                    {formData.businessLicense ? "✓ Business License" : "✗ Business License (Required)"}
                  </p>
                  <p className={formData.taxClearance ? "text-green-600" : "text-red-600"}>
                    {formData.taxClearance ? "✓ Tax Clearance" : "✗ Tax Clearance (Required)"}
                  </p>
                  <p className={formData.financialStatements ? "text-green-600" : "text-red-600"}>
                    {formData.financialStatements ? "✓ Financial Statements" : "✗ Financial Statements (Required)"}
                  </p>
                  <p className={formData.supportingDocuments ? "text-green-600" : "text-gray-500"}>
                    {formData.supportingDocuments ? "✓ Supporting Documents" : "- Supporting Documents (Optional)"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Declaration</h4>
                  <label className="flex items-start mt-2">
                    <input type="checkbox" className="mr-2 mt-1" required />
                    <span className="text-yellow-700 text-sm">
                      I declare that all information provided in this application is true and accurate to the best of my knowledge. 
                      I understand that providing false information may result in disqualification.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply for nMSME Award</h1>
          <p className="text-lg text-gray-600">
            Complete your application to compete for prestigious business awards
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  currentStep === step.id
                    ? 'bg-green-600 text-white'
                    : currentStep > step.id
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {step.icon}
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.id}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center"
                >
                  Submit Application
                  <CheckCircle className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;