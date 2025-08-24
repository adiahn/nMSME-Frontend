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
    submission_deadline: '2024-12-31'
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
          <button
            onClick={handleCreateApplication}
            className="bg-green-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm lg:text-base">New Application</span>
          </button>
        </div>

        {applications.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="hidden sm:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.category}</div>
                        <div className="sm:hidden text-xs text-gray-500 mt-1">
                          {new Date(app.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1">{app.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="hidden lg:table-cell px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stats.average_score || 0}%
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          {app.status === 'draft' && (
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
                          {app.status === 'draft' && (
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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