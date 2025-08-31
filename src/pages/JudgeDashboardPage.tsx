import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Settings, 
  LogOut, 
  Calendar, 
  Trophy,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Star,
  Clock
} from 'lucide-react';
import { useUser } from '../App';
import { applicationsAPI } from '../services/api';

interface Application {
  id: string;
  business_name: string;
  category: string;
  sector: string;
  msme_strata: string;
  status: string;
  created_at: string;
  score?: number;
  reviewed_by?: string;
  review_date?: string;
}

interface JudgeStats {
  total_applications: number;
  reviewed_applications: number;
  pending_reviews: number;
  average_score: number;
  completion_rate: number;
  available_capacity: number;
}

interface ConflictDeclaration {
  id: string;
  business_name: string;
  reason: string;
  declared_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

const JudgeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userData: user, logout } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'reviewed' | 'settings'>('dashboard');
  const [activeCategory, setActiveCategory] = useState<string>('Fashion');
  const [applications, setApplications] = useState<Application[]>([]);
  const [reviewedApplications, setReviewedApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<JudgeStats>({
    total_applications: 0,
    reviewed_applications: 0,
    pending_reviews: 0,
    average_score: 0,
    completion_rate: 0,
    available_capacity: 0
  });
  const [lockedApplications, setLockedApplications] = useState<Set<string>>(new Set());
  const [conflicts, setConflicts] = useState<ConflictDeclaration[]>([]);
  const [showConflictForm, setShowConflictForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'list' | 'review' | 'scoring'>('list');
  const [scores, setScores] = useState({
    innovation: 0,
    marketTraction: 0,
    impact: 0,
    financialHealth: 0,
    inclusion: 0,
    scalability: 0
  });
  const [comments, setComments] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Available application categories/sectors
  const categories = [
    'Fashion',
    'Information Technology (IT)',
    'Agribusiness', 
    'Food & Beverage',
    'Light Manufacturing',
    'Creative Enterprise'
  ];

  // Helper functions for filtering and statistics
  const getFilteredApplications = (category: string, isReviewed: boolean = false) => {
    const sourceApplications = isReviewed ? reviewedApplications : applications;
    return sourceApplications.filter(app => app.sector === category);
  };

  const getCategoryStats = (category: string) => {
    const totalApps = applications.filter(app => app.sector === category).length;
    const reviewedApps = reviewedApplications.filter(app => app.sector === category).length;
    const lockedApps = applications.filter(app => app.sector === category && lockedApplications.has(app.id)).length;
    
    return { total: totalApps, reviewed: reviewedApps, locked: lockedApps, pending: totalApps - reviewedApps - lockedApps };
  };

  // Application locking functions
  const lockApplication = async (applicationId: string): Promise<boolean> => {
    try {
      const response = await applicationsAPI.lock(applicationId);
      
      if (response.success && response.data?.locked) {
        // Successfully locked - add to local state
        setLockedApplications(prev => new Set([...prev, applicationId]));
        return true;
      } else {
        // Lock failed - application might already be locked
        console.warn('Failed to lock application:', response.message);
        return false;
      }
    } catch (error: any) {
      console.error('Failed to lock application:', error);
      
      // Handle specific API errors
      if (error.status === 409) {
        // Conflict - application already locked
        return false;
      } else if (error.status === 403) {
        // Forbidden - judge not authorized for this application
        alert('You are not authorized to review this application.');
        return false;
      }
      
      // For API connection issues, fall back to mock behavior for now
      const isAlreadyLocked = lockedApplications.has(applicationId);
      if (isAlreadyLocked) {
        return false;
      }
      
      // Mock success as fallback
      setLockedApplications(prev => new Set([...prev, applicationId]));
      return true;
    }
  };

  const unlockApplication = async (applicationId: string): Promise<void> => {
    try {
      const response = await applicationsAPI.unlock(applicationId);
      
      if (response.success) {
        // Successfully unlocked - remove from local state
        setLockedApplications(prev => {
          const newSet = new Set(prev);
          newSet.delete(applicationId);
          return newSet;
        });
      } else {
        console.warn('Failed to unlock application:', response.message);
      }
    } catch (error) {
      console.error('Failed to unlock application:', error);
      
      // Fall back to mock behavior for API connection issues
      setLockedApplications(prev => {
        const newSet = new Set(prev);
        newSet.delete(applicationId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    // Check if user is authenticated and is a judge
    if (!user?.isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load judge data
    loadJudgeData();
  }, [user, navigate]);

  const loadJudgeData = async () => {
      try {
        // TODO: Replace with actual API calls
      // const response = await judgeAPI.getDashboard();
      // setStats(response.data.stats);
      // setApplications(response.data.applications);
        
        // Mock data for now
      setStats({
        total_applications: 45,
        reviewed_applications: 23,
        pending_reviews: 22,
        average_score: 8.2,
        completion_rate: 51.1,
        available_capacity: 15
      });
      
      // Mock pending applications (not yet reviewed)
      setApplications([
        {
          id: '1',
          business_name: 'Tech Solutions Ltd',
          category: 'Information Technology (IT)',
          sector: 'Information Technology (IT)',
          msme_strata: 'Small Enterprise',
          status: 'pending_review',
          created_at: '2024-01-15'
        },
        {
          id: '2',
          business_name: 'Fashion Forward Studio',
          category: 'Fashion',
          sector: 'Fashion',
          msme_strata: 'Micro Enterprise',
          status: 'pending_review',
          created_at: '2024-01-14'
        },
        {
          id: '3',
          business_name: 'Urban Farms Initiative',
          category: 'Agribusiness',
          sector: 'Agribusiness',
          msme_strata: 'Small Enterprise',
          status: 'pending_review',
          created_at: '2024-01-13'
        },
        {
          id: '4',
          business_name: 'Gourmet Foods Plus',
          category: 'Food & Beverage',
          sector: 'Food & Beverage',
          msme_strata: 'Medium Enterprise',
          status: 'pending_review',
          created_at: '2024-01-12'
        },
        {
          id: '5',
          business_name: 'Precision Manufacturing Co',
          category: 'Light Manufacturing',
          sector: 'Light Manufacturing',
          msme_strata: 'Small Enterprise',
          status: 'pending_review',
          created_at: '2024-01-11'
        },
        {
          id: '6',
          business_name: 'Creative Media Hub',
          category: 'Creative Enterprise',
          sector: 'Creative Enterprise',
          msme_strata: 'Micro Enterprise',
          status: 'pending_review',
          created_at: '2024-01-10'
        },
        {
          id: '7',
          business_name: 'Smart Tech Innovations',
          category: 'Information Technology (IT)',
          sector: 'Information Technology (IT)',
          msme_strata: 'Medium Enterprise',
          status: 'pending_review',
          created_at: '2024-01-09'
        },
        {
          id: '8',
          business_name: 'Sustainable Fashion Co',
          category: 'Fashion',
          sector: 'Fashion',
          msme_strata: 'Small Enterprise',
          status: 'pending_review',
          created_at: '2024-01-08'
        }
      ]);

      // Mock reviewed applications (completed reviews)
      setReviewedApplications([
        {
          id: 'r1',
          business_name: 'Digital Agency Pro',
          category: 'Information Technology (IT)',
          sector: 'Information Technology (IT)',
          msme_strata: 'Small Enterprise',
          status: 'completed',
          created_at: '2024-01-01',
          score: 85,
          reviewed_by: user?.fullName || 'Current Judge',
          review_date: '2024-01-20'
        },
        {
          id: 'r2',
          business_name: 'Artisan Clothing Co',
          category: 'Fashion',
          sector: 'Fashion',
          msme_strata: 'Micro Enterprise',
          status: 'completed',
          created_at: '2024-01-02',
          score: 78,
          reviewed_by: user?.fullName || 'Current Judge',
          review_date: '2024-01-19'
        },
        {
          id: 'r3',
          business_name: 'Organic Vegetables Farm',
          category: 'Agribusiness',
          sector: 'Agribusiness',
          msme_strata: 'Small Enterprise',
          status: 'completed',
          created_at: '2024-01-03',
          score: 92,
          reviewed_by: user?.fullName || 'Current Judge',
          review_date: '2024-01-18'
        },
        {
          id: 'r4',
          business_name: 'Healthy Snacks Ltd',
          category: 'Food & Beverage',
          sector: 'Food & Beverage',
          msme_strata: 'Medium Enterprise',
          status: 'completed',
          created_at: '2024-01-04',
          score: 81,
          reviewed_by: user?.fullName || 'Current Judge',
          review_date: '2024-01-17'
        },
        {
          id: 'r5',
          business_name: 'Custom Parts Manufacturing',
          category: 'Light Manufacturing',
          sector: 'Light Manufacturing',
          msme_strata: 'Small Enterprise',
          status: 'completed',
          created_at: '2024-01-05',
          score: 76,
          reviewed_by: user?.fullName || 'Current Judge',
          review_date: '2024-01-16'
        }
      ]);

      // Mock conflict data
      setConflicts([
        {
          id: '1',
          business_name: 'ABC Manufacturing',
          reason: 'Personal relationship with business owner',
          declared_at: '2025-08-20',
          status: 'approved'
        }
      ]);
      } catch (error) {
      console.error('Error loading judge data:', error);
      } finally {
        setIsLoading(false);
      }
    };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedApplication(null);
  };

  const handleViewApplication = (app: Application) => {
    setSelectedApplication(app);
    setCurrentView('review');
  };

  const handleStartScoring = () => {
    setCurrentView('scoring');
  };

  const handleScoreChange = (criteria: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [criteria]: value }));
  };

  const handleSubmitScores = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    console.log('Scores submitted:', { scores, totalScore, comments, reviewNotes });
    // TODO: Send to backend API
    alert(`Scores submitted successfully! Total: ${totalScore}/100`);
    setCurrentView('review');
  };

  const getTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName?.split(' ')[0]}!</h2>
            <p className="text-lg opacity-90">Ready to review some amazing applications?</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Current Phase</p>
            <p className="text-xl font-semibold">Review Period</p>
          </div>
        </div>
      </div>

      {/* Conflict Declaration Alert */}
      {conflicts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <span className="text-orange-600 font-bold">⚠️</span>
              </div>
                <div>
                <h3 className="text-lg font-semibold text-orange-800">Conflict of Interest Declared</h3>
                <p className="text-orange-700">You have {conflicts.length} conflict(s) declared. These applications cannot be reviewed.</p>
                </div>
              </div>
            <button
              onClick={() => setShowConflictForm(true)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              View Conflicts
            </button>
            </div>
          </div>
      )}
          
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_applications}</p>
                </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reviewed</p>
              <p className="text-2xl font-bold text-green-600">{stats.reviewed_applications}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
        </div>
      </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
      <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pending_reviews}</p>
              </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
              <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-purple-600">{stats.average_score}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.completion_rate}%</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <div className="w-6 h-6 text-indigo-600 font-bold">%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Capacity</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.available_capacity}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <div className="w-6 h-6 text-emerald-600 font-bold">+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                  <p className="font-medium text-red-800">Review Deadline</p>
                  <p className="text-sm text-red-600">Complete all reviews</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-red-600">2025-09-15</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                  <p className="font-medium text-blue-800">Awards Ceremony</p>
                  <p className="text-sm text-blue-600">Winners announcement</p>
              </div>
            </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-blue-600">TBD</p>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Applications</h3>
          <button 
            onClick={() => setActiveTab('applications')}
            className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {applications.slice(0, 3).map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{app.business_name}</h4>
                <p className="text-sm text-gray-600">{app.category} • {app.msme_strata}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                  app.status === 'pending_review' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {app.status.replace('_', ' ')}
                </span>
                {app.score && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{app.score}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Category Tabs Component
  const renderCategoryTabs = (isReviewed: boolean = false) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex px-6" aria-label="Tabs">
          {categories.map((category) => {
            const stats = getCategoryStats(category);
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-1 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  isActive
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="capitalize">
                    {category}
                  </span>
                  <div className="flex space-x-2 text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isReviewed ? stats.reviewed : stats.pending} {isReviewed ? 'reviewed' : 'pending'}
                    </span>
                    {!isReviewed && stats.locked > 0 && (
                      <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                        {stats.locked} locked
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  const renderApplications = () => {
    const filteredApplications = getFilteredApplications(activeCategory, false);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
            <p className="text-gray-600">Review and score applications assigned to you</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        {renderCategoryTabs(false)}

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => {
                    const isLocked = lockedApplications.has(app.id);
                    const canReview = !isLocked && app.status !== 'completed';
                    
                    return (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'pending_review' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {app.status.replace('_', ' ')}
                            </span>
                            {isLocked && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                🔒 Locked
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {app.score ? (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{app.score}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Not scored</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleViewApplication(app)}
                            className="text-green-600 hover:text-green-900 hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No applications found in {activeCategory} category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewedApplications = () => {
    const filteredReviewedApplications = getFilteredApplications(activeCategory, true);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reviewed Applications</h2>
            <p className="text-gray-600">Applications you have completed reviewing and scored</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviewed applications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        {renderCategoryTabs(true)}

        {/* Reviewed Applications List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviewedApplications.length > 0 ? (
                  filteredReviewedApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{app.score || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {app.review_date ? new Date(app.review_date).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewApplication(app)}
                            className="text-green-600 hover:text-green-900 hover:underline"
                          >
                            View Review
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedApplication(app);
                              setCurrentView('review');
                            }}
                            className="text-blue-600 hover:text-blue-900 hover:underline"
                          >
                            Edit Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No reviewed applications found in {activeCategory} category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your judge profile and preferences</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Judge Profile</h3>
      <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={user?.fullName || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={user?.phone || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Conflict Declaration Section */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Conflict of Interest</h3>
          <button
            onClick={() => setShowConflictForm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Declare Conflict
          </button>
        </div>
        {conflicts.length > 0 ? (
          <div className="space-y-3">
            {conflicts.map((conflict) => (
              <div key={conflict.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">{conflict.business_name}</p>
                    <p className="text-sm text-red-600">{conflict.reason}</p>
                    <p className="text-xs text-red-500">Declared: {new Date(conflict.declared_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    conflict.status === 'approved' ? 'bg-green-100 text-green-800' :
                    conflict.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {conflict.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No conflicts declared</p>
        )}
      </div>
    </div>
  );

  const renderConflictForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Declare Conflict of Interest</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              placeholder="Enter business name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Conflict</label>
            <textarea
              placeholder="Explain why you cannot review this application..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowConflictForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Declare Conflict
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderApplicationReview = () => {
    if (!selectedApplication) return null;

    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToList}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Application Review</h2>
              <p className="text-gray-600">Category: {selectedApplication.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedApplication.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
              selectedApplication.status === 'pending_review' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {selectedApplication.status.replace('_', ' ')}
                  </span>
            <button
              onClick={() => setShowConflictForm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Declare Conflict
            </button>
                </div>
        </div>

        {/* Application Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Business Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Overview */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <p className="text-sm text-gray-900 font-medium">{selectedApplication.business_name}</p>
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700">MSME Strata</label>
                  <p className="text-sm text-gray-900">{selectedApplication.msme_strata}</p>
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700">Sector</label>
                  <p className="text-sm text-gray-900">{selectedApplication.sector}</p>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-sm text-gray-900">{selectedApplication.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Application Date</label>
                  <p className="text-sm text-gray-900">{new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Status</label>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    selectedApplication.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                    selectedApplication.status === 'pending_review' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedApplication.status.replace('_', ' ')}
                    </span>
                </div>
              </div>
            </div>

            {/* Business Description */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    This is a sample business description that would come from the actual application data. 
                    In the real system, this would show the detailed business description provided by the applicant.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    Sample key achievements and milestones that demonstrate the business's success and impact.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Products/Services</label>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    Detailed description of the products or services offered by the business.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jobs Created</label>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Women/Youth %</label>
                  <p className="text-2xl font-bold text-blue-600">65%</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Export Activity</label>
                  <p className="text-sm text-gray-900">Active in regional markets</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sustainability</label>
                  <p className="text-sm text-gray-900">Green energy initiatives</p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">CAC Certificate</p>
                      <p className="text-sm text-gray-500">Business registration document</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View
                </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Business Plan</p>
                      <p className="text-sm text-gray-500">Strategic business planning document</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    View
                </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Product Photos</p>
                      <p className="text-sm text-gray-500">Visual representation of products</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    View (5)
                </button>
              </div>
            </div>
          </div>

            {/* Video Pitch */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Pitch</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">Video player would be embedded here</p>
                  <p className="text-sm text-gray-400">YouTube/Vimeo integration</p>
          </div>
              </div>
            </div>
          </div>

          {/* Right Column - Scoring Section */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleStartScoring}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Scoring
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save Progress
                </button>
                <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                  Flag for Review
                </button>
              </div>
            </div>

                         {/* Scoring Progress */}
             <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Scoring Progress</h3>
               <div className="space-y-3">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span>Innovation & Differentiation</span>
                     <span>{scores.innovation}/20</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{width: `${(scores.innovation / 20) * 100}%`}}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span>Market Traction & Growth</span>
                     <span>{scores.marketTraction}/20</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{width: `${(scores.marketTraction / 20) * 100}%`}}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span>Impact & Job Creation</span>
                     <span>{scores.impact}/25</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{width: `${(scores.impact / 25) * 100}%`}}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span>Financial Health & Governance</span>
                     <span>{scores.financialHealth}/15</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{width: `${(scores.financialHealth / 15) * 100}%`}}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span>Inclusion & Sustainability</span>
                     <span>{scores.inclusion}/10</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{width: `${(scores.inclusion / 10) * 100}%`}}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span>Scalability & Award Use</span>
                     <span>{scores.scalability}/10</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{width: `${(scores.scalability / 10) * 100}%`}}></div>
                   </div>
                 </div>
               </div>
               <div className="mt-4 pt-4 border-t border-gray-200">
                 <div className="flex justify-between text-lg font-semibold">
                   <span>Total Score</span>
                   <span className="text-green-600">{getTotalScore()}/100</span>
                 </div>
               </div>
             </div>
          </div>
      </div>
    </div>
  );
  };

  const renderScoringInterface = () => {
    if (!selectedApplication) return null;

    return (
    <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('review')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          <div>
              <h2 className="text-2xl font-bold text-gray-900">Score Application</h2>
              <p className="text-gray-600">{selectedApplication.business_name} • {selectedApplication.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Scoring Mode
            </span>
          </div>
        </div>

        {/* Scoring Rubric */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Scoring Rubric (100 points total)</h3>
          
          <div className="space-y-6">
            {/* Innovation & Differentiation */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium text-gray-900">
                  Innovation & Differentiation
                </label>
                <span className="text-2xl font-bold text-green-600">{scores.innovation}/20</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Evaluate the uniqueness of the business model, innovative approaches, and competitive differentiation
              </p>
            <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => handleScoreChange('innovation', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Poor</span>
                <span>10 - Average</span>
                <span>20 - Excellent</span>
          </div>
            </div>

            {/* Market Traction & Growth */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium text-gray-900">
                  Market Traction & Growth
                </label>
                <span className="text-2xl font-bold text-blue-600">{scores.marketTraction}/20</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Assess market validation, customer acquisition, revenue growth, and market expansion
              </p>
            <input
                type="range"
                min="0"
                max="20"
                value={scores.marketTraction}
                onChange={(e) => handleScoreChange('marketTraction', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Poor</span>
                <span>10 - Average</span>
                <span>20 - Excellent</span>
          </div>
            </div>

            {/* Impact & Job Creation */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium text-gray-900">
                  Impact & Job Creation
                </label>
                <span className="text-2xl font-bold text-purple-600">{scores.impact}/25</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Measure social impact, employment generation, community development, and economic contribution
              </p>
              <input
                type="range"
                min="0"
                max="25"
                value={scores.impact}
                onChange={(e) => handleScoreChange('impact', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Poor</span>
                <span>12 - Average</span>
                <span>25 - Excellent</span>
              </div>
            </div>

            {/* Financial Health & Governance */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium text-gray-900">
                  Financial Health & Governance
                </label>
                <span className="text-2xl font-bold text-indigo-600">{scores.financialHealth}/15</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Evaluate financial stability, governance practices, transparency, and risk management
              </p>
              <input
                type="range"
                min="0"
                max="15"
                value={scores.financialHealth}
                onChange={(e) => handleScoreChange('financialHealth', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Poor</span>
                <span>7 - Average</span>
                <span>15 - Excellent</span>
              </div>
            </div>

            {/* Inclusion & Sustainability */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium text-gray-900">
                  Inclusion & Sustainability
                </label>
                <span className="text-2xl font-bold text-emerald-600">{scores.inclusion}/10</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Assess diversity initiatives, environmental responsibility, and inclusive business practices
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={scores.inclusion}
                onChange={(e) => handleScoreChange('inclusion', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Poor</span>
                <span>5 - Average</span>
                <span>10 - Excellent</span>
              </div>
            </div>

            {/* Scalability & Award Use */}
            <div className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium text-gray-900">
                  Scalability & Award Use
                </label>
                <span className="text-2xl font-bold text-orange-600">{scores.scalability}/10</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Evaluate growth potential, expansion plans, and how the award will be utilized
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={scores.scalability}
                onChange={(e) => handleScoreChange('scalability', parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Poor</span>
                <span>5 - Average</span>
                <span>10 - Excellent</span>
              </div>
            </div>
          </div>

          {/* Total Score Display */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-gray-900">Total Score</h4>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{getTotalScore()}/100</div>
                <div className="text-sm text-gray-500">
                  {getTotalScore() >= 80 ? 'Excellent' : 
                   getTotalScore() >= 60 ? 'Good' : 
                   getTotalScore() >= 40 ? 'Average' : 'Needs Improvement'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments & Notes */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Feedback</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (max 1000 characters)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                maxLength={1000}
                placeholder="Provide detailed feedback and justification for scores..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {comments.length}/1000
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes (max 500 characters)
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Internal notes for your reference..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {reviewNotes.length}/500
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setCurrentView('review')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Review
          </button>
          <button
            onClick={handleSubmitScores}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Scores
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-green-800 to-green-900 shadow-xl z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        {/* Header Section */}
        <div className="p-6 border-b border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-white">nMSME</span>
              <p className="text-green-300 text-sm">Judge Portal</p>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-6 py-4">
          <nav className="space-y-4">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-green-700 text-white shadow-lg transform scale-[1.02]' 
                  : 'text-green-100 hover:bg-green-700 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('applications');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'applications' 
                  ? 'bg-green-700 text-white shadow-lg transform scale-[1.02]' 
                  : 'text-green-100 hover:bg-green-700 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Applications</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('reviewed');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'reviewed' 
                  ? 'bg-green-700 text-white shadow-lg transform scale-[1.02]' 
                  : 'text-green-100 hover:bg-green-700 hover:text-white'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span className="font-medium">Reviewed</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === 'settings' 
                  ? 'bg-green-700 text-white shadow-lg transform scale-[1.02]' 
                  : 'text-green-100 hover:bg-green-700 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>
        </div>

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Divider above logout */}
          <div className="mx-6 border-t border-green-700 mb-6"></div>
          <div className="px-6 pb-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen overflow-x-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {activeTab === 'dashboard' ? 'Dashboard' : 
                   activeTab === 'applications' ? 'Applications' : 
                   activeTab === 'reviewed' ? 'Reviewed Applications' : 'Settings'}
                </h1>
                {activeTab === 'dashboard' && (
                  <p className="text-sm lg:text-base text-gray-600">Welcome back, {user?.fullName}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                <p className="text-xs lg:text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-lg">
                  {user?.fullName?.charAt(0) || 'J'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
              {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'applications' && (
            currentView === 'list' ? renderApplications() : 
            currentView === 'review' ? renderApplicationReview() :
            currentView === 'scoring' ? renderScoringInterface() : renderApplications()
          )}
          {activeTab === 'reviewed' && (
            currentView === 'list' ? renderReviewedApplications() : 
            currentView === 'review' ? renderApplicationReview() :
            currentView === 'scoring' ? renderScoringInterface() : renderReviewedApplications()
          )}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>

      {/* Conflict Form Modal */}
      {showConflictForm && renderConflictForm()}
    </div>
  );
};

export default JudgeDashboardPage;
