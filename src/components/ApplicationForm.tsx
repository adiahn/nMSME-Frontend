import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App';
import { categoriesAPI, applicationsAPI, documentsAPI } from '../services/api';
import type { Category, MSMEStrata } from '../services/api';
import { FileText, Upload, CheckCircle, Award, Calendar, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, Plus, Play, Link } from 'lucide-react';

interface ApplicationFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onComplete, onCancel }) => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [msmeStrata, setMSMEStrata] = useState<MSMEStrata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    // Business Details (Required)
    business_name: '',
    cac_number: '',
    sector: '',
    msme_strata: '',
    location: {
      state: '',
      lga: ''
    },
    year_established: '',
    employee_count: '',
    revenue_band: '',
    business_description: '',
    website: '',
         social_media: {
       facebook: '',
       twitter: '',
       linkedin: '',
       instagram: ''
     },
    
    // Application Details
    category: '',
    key_achievements: '',
    products_services_description: '',
    
    jobs_created: '',
    women_youth_percentage: '',
    export_activity: {
      has_exports: false,
      details: ''
    },
    sustainability_initiatives: {
      has_initiatives: false,
      details: ''
    },
    award_usage_plans: '',
    pitch_video: {
      url: '',
      platform: 'youtube' as 'youtube' | 'vimeo'
    },
    cac_certificate: null as File | null,
    tax_identification: null as File | null,
    product_photos: [] as File[],
    business_plan: null as File | null,
    financial_statements: null as File | null,
  });

  // Load categories and MSME strata on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesResponse, strataResponse] = await Promise.all([
          categoriesAPI.getAll(),
          categoriesAPI.getMSMEStrata()
        ]);
        
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data || []);
        }
        
        if (strataResponse.success) {
          setMSMEStrata(strataResponse.data || []);
        }
      } catch (error) {
        console.error('Error loading categories/strata:', error);
        
                 // Fallback data for when backend endpoints are not available
         const fallbackCategories = [
           { id: 'Fashion', name: 'Fashion', description: 'Fashion and textile businesses' },
           { id: 'Information Technology (IT)', name: 'Information Technology (IT)', description: 'Technology and software businesses' },
           { id: 'Agribusiness', name: 'Agribusiness', description: 'Agricultural and farming businesses' },
           { id: 'Food & Beverage', name: 'Food & Beverage', description: 'Food and beverage businesses' },
           { id: 'Light Manufacturing', name: 'Light Manufacturing', description: 'Light manufacturing businesses' },
           { id: 'Creative Enterprise', name: 'Creative Enterprise', description: 'Creative and arts businesses' },
           { id: 'Emerging Enterprise Award', name: 'Emerging Enterprise Award', description: 'Emerging and innovative businesses' }
         ];
        
        const fallbackStrata = [
          { id: 'nano', name: 'Nano', description: '1-2 Staff or Sales < ₦100,000/month', staff_range: '1-2', asset_range: '< ₦100,000/month' },
          { id: 'micro', name: 'Micro', description: '3-9 Staff or Assets ₦500k-₦2.5m', staff_range: '3-9', asset_range: '₦500k-₦2.5m' },
          { id: 'small', name: 'Small', description: '10-50 Staff or Assets ₦2.5m-₦50m', staff_range: '10-50', asset_range: '₦2.5m-₦50m' },
          { id: 'medium', name: 'Medium', description: '51-199 Staff or Assets ₦50m-₦500m', staff_range: '51-199', asset_range: '₦50m-₦500m' }
        ];
        
        setCategories(fallbackCategories);
        setMSMEStrata(fallbackStrata);
      }
    };
    
    loadData();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

     const validateStep1 = () => { // Now validates business details
     const newErrors: {[key: string]: string} = {};
     
     if (!formData.business_name.trim()) {
       newErrors.business_name = 'Business name is required';
     }
     if (!formData.cac_number.trim()) {
       newErrors.cac_number = 'CAC number is required';
     }
     if (!formData.sector) {
       newErrors.sector = 'Please select a sector';
     }
     if (!formData.msme_strata) {
       newErrors.msme_strata = 'Please select your MSME strata';
     }
     if (!formData.location.state) {
       newErrors.state = 'Please select your state';
     }
     if (!formData.location.lga) {
       newErrors.lga = 'Please select your LGA';
     }
     if (!formData.year_established) {
       newErrors.year_established = 'Year established is required';
     }
     if (!formData.employee_count || parseInt(formData.employee_count) < 1) {
       newErrors.employee_count = 'Please enter a valid number of employees';
     }
     if (!formData.revenue_band) {
       newErrors.revenue_band = 'Please select your revenue band';
     }
           if (!formData.business_description.trim()) {
        newErrors.business_description = 'Business description is required';
      } else if (formData.business_description.trim().length < 10) {
        newErrors.business_description = 'Business description must be at least 10 characters';
      } else if (formData.business_description.trim().length > 500) {
        newErrors.business_description = 'Business description must not exceed 500 characters';
      }
     
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

   const validateStep2 = () => { // Now validates application details
     const newErrors: {[key: string]: string} = {};
     
     if (!formData.key_achievements.trim()) {
       newErrors.key_achievements = 'Key achievements are required';
     } else if (formData.key_achievements.trim().length < 10) {
       newErrors.key_achievements = 'Key achievements must be at least 10 characters';
     } else if (formData.key_achievements.trim().length > 300) {
       newErrors.key_achievements = 'Key achievements must not exceed 300 characters';
     }
     if (!formData.products_services_description.trim()) {
       newErrors.products_services_description = 'Products/services description is required';
     }

     if (!formData.jobs_created || parseInt(formData.jobs_created) < 0) {
       newErrors.jobs_created = 'Please enter a valid number of jobs created';
     }
     if (!formData.women_youth_percentage || parseInt(formData.women_youth_percentage) < 0 || parseInt(formData.women_youth_percentage) > 100) {
       newErrors.women_youth_percentage = 'Please enter a valid percentage (0-100)';
     }
     
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

     const validateStep3 = () => { // Now validates export & sustainability
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.key_achievements.trim()) {
      newErrors.key_achievements = 'Key achievements are required';
    }
    if (!formData.products_services_description.trim()) {
      newErrors.products_services_description = 'Products/services description is required';
    }
    
    if (!formData.jobs_created || parseInt(formData.jobs_created) < 0) {
      newErrors.jobs_created = 'Please enter a valid number of jobs created';
    }
    if (!formData.women_youth_percentage || parseInt(formData.women_youth_percentage) < 0 || parseInt(formData.women_youth_percentage) > 100) {
      newErrors.women_youth_percentage = 'Please enter a valid percentage (0-100)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

     const validateStep4 = () => { // Now validates video pitch
     const newErrors: {[key: string]: string} = {};
     
     // Only require export details if they have exports
     if (formData.export_activity.has_exports && !formData.export_activity.details.trim()) {
       newErrors.export_activity = 'Please provide export activity details';
     }
     // Only require sustainability details if they have initiatives
     if (formData.sustainability_initiatives.has_initiatives && !formData.sustainability_initiatives.details.trim()) {
       newErrors.sustainability_initiatives = 'Please provide sustainability initiatives details';
     }
     if (!formData.award_usage_plans.trim()) {
       newErrors.award_usage_plans = 'Award usage plans are required';
     }
     
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

     const validateStep5 = () => { // Now validates documents
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.pitch_video.url.trim()) {
      newErrors.pitch_video = 'Video pitch URL is required';
    } else {
      // Validate YouTube/Vimeo URL
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}/;
      const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)[0-9]+/;
      
      if (!youtubeRegex.test(formData.pitch_video.url) && !vimeoRegex.test(formData.pitch_video.url)) {
        newErrors.pitch_video = 'Please provide a valid YouTube or Vimeo URL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

     const validateStep6 = () => { // Now validates documents
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.cac_certificate) {
      newErrors.cac_certificate = 'CAC Certificate is required';
    }
    if (formData.product_photos.length === 0) {
      newErrors.product_photos = 'At least one product photo is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      case 6:
        isValid = validateStep6();
        break;
      default:
        isValid = true;
    }
    
         if (isValid && step < 7) {
       setStep(step + 1);
       setErrors({});
     }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

     const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
     
     try {
       // Create FormData for comprehensive endpoint
       const formDataToSubmit = new FormData();
       
       // Add application data as JSON fields
       const applicationData = {
         // Business Details
         business_name: formData.business_name,
         cac_number: formData.cac_number,
         sector: formData.sector,
         msme_strata: formData.msme_strata,
         location: formData.location,
         year_established: parseInt(formData.year_established),
         employee_count: parseInt(formData.employee_count),
         revenue_band: formData.revenue_band,
         business_description: formData.business_description,
         website: formData.website,
         social_media: formData.social_media,
         
         // Application Details
         category: formData.sector, // Use sector value for category
         key_achievements: formData.key_achievements,
         products_services_description: formData.products_services_description,
         jobs_created: parseInt(formData.jobs_created) || 0,
         women_youth_percentage: parseInt(formData.women_youth_percentage) || 0,
         export_activity: formData.export_activity,
         sustainability_initiatives: formData.sustainability_initiatives,
         award_usage_plans: formData.award_usage_plans,
         pitch_video: {
           url: formData.pitch_video.url,
           platform: formData.pitch_video.platform || 'youtube'
         },
         status: 'submitted' as const
       };

       // Add application data as individual fields
       formDataToSubmit.append('business_name', applicationData.business_name);
       formDataToSubmit.append('cac_number', applicationData.cac_number);
       formDataToSubmit.append('sector', applicationData.sector);
       formDataToSubmit.append('msme_strata', applicationData.msme_strata);
       // Send location fields using bracket notation as expected by backend
       formDataToSubmit.append('location[state]', applicationData.location.state);
       formDataToSubmit.append('location[lga]', applicationData.location.lga);
       formDataToSubmit.append('year_established', applicationData.year_established.toString());
       formDataToSubmit.append('employee_count', applicationData.employee_count.toString());
       formDataToSubmit.append('revenue_band', applicationData.revenue_band);
       formDataToSubmit.append('business_description', applicationData.business_description);
       formDataToSubmit.append('website', applicationData.website);
       // Send social media fields using bracket notation
       formDataToSubmit.append('social_media[facebook]', applicationData.social_media.facebook);
       formDataToSubmit.append('social_media[twitter]', applicationData.social_media.twitter);
       formDataToSubmit.append('social_media[linkedin]', applicationData.social_media.linkedin);
       formDataToSubmit.append('social_media[instagram]', applicationData.social_media.instagram);
       formDataToSubmit.append('category', applicationData.category);
       formDataToSubmit.append('key_achievements', applicationData.key_achievements);
       formDataToSubmit.append('products_services_description', applicationData.products_services_description);
       formDataToSubmit.append('jobs_created', applicationData.jobs_created.toString());
       formDataToSubmit.append('women_youth_percentage', applicationData.women_youth_percentage.toString());
       // Send export activity fields using bracket notation
       formDataToSubmit.append('export_activity[has_exports]', applicationData.export_activity.has_exports.toString());
       formDataToSubmit.append('export_activity[export_details]', applicationData.export_activity.details);
       // Send sustainability initiatives fields using bracket notation
       formDataToSubmit.append('sustainability_initiatives[has_initiatives]', applicationData.sustainability_initiatives.has_initiatives.toString());
       formDataToSubmit.append('sustainability_initiatives[initiative_details]', applicationData.sustainability_initiatives.details);
       formDataToSubmit.append('award_usage_plans', applicationData.award_usage_plans);
       // Send pitch video fields using bracket notation
       formDataToSubmit.append('pitch_video[url]', applicationData.pitch_video.url);
       formDataToSubmit.append('pitch_video[platform]', applicationData.pitch_video.platform);
       formDataToSubmit.append('status', applicationData.status);

       // Add document files
       if (formData.cac_certificate) {
         formDataToSubmit.append('cac_certificate', formData.cac_certificate);
       }
       if (formData.tax_identification) {
         formDataToSubmit.append('tax_identification', formData.tax_identification);
       }
       if (formData.business_plan) {
         formDataToSubmit.append('business_plan', formData.business_plan);
       }
       if (formData.financial_statements) {
         formDataToSubmit.append('financial_statements', formData.financial_statements);
       }
       
       // Handle product photos (up to 5)
       formData.product_photos.forEach((photo, index) => {
         if (index < 5) { // Limit to 5 photos
           formDataToSubmit.append('product_photos', photo);
         }
       });

       // Debug: Log the data being sent
       console.log('Submitting application with documents using comprehensive endpoint...');
       console.log('Application data:', applicationData);
       console.log('State value being sent:', applicationData.location.state);
       console.log('LGA value being sent:', applicationData.location.lga);
       console.log('Files to upload:', {
         cac_certificate: formData.cac_certificate ? 'Yes' : 'No',
         tax_identification: formData.tax_identification ? 'Yes' : 'No',
         business_plan: formData.business_plan ? 'Yes' : 'No',
         financial_statements: formData.financial_statements ? 'Yes' : 'No',
         product_photos: formData.product_photos.length
       });

       // Debug: Log FormData contents
       console.log('FormData contents:');
       for (let [key, value] of formDataToSubmit.entries()) {
         console.log(`${key}:`, value);
       }

       // Use the new comprehensive endpoint
       const result = await applicationsAPI.createWithDocuments(formDataToSubmit);
       console.log('Comprehensive endpoint response:', result);

       if (result.success) {
         console.log('Application created successfully with documents:', result.data);
         alert('Application submitted successfully with all documents!');
         onComplete();
       } else {
         console.error('Application creation failed:', result);
         throw new Error(result.error || result.message || 'Application creation failed');
       }
         
     } catch (error: any) {
       console.error('Application submission error:', error);
       
       // Show more specific error messages
       console.log('Full error object:', error);
       console.log('Error message:', error.message);
       
       if (error.message?.includes('Business description must be between')) {
         alert('Error: Business description must be between 10 and 500 characters. Please update your business description and try again.');
       } else if (error.message?.includes('Key achievements')) {
         alert('Error: Key achievements must be between 10 and 300 characters. Please update your key achievements and try again.');
       } else if (error.message?.includes('CAC Certificate is required')) {
         alert('Error: CAC Certificate is required. Please upload your CAC certificate and try again.');
       } else if (error.message?.includes('Product photos are required')) {
         alert('Error: At least one product photo is required. Please upload product photos and try again.');
       } else if (error.message?.includes('State is required')) {
         alert('Error: State is required. Please select your state and try again.');
       } else if (error.message?.includes('400')) {
         alert('Validation Error: Please check all required fields and ensure they meet the requirements.');
       } else if (error.message?.includes('500') || error.response?.status === 500) {
         console.error('500 Server Error Details:', {
           status: error.response?.status,
           statusText: error.response?.statusText,
           data: error.response?.data
         });
         alert('Server Error (500): The backend server encountered an error. Please check the console for details and contact support if the problem persists.');
       } else {
         alert('An error occurred during submission: ' + (error.message || 'Unknown error'));
       }
     } finally {
       setIsLoading(false);
     }
   };

     const totalSteps = 7;
  const progress = Math.round(((step - 1) / totalSteps) * 100);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-8 my-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Application Form</h2>
          <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Business Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Business Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.business_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your business name"
                />
                {errors.business_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.business_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAC Number *
                </label>
                <input
                  type="text"
                  value={formData.cac_number}
                  onChange={(e) => handleInputChange('cac_number', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cac_number ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter CAC number"
                />
                {errors.cac_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.cac_number}</p>
                )}
              </div>

                             <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Business Sector *
                 </label>
                 <select
                   value={formData.sector}
                   onChange={(e) => handleInputChange('sector', e.target.value)}
                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.sector ? 'border-red-500' : 'border-gray-300'
                   }`}
                 >
                   <option value="">Select your business sector</option>
                   {categories.map((category) => (
                     <option key={category.id} value={category.name}>
                       {category.name}
                     </option>
                   ))}
                 </select>
                 {errors.sector && (
                   <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
                 )}
               </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MSME Strata *
                </label>
                <select
                  value={formData.msme_strata}
                  onChange={(e) => handleInputChange('msme_strata', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.msme_strata ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select MSME strata</option>
                  {msmeStrata.map((strata) => (
                    <option key={strata.id} value={strata.id}>
                      {strata.name} - {strata.description}
                    </option>
                  ))}
                </select>
                {errors.msme_strata && (
                  <p className="text-red-500 text-sm mt-1">{errors.msme_strata}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  value={formData.location.state}
                  onChange={(e) => handleInputChange('location.state', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select state</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="kano">Kano</option>
                  <option value="kaduna">Kaduna</option>
                  <option value="kano">Kano</option>
                  <option value="katsina">Katsina</option>
                  <option value="oyo">Oyo</option>
                  <option value="rivers">Rivers</option>
                  <option value="bauchi">Bauchi</option>
                  <option value="jigawa">Jigawa</option>
                  <option value="benue">Benue</option>
                  <option value="anambra">Anambra</option>
                  <option value="borno">Borno</option>
                  <option value="adamawa">Adamawa</option>
                  <option value="niger">Niger</option>
                  <option value="taraba">Taraba</option>
                  <option value="kwara">Kwara</option>
                  <option value="zamfara">Zamfara</option>
                  <option value="gombe">Gombe</option>
                  <option value="yobe">Yobe</option>
                  <option value="kebbi">Kebbi</option>
                  <option value="sokoto">Sokoto</option>
                  <option value="plateau">Plateau</option>
                  <option value="kogi">Kogi</option>
                  <option value="cross-river">Cross River</option>
                  <option value="akwa-ibom">Akwa Ibom</option>
                  <option value="delta">Delta</option>
                  <option value="edo">Edo</option>
                  <option value="ondo">Ondo</option>
                  <option value="osun">Osun</option>
                  <option value="ogun">Ogun</option>
                  <option value="ekiti">Ekiti</option>
                  <option value="imo">Imo</option>
                  <option value="abia">Abia</option>
                  <option value="enugu">Enugu</option>
                  <option value="ebonyi">Ebonyi</option>
                  <option value="nasarawa">Nasarawa</option>
                  <option value="kebbi">Kebbi</option>
                  <option value="sokoto">Sokoto</option>
                  <option value="plateau">Plateau</option>
                  <option value="kogi">Kogi</option>
                  <option value="cross-river">Cross River</option>
                  <option value="akwa-ibom">Akwa Ibom</option>
                  <option value="delta">Delta</option>
                  <option value="edo">Edo</option>
                  <option value="ondo">Ondo</option>
                  <option value="osun">Osun</option>
                  <option value="ogun">Ogun</option>
                  <option value="ekiti">Ekiti</option>
                  <option value="imo">Imo</option>
                  <option value="abia">Abia</option>
                  <option value="enugu">Enugu</option>
                  <option value="ebonyi">Ebonyi</option>
                  <option value="nasarawa">Nasarawa</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LGA *
                </label>
                <input
                  type="text"
                  value={formData.location.lga}
                  onChange={(e) => handleInputChange('location.lga', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lga ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter LGA"
                />
                {errors.lga && (
                  <p className="text-red-500 text-sm mt-1">{errors.lga}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Established *
                </label>
                <input
                  type="number"
                  value={formData.year_established}
                  onChange={(e) => handleInputChange('year_established', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.year_established ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2020"
                  min="1900"
                  max={new Date().getFullYear()}
                />
                {errors.year_established && (
                  <p className="text-red-500 text-sm mt-1">{errors.year_established}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees *
                </label>
                <input
                  type="number"
                  value={formData.employee_count}
                  onChange={(e) => handleInputChange('employee_count', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.employee_count ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter number of employees"
                  min="1"
                />
                {errors.employee_count && (
                  <p className="text-red-500 text-sm mt-1">{errors.employee_count}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Band *
                </label>
                <select
                  value={formData.revenue_band}
                  onChange={(e) => handleInputChange('revenue_band', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.revenue_band ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                                     <option value="">Select revenue band</option>
                   <option value="Less than ₦100,000/month">Less than ₦100,000/month</option>
                   <option value="₦100,000 - ₦500,000/month">₦100,000 - ₦500,000/month</option>
                   <option value="₦500,000 - ₦1,000,000/month">₦500,000 - ₦1,000,000/month</option>
                   <option value="₦1,000,000 - ₦5,000,000/month">₦1,000,000 - ₦5,000,000/month</option>
                   <option value="₦5,000,000 - ₦10,000,000/month">₦5,000,000 - ₦10,000,000/month</option>
                   <option value="Above ₦10,000,000/month">Above ₦10,000,000/month</option>
                </select>
                {errors.revenue_band && (
                  <p className="text-red-500 text-sm mt-1">{errors.revenue_band}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description *
              </label>
                             <textarea
                 value={formData.business_description}
                 onChange={(e) => handleInputChange('business_description', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                   errors.business_description ? 'border-red-500' : 'border-gray-300'
                 }`}
                 rows={4}
                 placeholder="Describe your business, products/services, and market position (10-500 characters)"
                 maxLength={500}
               />
               <div className="flex justify-between items-center mt-1">
                 {errors.business_description && (
                   <p className="text-red-500 text-sm">{errors.business_description}</p>
                 )}
                 <p className={`text-xs ml-auto ${
                   formData.business_description.length > 450 ? 'text-orange-600' : 
                   formData.business_description.length > 400 ? 'text-yellow-600' : 'text-gray-500'
                 }`}>
                   {formData.business_description.length}/500 characters
                 </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>

                             <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Social Media (Optional)
                 </label>
                 <div className="grid grid-cols-2 gap-3">
                   <input
                     type="text"
                     value={formData.social_media.facebook}
                     onChange={(e) => handleInputChange('social_media.facebook', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Facebook handle"
                   />
                   <input
                     type="text"
                     value={formData.social_media.twitter}
                     onChange={(e) => handleInputChange('social_media.twitter', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Twitter handle"
                   />
                   <input
                     type="text"
                     value={formData.social_media.linkedin}
                     onChange={(e) => handleInputChange('social_media.linkedin', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="LinkedIn handle"
                   />
                   <input
                     type="text"
                     value={formData.social_media.instagram}
                     onChange={(e) => handleInputChange('social_media.instagram', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Instagram handle"
                   />
                 </div>
               </div>
            </div>
          </div>
        )}

        

         {/* Step 2: Application Details */}
         {step === 2 && (
           <div className="space-y-6">
             <h3 className="text-xl font-semibold text-gray-800 mb-6">Application Details</h3>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Key Achievements *
               </label>
                               <textarea
                  value={formData.key_achievements}
                  onChange={(e) => handleInputChange('key_achievements', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.key_achievements ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="Describe your key achievements and milestones (10-300 characters)"
                  maxLength={300}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.key_achievements && (
                    <p className="text-red-500 text-sm">{errors.key_achievements}</p>
                  )}
                  <p className={`text-xs ml-auto ${
                    formData.key_achievements.length > 270 ? 'text-orange-600' : 
                    formData.key_achievements.length > 240 ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    {formData.key_achievements.length}/300 characters
                  </p>
                </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Products/Services Description *
               </label>
               <textarea
                 value={formData.products_services_description}
                 onChange={(e) => handleInputChange('products_services_description', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                   errors.products_services_description ? 'border-red-500' : 'border-gray-300'
                 }`}
                 rows={4}
                 placeholder="Describe your products or services in detail"
               />
               {errors.products_services_description && (
                 <p className="text-red-500 text-sm mt-1">{errors.products_services_description}</p>
               )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Jobs Created *
                 </label>
                 <input
                   type="number"
                   value={formData.jobs_created}
                   onChange={(e) => handleInputChange('jobs_created', e.target.value)}
                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.jobs_created ? 'border-red-500' : 'border-gray-300'
                   }`}
                   placeholder="Number of jobs created"
                   min="0"
                 />
                 {errors.jobs_created && (
                   <p className="text-red-500 text-sm mt-1">{errors.jobs_created}</p>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Women/Youth Percentage *
                 </label>
                 <input
                   type="number"
                   value={formData.women_youth_percentage}
                   onChange={(e) => handleInputChange('women_youth_percentage', e.target.value)}
                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.women_youth_percentage ? 'border-red-500' : 'border-gray-300'
                   }`}
                   placeholder="Percentage (0-100)"
                   min="0"
                   max="100"
                 />
                 {errors.women_youth_percentage && (
                   <p className="text-red-500 text-sm mt-1">{errors.women_youth_percentage}</p>
                 )}
               </div>
             </div>
           </div>
         )}

         {/* Step 3: Export & Sustainability */}
         {step === 3 && (
           <div className="space-y-6">
             <h3 className="text-xl font-semibold text-gray-800 mb-6">Export & Sustainability</h3>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Export Activity
               </label>
               <div className="space-y-3">
                 <div className="flex items-center space-x-3">
                   <input
                     type="checkbox"
                     id="has_exports"
                     checked={formData.export_activity.has_exports}
                     onChange={(e) => handleInputChange('export_activity.has_exports', e.target.checked)}
                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                   />
                   <label htmlFor="has_exports" className="text-sm text-gray-700">
                     Do you have export activities?
                   </label>
                 </div>
                 {formData.export_activity.has_exports && (
                   <textarea
                     value={formData.export_activity.details}
                     onChange={(e) => handleInputChange('export_activity.details', e.target.value)}
                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                       errors.export_activity ? 'border-red-500' : 'border-gray-300'
                     }`}
                     rows={3}
                     placeholder="Describe your export activities and markets"
                   />
                 )}
                 {errors.export_activity && (
                   <p className="text-red-500 text-sm mt-1">{errors.export_activity}</p>
                 )}
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Sustainability Initiatives
               </label>
               <div className="space-y-3">
                 <div className="flex items-center space-x-3">
                   <input
                     type="checkbox"
                     id="has_initiatives"
                     checked={formData.sustainability_initiatives.has_initiatives}
                     onChange={(e) => handleInputChange('sustainability_initiatives.has_initiatives', e.target.checked)}
                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                   />
                   <label htmlFor="has_initiatives" className="text-sm text-gray-700">
                     Do you have sustainability initiatives?
                   </label>
                 </div>
                 {formData.sustainability_initiatives.has_initiatives && (
                   <textarea
                     value={formData.sustainability_initiatives.details}
                     onChange={(e) => handleInputChange('sustainability_initiatives.details', e.target.value)}
                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                       errors.sustainability_initiatives ? 'border-red-500' : 'border-gray-300'
                     }`}
                     rows={3}
                     placeholder="Describe your sustainability initiatives"
                   />
                 )}
                 {errors.sustainability_initiatives && (
                   <p className="text-red-500 text-sm mt-1">{errors.sustainability_initiatives}</p>
                 )}
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Award Usage Plans *
               </label>
               <textarea
                 value={formData.award_usage_plans}
                 onChange={(e) => handleInputChange('award_usage_plans', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                   errors.award_usage_plans ? 'border-red-500' : 'border-gray-300'
                 }`}
                 rows={4}
                 placeholder="How do you plan to use the award funds if selected?"
               />
               {errors.award_usage_plans && (
                 <p className="text-red-500 text-sm mt-1">{errors.award_usage_plans}</p>
               )}
             </div>
           </div>
         )}

         {/* Step 4: Video Pitch */}
         {step === 4 && (
           <div className="space-y-6">
             <h3 className="text-xl font-semibold text-gray-800 mb-6">Video Pitch</h3>
             
             <div className="bg-blue-50 p-4 rounded-lg mb-6">
               <h4 className="font-medium text-blue-900 mb-2">Video Pitch Requirements</h4>
               <ul className="text-blue-800 text-sm space-y-1">
                 <li>• Duration: 2-3 minutes</li>
                 <li>• Format: YouTube or Vimeo link only</li>
                 <li>• Content: Pitch your business, achievements, and why you deserve the award</li>
                 <li>• Quality: Clear audio and video</li>
               </ul>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Video Pitch URL *
               </label>
               <input
                 type="url"
                 value={formData.pitch_video.url}
                 onChange={(e) => handleInputChange('pitch_video.url', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                   errors.pitch_video ? 'border-red-500' : 'border-gray-300'
                 }`}
                 placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
               />
               {errors.pitch_video && (
                 <p className="text-red-500 text-sm mt-1">{errors.pitch_video}</p>
               )}
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Platform
               </label>
               <select
                 value={formData.pitch_video.platform}
                 onChange={(e) => handleInputChange('pitch_video.platform', e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option value="youtube">YouTube</option>
                 <option value="vimeo">Vimeo</option>
               </select>
             </div>
           </div>
         )}

         {/* Step 5: Document Upload */}
         {step === 5 && (
           <div className="space-y-6">
             <h3 className="text-xl font-semibold text-gray-800 mb-6">Document Upload</h3>
             
             <div className="bg-yellow-50 p-4 rounded-lg mb-6">
               <h4 className="font-medium text-yellow-900 mb-2">Required Documents</h4>
               <ul className="text-yellow-800 text-sm space-y-1">
                 <li>• CAC Certificate (PDF) - Required</li>
                 <li>• Product Photos (1-5 images, JPG/PNG) - Required</li>
                 <li>• Tax Identification (PDF) - Optional</li>
                 <li>• Business Plan (PDF) - Optional</li>
                 <li>• Financial Statements (PDF) - Optional</li>
               </ul>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 CAC Certificate *
               </label>
               <input
                 type="file"
                 accept=".pdf"
                 onChange={(e) => handleInputChange('cac_certificate', e.target.files?.[0] || null)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                   errors.cac_certificate ? 'border-red-500' : 'border-gray-300'
                 }`}
               />
               {errors.cac_certificate && (
                 <p className="text-red-500 text-sm mt-1">{errors.cac_certificate}</p>
               )}
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Product Photos * (1-5 images)
               </label>
               <input
                 type="file"
                 accept="image/*"
                 multiple
                 onChange={(e) => {
                   const files = Array.from(e.target.files || []);
                   handleInputChange('product_photos', files);
                 }}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                   errors.product_photos ? 'border-red-500' : 'border-gray-300'
                 }`}
               />
               {errors.product_photos && (
                 <p className="text-red-500 text-sm mt-1">{errors.product_photos}</p>
               )}
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Tax Identification (Optional)
               </label>
               <input
                 type="file"
                 accept=".pdf"
                 onChange={(e) => handleInputChange('tax_identification', e.target.files?.[0] || null)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Business Plan (Optional)
               </label>
               <input
                 type="file"
                 accept=".pdf"
                 onChange={(e) => handleInputChange('business_plan', e.target.files?.[0] || null)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Financial Statements (Optional)
               </label>
               <input
                 type="file"
                 accept=".pdf"
                 onChange={(e) => handleInputChange('financial_statements', e.target.files?.[0] || null)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
           </div>
         )}

         {/* Step 6: Review & Submit */}
         {step === 6 && (
           <div className="space-y-6">
             <h3 className="text-xl font-semibold text-gray-800 mb-6">Review & Submit</h3>
             
             <div className="bg-green-50 p-4 rounded-lg mb-6">
               <h4 className="font-medium text-green-900 mb-2">Application Summary</h4>
               <p className="text-green-800 text-sm">
                 Please review all the information below before submitting your application.
               </p>
             </div>

             <div className="space-y-4">
               <div className="border rounded-lg p-4">
                 <h5 className="font-medium text-gray-800 mb-3">Business Details</h5>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   <div><strong>Business Name:</strong> {formData.business_name}</div>
                   <div><strong>CAC Number:</strong> {formData.cac_number}</div>
                   <div><strong>Sector:</strong> {formData.sector}</div>
                   <div><strong>MSME Strata:</strong> {formData.msme_strata}</div>
                   <div><strong>Location:</strong> {formData.location.state}, {formData.location.lga}</div>
                   <div><strong>Year Established:</strong> {formData.year_established}</div>
                   <div><strong>Employees:</strong> {formData.employee_count}</div>
                   <div><strong>Revenue Band:</strong> {formData.revenue_band}</div>
                 </div>
               </div>

               <div className="border rounded-lg p-4">
                 <h5 className="font-medium text-gray-800 mb-3">Application Details</h5>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   <div><strong>Category:</strong> {formData.category}</div>

                   <div><strong>Jobs Created:</strong> {formData.jobs_created}</div>
                   <div><strong>Women/Youth %:</strong> {formData.women_youth_percentage}%</div>
                 </div>
               </div>

               <div className="border rounded-lg p-4">
                 <h5 className="font-medium text-gray-800 mb-3">Documents & Video</h5>
                 <div className="space-y-2 text-sm">
                   <div><strong>CAC Certificate:</strong> {formData.cac_certificate ? '✓ Uploaded' : '✗ Missing'}</div>
                   <div><strong>Product Photos:</strong> {formData.product_photos.length > 0 ? `✓ ${formData.product_photos.length} uploaded` : '✗ Missing'}</div>
                   <div><strong>Video Pitch:</strong> {formData.pitch_video.url ? '✓ URL provided' : '✗ Missing'}</div>
                 </div>
               </div>
             </div>
           </div>
         )}

         {/* Step 7: Confirmation */}
         {step === 7 && (
           <div className="space-y-6">
             <div className="text-center">
               <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle className="w-8 h-8 text-green-600" />
               </div>
               <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Submit!</h3>
               <p className="text-gray-600 mb-6">
                 Your application is complete and ready for submission. Click the submit button below to finalize your application.
               </p>
             </div>
           </div>
         )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              step === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
