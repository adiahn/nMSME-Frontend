import React, { useState, useEffect } from 'react';
import { CheckCircle, Upload, FileText, Building, User, Mail, Phone, MapPin, Calendar, DollarSign, Users, Award, AlertCircle, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useUser } from '../App';
import { categoriesAPI, applicationsAPI, documentsAPI } from '../services/api';
import type { Category, Application } from '../services/api';

interface ApplicationFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onComplete, onCancel }) => {
  const { userData } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    category: '',
    businessName: '',
    businessType: '',
    registrationNumber: '',
    yearEstablished: '',
    location: '',
    website: '',
    ownerName: '',
    position: '',
    email: '',
    phone: '',
    alternatePhone: '',
    businessDescription: '',
    products_services: '',
    targetMarket: '',
    numberOfEmployees: '',
    annualRevenue: '',
    whyDeserveAward: '',
    achievements: '',
    challenges: '',
    futureGoals: '',
    businessLicense: null as File | null,
    taxClearance: null as File | null,
    financialStatements: null as File | null,
    supportingDocuments: null as File | null
  });

  // Load categories and pre-fill user data
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategories([
          { id: 'fashion', name: 'Fashion Award', description: 'Fashion and textile businesses' },
          { id: 'it', name: 'Information Technology (IT) Award', description: 'Technology and software businesses' },
          { id: 'agribusiness', name: 'Agribusiness Award', description: 'Agricultural and farming businesses' },
          { id: 'food_beverage', name: 'Food & Beverage Award', description: 'Food and beverage businesses' },
          { id: 'light_manufacturing', name: 'Light Manufacturing Award', description: 'Light manufacturing businesses' },
          { id: 'creative_enterprise', name: 'Creative Enterprise Award', description: 'Creative and arts businesses' },
          { id: 'nano_category', name: 'Special Nano Category', description: 'Special category for nano businesses' },
          { id: 'emerging_enterprise', name: 'Emerging Enterprise Award', description: 'Emerging and innovative businesses' }
        ]);
      }
    };

    loadCategories();
    
    // Pre-fill contact information
    if (userData.isAuthenticated) {
      setFormData(prev => ({
        ...prev,
        ownerName: userData.fullName,
        email: userData.email,
        phone: userData.phone
      }));
    }
  }, [userData]);

  const steps = [
    { id: 1, title: "Select Category", icon: <Award className="h-5 w-5" /> },
    { id: 2, title: "Business Information", icon: <Building className="h-5 w-5" /> },
    { id: 3, title: "Contact Details", icon: <User className="h-5 w-5" /> },
    { id: 4, title: "Business Profile", icon: <FileText className="h-5 w-5" /> },
    { id: 5, title: "Application Details", icon: <Award className="h-5 w-5" /> },
    { id: 6, title: "Documents Upload", icon: <Upload className="h-5 w-5" /> },
    { id: 7, title: "Review & Submit", icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const applicationData = {
        category: formData.category,
        business_description: formData.businessDescription,
        key_achievements: formData.achievements,
        products_services: formData.products_services,
        market_reach: formData.targetMarket as 'local' | 'regional' | 'national' | 'international',
        jobs_created: parseInt(formData.numberOfEmployees) || 0,
        women_youth_percentage: 0,
        sustainability_initiatives: '',
        export_activity: '',
        award_funds_usage: formData.whyDeserveAward,
        business_type: formData.businessType,
        owner_position: formData.position,
        alternate_phone: formData.alternatePhone,
        why_deserve_award: formData.whyDeserveAward,
        achievements: formData.achievements,
        challenges: formData.challenges,
        future_goals: formData.futureGoals,
        target_market: formData.targetMarket,
        status: 'draft' as const
      };

      const response = await applicationsAPI.create(applicationData);
      
      if (response.success && response.data) {
        const applicationId = response.data.id;
        
        if (formData.businessLicense || formData.taxClearance || formData.financialStatements || formData.supportingDocuments) {
          const formDataToUpload = new FormData();
          
          if (formData.businessLicense) {
            formDataToUpload.append('business_license', formData.businessLicense);
          }
          if (formData.taxClearance) {
            formDataToUpload.append('tax_clearance', formData.taxClearance);
          }
          if (formData.financialStatements) {
            formDataToUpload.append('financial_statements', formData.financialStatements);
          }
          if (formData.supportingDocuments) {
            formDataToUpload.append('supporting_documents', formData.supportingDocuments);
          }
          
          await documentsAPI.upload(applicationId, formDataToUpload);
        }
        
        await applicationsAPI.submit(applicationId);
        
        alert('Application submitted successfully!');
        onComplete();
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Award Category</h3>
            <p className="text-gray-600 mb-6">Choose the category that best represents your business:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.category === category.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
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
                  <option value="limited-company">Limited Company</option>
                  <option value="cooperative">Cooperative</option>
                  <option value="ngo">NGO</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year Established *</label>
                <input
                  type="number"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 2020"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter business location"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter owner name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., CEO, Founder, Manager"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+234 xxx xxxx xxxx"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Profile</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your business, its mission, and what you do..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Market *</label>
                  <select
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select target market</option>
                    <option value="local">Local</option>
                    <option value="regional">Regional</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees *</label>
                  <input
                    type="number"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 25"
                    min="1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue *</label>
                  <input
                    type="text"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., ₦5,000,000"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you deserve this award? *</label>
                <textarea
                  name="whyDeserveAward"
                  value={formData.whyDeserveAward}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Explain why your business deserves this award..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements *</label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your business achievements and milestones..."
                  required
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents Upload</h3>
            <p className="text-gray-600 mb-6">Please upload the required documents for your application:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business License *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    name="businessLicense"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="businessLicense"
                    required
                  />
                  <label htmlFor="businessLicense" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload business license</p>
                  </label>
                </div>
                {formData.businessLicense && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.businessLicense.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Clearance Certificate *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    name="taxClearance"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="taxClearance"
                    required
                  />
                  <label htmlFor="taxClearance" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload tax clearance</p>
                  </label>
                </div>
                {formData.taxClearance && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.taxClearance.name}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold text-green-800">Application Summary</h4>
                  <p className="text-green-700 text-sm mt-1">Please review your information before submitting.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Category & Business</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Category:</span> {categories.find(c => c.id === formData.category)?.name}</p>
                  <p><span className="font-medium">Name:</span> {formData.businessName}</p>
                  <p><span className="font-medium">Type:</span> {formData.businessType}</p>
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
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Declaration</h4>
                  <label className="flex items-start mt-2">
                    <input type="checkbox" className="mr-2 mt-1" required />
                    <span className="text-yellow-700 text-sm">
                      I declare that all information provided is true and accurate.
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
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Submit New Application</h2>
          <p className="text-gray-600 mt-1">Step {currentStep} of {steps.length}</p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-green-600">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
          
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center bg-green-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
