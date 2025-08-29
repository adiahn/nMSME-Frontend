import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Award, 
  Settings, 
  LogOut, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  TrendingUp,
  Users,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  Info
} from 'lucide-react';
import { useUser } from '../App';
import { dashboardAPI, applicationsAPI, userAPI } from '../services/api';
import type { Application, ApplicationStats } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  // Dashboard data
  const [stats, setStats] = useState<ApplicationStats>({
    total_applications: 0,
    submitted: 0,
    draft: 0,
    under_review: 0,
    average_score: 0
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [overview, setOverview] = useState({
    total_applications: 0,
    total_categories: 8,
    current_phase: 'Application Period',
    submission_deadline: '2025-09-20'
  });

  // Handle sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Load user statistics
        const statsResponse = await userAPI.getApplicationStats();
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        }

        // Load user applications
        const appsResponse = await applicationsAPI.getAll();
        if (appsResponse.success && appsResponse.data) {
          setApplications(appsResponse.data.applications);
        }

        // Load public overview
        const overviewResponse = await dashboardAPI.getOverview();
        if (overviewResponse.success && overviewResponse.data) {
          setOverview(overviewResponse.data);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // Use fallback data for demo
        setStats({
          total_applications: 2,
          submitted: 1,
          draft: 1,
          under_review: 0,
          average_score: 85
        });
        setOverview({
          total_applications: 1250,
          total_categories: 8,
          current_phase: 'Application Period',
          submission_deadline: '2024-12-31'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    setUserData({
      fullName: '',
      email: '',
      phone: '',
      isAuthenticated: false
    });
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateApplication = () => {
    setShowApplicationForm(true);
  };

  const handleApplicationComplete = () => {
    setShowApplicationForm(false);
    // Reload applications data by triggering a re-render
    window.location.reload();
  };

  const handleApplicationCancel = () => {
    setShowApplicationForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-50';
      case 'under_review': return 'text-yellow-600 bg-yellow-50';
      case 'shortlisted': return 'text-purple-600 bg-purple-50';
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'draft': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="h-4 w-4" />;
      case 'under_review': return <Eye className="h-4 w-4" />;
      case 'shortlisted': return <Award className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'draft': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {userData.fullName.split(' ')[0]}!</h1>
            <p className="text-green-100 text-base lg:text-lg">Ready to showcase your business excellence?</p>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-green-100 text-sm lg:text-base">Current Phase</p>
            <p className="text-xl lg:text-2xl font-bold">{overview.current_phase}</p>
          </div>
        </div>
              </div>

      {/* Important Dates */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">Application Deadline</p>
                <p className="text-sm text-gray-600">Submit your applications</p>
              </div>
              </div>
            <p className="text-red-600 font-semibold">{overview.submission_deadline}</p>
              </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Awards Ceremony</p>
                <p className="text-sm text-gray-600">Winners announcement</p>
              </div>
            </div>
            <p className="text-blue-600 font-semibold">TBD</p>
                </div>
              </div>
                </div>
              </div>
  );

  const renderApplications = () => {
    if (showApplicationForm) {
      return (
        <ApplicationForm 
          onComplete={handleApplicationComplete}
          onCancel={handleApplicationCancel}
        />
      );
    }

    return (
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">My Applications</h2>
          {applications.length === 0 && (
            <button
              onClick={handleCreateApplication}
              className="bg-green-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm lg:text-base">New Application</span>
            </button>
          )}
              </div>

        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-md border border-green-100 p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                  {/* Left Section - Main Content */}
                  <div className="flex-1">
                    {/* Header with Category and Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <h3 className="text-2xl font-bold text-gray-900">{app.category}</h3>
                        </div>
                        <p className="text-lg text-gray-700 font-medium">{app.business_name}</p>
              </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="capitalize">{(app.status || 'submitted').replace('_', ' ')}</span>
                        </span>
                      </div>
              </div>

                                         {/* Key Metrics Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <div className="bg-white rounded-lg p-3 border border-green-100 shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                           <span className="text-xs font-medium text-gray-600">Sector</span>
                           <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                             <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                             </svg>
              </div>
              </div>
                         <p className="text-sm font-semibold text-gray-900">{app.sector}</p>
              </div>

                       <div className="bg-white rounded-lg p-3 border border-green-100 shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                           <span className="text-xs font-medium text-gray-600">MSME Strata</span>
                           <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                             <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                               <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                             </svg>
              </div>
            </div>
                         <p className="text-sm font-semibold text-gray-900 capitalize">{app.msme_strata}</p>
                       </div>
                </div>
              </div>
                </div>
              </div>
            ))}
            
            {/* Success Notification */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
              </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Application Successfully Submitted! 🎉</h3>
                  <p className="text-green-700 leading-relaxed">
                    Your application has been successfully submitted and is now under review. 
                    <span className="font-semibold"> You can only submit one application.</span> 
                    Our team will carefully review your application and contact you with updates on your progress.
                  </p>
                </div>
              </div>
            </div>
                </div>
        ) : (
          <div className="text-center py-8 lg:py-12">
            <FileText className="h-12 w-12 lg:h-16 lg:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-sm lg:text-base text-gray-600">Start your journey by creating your first application</p>
                  </div>
                )}
              </div>
    );
  };

  const renderProfile = () => (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Profile Settings</h2>
      
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
              type="text"
              value={userData.fullName}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm lg:text-base"
              readOnly
                />
              </div>
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
              type="email"
              value={userData.email}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm lg:text-base"
              readOnly
                />
              </div>
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
              type="tel"
              value={userData.phone}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm lg:text-base"
              readOnly
                />
              </div>
              </div>
              </div>

      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-3 lg:space-y-4">
          <button className="w-full text-left p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
              <div>
                  <p className="font-medium text-gray-900 text-sm lg:text-base">Change Password</p>
                  <p className="text-xs lg:text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
                  </div>
            </button>

              <button
            onClick={handleLogout}
            className="w-full text-left p-3 lg:p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LogOut className="h-4 w-4 lg:h-5 lg:w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900 text-sm lg:text-base">Logout</p>
                  <p className="text-xs lg:text-sm text-red-600">Sign out of your account</p>
            </div>
          </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
            <span className="text-lg lg:text-xl font-bold text-gray-900">nMSME</span>
              </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          </div>

        <nav className="mt-6 px-3">
          <div className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('applications');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === 'applications' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">Applications</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('profile');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
          </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
              <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 transition-margin duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                  {activeTab === 'overview' && 'Dashboard'}
                  {activeTab === 'applications' && 'Applications'}
                  {activeTab === 'profile' && 'Profile Settings'}
              </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  Welcome back, {userData.fullName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{userData.fullName}</p>
                <p className="text-xs text-gray-600">{userData.email}</p>
            </div>
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userData.fullName.charAt(0).toUpperCase()}
                </span>
          </div>
        </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3 text-gray-600">Loading dashboard...</span>
        </div>
          ) : (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'applications' && renderApplications()}
              {activeTab === 'profile' && renderProfile()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;