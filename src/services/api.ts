// API Service for nMSME Awards Portal
// Base URL: http://localhost:5000/api

const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: 'applicant' | 'judge' | 'admin' | 'sponsor' | 'public';
  is_verified: boolean;
  created_at: string;
}

// New PRD Categories
export interface Category {
  id: string;
  name: string;
  description: string;
  criteria?: string[];
  application_count?: number;
}

// MSME Strata
export interface MSMEStrata {
  id: string;
  name: string;
  description: string;
  staff_range: string;
  asset_range: string;
}

export interface BusinessProfile {
  id: string;
  business_name: string;
  cac_number: string;
  sector: string; // New PRD categories
  msme_strata: string; // New MSME strata
  business_type: 'sole-proprietorship' | 'partnership' | 'limited-company' | 'cooperative' | 'ngo';
  registration_number: string;
  location: {
    state: string;
    city: string;
    address: string;
  };
  year_established: number;
  employee_count: number;
  revenue_band: string;
  website?: string;
  social_media_links?: string;
  business_description: string;
  key_achievements: string;
  products_services: string;
  market_reach: 'local' | 'regional' | 'national' | 'international';
  jobs_created: number;
  women_youth_percentage: number;
  export_activity: {
    has_exports: boolean;
    details?: string;
  };
  sustainability_initiatives: {
    has_initiatives: boolean;
    details?: string;
  };
  award_usage_plans: string;
}

// Application with embedded business details (new backend structure)
export interface Application {
  id: string;
  category: string; // New PRD categories
  status: 'draft' | 'submitted' | 'pre_screening' | 'under_review' | 'shortlisted' | 'finalist' | 'winner' | 'rejected';
  
  // Embedded Business Details (Required)
  business_name: string;
  cac_number: string;
  sector: string;
  msme_strata: string;
  location: {
    state: string;
    lga: string;
  };
  year_established: number;
  employee_count: number;
  revenue_band: string;
  business_description: string;
  website?: string;
  social_media?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  
  // Application Details
  key_achievements: string;
  products_services_description: string;
  jobs_created: number;
  women_youth_percentage: number;
  export_activity: {
    has_exports: boolean;
    details?: string;
  };
  sustainability_initiatives: {
    has_initiatives: boolean;
    details?: string;
  };
  award_usage_plans: string;
  
  // Video pitch as link (not file upload)
  pitch_video: {
    url: string;
    platform: 'youtube' | 'vimeo';
    duration?: number;
  };
  
  // Legacy fields for backward compatibility (deprecated)
  products_services?: string;
  sustainability_initiatives_legacy?: string;
  export_activity_legacy?: string;
  award_funds_usage?: string;
  video_link?: string;
  business_type?: string;
  owner_position?: string;
  alternate_phone?: string;
  why_deserve_award?: string;
  achievements?: string;
  challenges?: string;
  future_goals?: string;
  target_market?: string;
  
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

// Document with new PRD types
export interface Document {
  id: string;
  document_type: 'cac_certificate' | 'tax_identification' | 'product_photos' | 'business_plan' | 'financial_statements';
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  url: string;
  uploaded_at: string;
}

export interface ApplicationStats {
  total_applications: number;
  submitted: number;
  draft: number;
  pre_screening: number;
  under_review: number;
  shortlisted: number;
  finalist: number;
  winner: number;
  rejected: number;
  average_score?: number;
}

export interface ApplicationTimeline {
  current_status: string;
  submission_date?: string;
  review_deadline?: string;
  results_date?: string;
}

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any[];
}

// Extended API Response for login
interface LoginApiResponse extends ApiResponse<{ token: string; user: User }> {
  token?: string;
  user?: User;
}

// Helper function to handle API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('token');
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  
  console.log(`🌐 Making API call to: ${API_BASE_URL}${endpoint}`);
  console.log(`📤 Request config:`, {
    method: config.method || 'GET',
    headers: config.headers,
    body: config.body ? JSON.parse(config.body as string) : undefined
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    console.log(`📥 Response status: ${response.status} ${response.statusText}`);
    
    let data;
    try {
      data = await response.json();
      console.log(`📥 Response data:`, data);
    } catch (jsonError) {
      console.error(`❌ Failed to parse JSON response:`, jsonError);
      const textResponse = await response.text();
      console.log(`📥 Raw response text:`, textResponse);
      throw new Error(`Invalid JSON response: ${textResponse}`);
    }
    
    // Special handling for login endpoint with 401 but successful response
    if (endpoint === '/auth/login' && response.status === 401 && data.success === true) {
      console.log('Login successful despite 401 status, treating as success');
      return data;
    }
    
    if (!response.ok) {
      console.error(`❌ API Error - Status: ${response.status}, Data:`, data);
      let errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
      if (data.details && Array.isArray(data.details)) {
        const validationErrors = data.details.map((detail: any) => detail.msg).join(', ');
        errorMessage = `Validation failed: ${validationErrors}`;
      }
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).details = data.details;
      (error as any).response = data;
      throw error;
    }
    return data;
  } catch (error) { 
    console.error('💥 API Call Failed:', error);
    console.error('🔍 Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      endpoint,
      config
    });
    throw error; 
  }
}

// Authentication API
export const authAPI = {
  // Step 1: Send OTP
  registerStep1: async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }): Promise<ApiResponse<{ user_id: string }>> => {
    return apiCall('/auth/register/step1', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Step 2: Verify OTP
  registerStep2: async (data: {
    user_id: string;
    otp: string;
  }): Promise<ApiResponse<{ user_id: string }>> => {
    return apiCall('/auth/register/step2', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Step 3: Complete registration
  registerStep3: async (data: {
    user_id: string;
    password: string;
  }): Promise<ApiResponse<{ token: string; user: User }>> => {
    return apiCall('/auth/register/step3', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Login
  login: async (credentials: {
    email_or_phone: string;
    password: string;
  }): Promise<LoginApiResponse> => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse<{}>> => {
    return apiCall('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse<{}>> => {
    return apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: async (data: {
    token: string;
    password: string;
  }): Promise<ApiResponse<{}>> => {
    return apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// User Profile API
export const userAPI = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiCall('/user/profile');
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiCall('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Change password
  changePassword: async (data: {
    current_password: string;
    new_password: string;
  }): Promise<ApiResponse<{}>> => {
    return apiCall('/user/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Get application statistics
  getApplicationStats: async (): Promise<ApiResponse<ApplicationStats>> => {
    return apiCall('/user/application-stats');
  },
};

// Business Profile API
export const businessAPI = {
  // Get business profile
  getProfile: async (): Promise<ApiResponse<BusinessProfile>> => {
    return apiCall('/user/business-profile');
  },

  // Create business profile
  createProfile: async (data: Omit<BusinessProfile, 'id'>): Promise<ApiResponse<BusinessProfile>> => {
    return apiCall('/user/business-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update business profile
  updateProfile: async (data: Partial<BusinessProfile>): Promise<ApiResponse<BusinessProfile>> => {
    return apiCall('/user/business-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete business profile
  deleteProfile: async (): Promise<ApiResponse<{}>> => {
    return apiCall('/user/business-profile', {
      method: 'DELETE',
    });
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    return apiCall('/categories');
  },

  // Get specific category
  getById: async (id: string): Promise<ApiResponse<Category>> => {
    return apiCall(`/categories/${id}`);
  },

  // Get MSME strata
  getMSMEStrata: async (): Promise<ApiResponse<MSMEStrata[]>> => {
    return apiCall('/categories/msme-strata');
  },
};

// Applications API
export const applicationsAPI = {
  // Get user applications
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<{
    applications: Application[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    
    return apiCall(`/applications?${queryParams.toString()}`);
  },

  // Get specific application
  getById: async (id: string): Promise<ApiResponse<Application>> => {
    return apiCall(`/applications/${id}`);
  },

  // Create application
  create: async (data: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Application>> => {
    return apiCall('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Create application with documents (comprehensive endpoint)
  createWithDocuments: async (formData: FormData): Promise<ApiResponse<{
    application_id: string;
    workflow_stage: string;
    documents_uploaded: number;
    total_documents: number;
  }>> => {
    const token = localStorage.getItem('token');
    
    console.log('🌐 Making API call to comprehensive endpoint:', `${API_BASE_URL}/applications/complete`);
    console.log('📤 FormData being sent:');
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }

    const response = await fetch(`${API_BASE_URL}/applications/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    const data = await response.json();
    console.log('📥 Response data:', data);
    
    if (!response.ok) {
      console.error(`❌ API Error - Status: ${response.status}, Data:`, data);
      const error = new Error(data.error || data.message || 'Application creation failed');
      (error as any).status = response.status;
      (error as any).response = data;
      throw error;
    }
    
    return data;
  },

  // Update application
  update: async (id: string, data: Partial<Application>): Promise<ApiResponse<Application>> => {
    return apiCall(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Submit application
  submit: async (id: string): Promise<ApiResponse<{}>> => {
    return apiCall(`/applications/${id}/submit`, {
      method: 'POST',
    });
  },

  // Withdraw application
  withdraw: async (id: string): Promise<ApiResponse<{}>> => {
    return apiCall(`/applications/${id}/withdraw`, {
      method: 'POST',
    });
  },

  // Delete application
  delete: async (id: string): Promise<ApiResponse<{}>> => {
    return apiCall(`/applications/${id}`, {
      method: 'DELETE',
    });
  },

  // Get application status
  getStatus: async (id: string): Promise<ApiResponse<ApplicationTimeline>> => {
    return apiCall(`/applications/${id}/status`);
  },

  // Get application timeline
  getTimeline: async (id: string): Promise<ApiResponse<ApplicationTimeline>> => {
    return apiCall(`/applications/${id}/timeline`);
  },

  // Validate application before submission
  validate: async (id: string): Promise<ApiResponse<{
    is_valid: boolean;
    errors: string[];
    warnings: string[];
  }>> => {
    return apiCall(`/applications/${id}/validation`);
  },
};

// Documents API
export const documentsAPI = {
  // Upload documents
  upload: async (
    applicationId: string,
    formData: FormData
  ): Promise<ApiResponse<{ uploaded_documents: Document[] }>> => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/documents/upload/${applicationId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Document upload failed');
    }

    return response.json();
  },

  // Upload video link (YouTube/Vimeo)
  uploadVideoLink: async (
    applicationId: string,
    videoData: {
      url: string;
      platform: 'youtube' | 'vimeo';
    }
  ): Promise<ApiResponse<{ video_url: string; platform: string }>> => {
    return apiCall(`/documents/upload-video-link/${applicationId}`, {
      method: 'POST',
      body: JSON.stringify(videoData),
    });
  },

  // Get application documents
  getByApplication: async (applicationId: string): Promise<ApiResponse<Document[]>> => {
    return apiCall(`/documents/${applicationId}`);
  },

  // Get document details
  getById: async (applicationId: string, documentId: string): Promise<ApiResponse<Document>> => {
    return apiCall(`/documents/${applicationId}/${documentId}`);
  },

  // Delete document
  delete: async (applicationId: string, documentId: string): Promise<ApiResponse<{}>> => {
    return apiCall(`/documents/${applicationId}/${documentId}`, {
      method: 'DELETE',
    });
  },

  // Get document download URL
  getDownloadUrl: async (
    applicationId: string,
    documentId: string
  ): Promise<ApiResponse<{ download_url: string; expires_in: number }>> => {
    return apiCall(`/documents/${applicationId}/${documentId}/download`);
  },
};

// Dashboard API
export const dashboardAPI = {
  // Get public overview
  getOverview: async (): Promise<ApiResponse<{
    total_applications: number;
    total_categories: number;
    current_phase: string;
    submission_deadline: string;
  }>> => {
    return apiCall('/dashboard/overview');
  },

  // Get user statistics
  getUserStats: async (): Promise<ApiResponse<ApplicationStats>> => {
    return apiCall('/dashboard/user-stats');
  },

  // Get timeline
  getTimeline: async (): Promise<ApiResponse<{
    current_phase: string;
    phases: Array<{
      phase: string;
      start_date: string;
      end_date: string;
      is_active: boolean;
    }>;
  }>> => {
    return apiCall('/dashboard/timeline');
  },

  // Get categories with counts
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    return apiCall('/dashboard/categories');
  },
};

// Notifications API
export const notificationsAPI = {
  // Get user notifications
  getAll: async (params?: {
    page?: number;
    limit?: number;
    is_read?: boolean;
  }): Promise<ApiResponse<{
    notifications: Array<{
      id: string;
      type: string;
      title: string;
      message: string;
      is_read: boolean;
      priority: string;
      category: string;
      created_at: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.is_read !== undefined) queryParams.append('is_read', params.is_read.toString());
    
    return apiCall(`/user/notifications?${queryParams.toString()}`);
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<ApiResponse<{}>> => {
    return apiCall(`/user/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<ApiResponse<{}>> => {
    return apiCall('/user/notifications/read-all', {
      method: 'PUT',
    });
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<ApiResponse<{
    message: string;
    timestamp: string;
  }>> => {
    return apiCall('/health');
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  business: businessAPI,
  categories: categoriesAPI,
  applications: applicationsAPI,
  documents: documentsAPI,
  dashboard: dashboardAPI,
  notifications: notificationsAPI,
  health: healthAPI,
};
