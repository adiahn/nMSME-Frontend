import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Download, Users, FileText, Clock, Award, Star, BarChart3, TrendingUp } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const applications = [
    {
      id: 'APP001',
      businessName: 'TechHub Solutions',
      category: 'Information Technology (IT)',
      applicant: 'Amina Hassan',
      submittedDate: '2024-10-15',
      status: 'under-review',
      score: 85,
      location: 'Katsina'
    },
    {
      id: 'APP002',
      businessName: 'Green Farms Ltd',
      category: 'Agribusiness',
      applicant: 'Ibrahim Sani',
      submittedDate: '2024-10-14',
      status: 'approved',
      score: 92,
      location: 'Daura'
    },
    {
      id: 'APP003',
      businessName: 'YouthBiz Enterprise',
      category: 'Emerging Enterprise Award',
      applicant: 'Khadija Musa',
      submittedDate: '2024-10-13',
      status: 'pending',
      score: null,
      location: 'Funtua'
    },
    {
      id: 'APP004',
      businessName: 'Community Connect',
      category: 'Creative Enterprise',
      applicant: 'Usman Ahmad',
      submittedDate: '2024-10-12',
      status: 'rejected',
      score: 62,
      location: 'Katsina'
    },
    {
      id: 'APP005',
      businessName: 'GrowFast Trading',
      category: 'Light Manufacturing',
      applicant: 'Fatima Aliyu',
      submittedDate: '2024-10-11',
      status: 'under-review',
      score: 78,
      location: 'Malumfashi'
    }
  ];

  const stats = {
    totalApplications: 127,
    pendingReview: 45,
    approved: 28,
    rejected: 12,
    averageScore: 79.5
  };

  const categories = [
    'Fashion',
    'Information Technology (IT)', 
    'Agribusiness',
    'Food & Beverage',
    'Light Manufacturing',
    'Creative Enterprise',
    'Special Nano Category',
    'Emerging Enterprise Award'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'under-review': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const categoryMatch = selectedCategory === 'all' || app.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || app.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingReview}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications by Category</h3>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const count = applications.filter(app => app.category === category).length;
              const percentage = (count / applications.length) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {applications.slice(0, 5).map((app, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{app.businessName}</p>
                  <p className="text-sm text-gray-600">{app.category}</p>
                </div>
                <span className="text-xs text-gray-500">{app.submittedDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.id}</div>
                      <div className="text-sm text-gray-500">{app.submittedDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.businessName}</div>
                      <div className="text-sm text-gray-500">{app.applicant} • {app.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{app.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      <span className="capitalize">{app.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.score ? (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{app.score}%</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${app.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not scored</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FileText className="h-4 w-4" />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900">
                      <Star className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderJudging = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Judging Panel Dashboard</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">5 Judges</h4>
            <p className="text-gray-600">Active in evaluation</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900">45 Pending</h4>
            <p className="text-gray-600">Awaiting evaluation</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">28 Completed</h4>
            <p className="text-gray-600">Evaluations done</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Recent Evaluations</h4>
          {applications.filter(app => app.score).slice(0, 3).map((app, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">{app.businessName}</h5>
                <p className="text-sm text-gray-600">{app.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{app.score}%</p>
                <p className="text-sm text-gray-600">Final Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">This Month</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-600">+23%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Month</span>
              <span className="font-semibold">89 applications</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average per day</span>
              <span className="font-semibold">4.2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Geographic Distribution</h3>
          <div className="space-y-3">
            {['Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Dutsinma'].map((location, index) => {
              const count = Math.floor(Math.random() * 20) + 5;
              const percentage = (count / 100) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{location}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage applications, evaluate submissions, and oversee the awards process
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: <BarChart3 className="h-5 w-5" /> },
              { id: 'applications', name: 'Applications', icon: <FileText className="h-5 w-5" /> },
              { id: 'judging', name: 'Judging', icon: <Award className="h-5 w-5" /> },
              { id: 'reports', name: 'Reports', icon: <TrendingUp className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'applications' && renderApplications()}
        {activeTab === 'judging' && renderJudging()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default AdminPage;