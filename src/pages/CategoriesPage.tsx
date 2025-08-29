import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Users, TrendingUp, Star, Target, Users as UsersIcon, Zap, Globe, CheckCircle, ArrowRight, Clock, Trophy, Sparkles } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const categories = [
    {
      id: 'fashion',
      name: 'Fashion & Textiles',
      description: 'Excellence in fashion design, manufacturing, retail, and textile innovation',
      icon: <Sparkles className="h-8 w-8" />,
      color: 'pink',
      criteria: ['Design Innovation', 'Quality Craftsmanship', 'Market Impact', 'Sustainability Practices'],
      prize: '₦2,000,000',
      deadline: 'September 30, 2025',
      eligibility: 'Fashion designers, textile manufacturers, retail businesses',
      requirements: ['Business registration', 'Portfolio of work', 'Financial statements', 'Innovation documentation']
    },
    {
      id: 'it',
      name: 'Information Technology',
      description: 'Cutting-edge software, hardware, digital services, and tech innovation',
      icon: <Zap className="h-8 w-8" />,
      color: 'blue',
      criteria: ['Technical Innovation', 'User Experience', 'Scalability', 'Market Potential'],
      prize: '₦2,500,000',
      deadline: 'September 30, 2025',
      eligibility: 'Software developers, IT service providers, tech startups',
      requirements: ['Business registration', 'Product demos', 'Technical documentation', 'Market analysis']
    },
    {
      id: 'agribusiness',
      name: 'Agribusiness & Food',
      description: 'Agricultural innovation, food production, processing, and sustainability',
      icon: <Target className="h-8 w-8" />,
      color: 'green',
      criteria: ['Agricultural Innovation', 'Food Security', 'Environmental Impact', 'Economic Value'],
      prize: '₦2,000,000',
      deadline: 'September 30, 2025',
      eligibility: 'Farmers, food processors, agricultural tech companies',
      requirements: ['Business registration', 'Production records', 'Environmental compliance', 'Market reach data']
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing & Industry',
      description: 'Manufacturing excellence, industrial innovation, and production efficiency',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'purple',
      criteria: ['Production Efficiency', 'Quality Standards', 'Innovation', 'Market Competitiveness'],
      prize: '₦2,000,000',
      deadline: 'September 30, 2025',
      eligibility: 'Manufacturers, industrial companies, production businesses',
      requirements: ['Business registration', 'Quality certifications', 'Production data', 'Innovation records']
    },
    {
      id: 'services',
      name: 'Professional Services',
      description: 'Excellence in business services, consulting, and professional expertise',
      icon: <UsersIcon className="h-8 w-8" />,
      color: 'indigo',
      criteria: ['Service Quality', 'Customer Satisfaction', 'Innovation', 'Business Impact'],
      prize: '₦1,500,000',
      deadline: 'September 30, 2025',
      eligibility: 'Consultants, service providers, professional firms',
      requirements: ['Business registration', 'Client testimonials', 'Service portfolio', 'Impact metrics']
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      pink: 'from-pink-500 to-pink-600',
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  const getBgColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      pink: 'bg-pink-50 border-pink-200',
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      indigo: 'bg-indigo-50 border-indigo-200'
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Trophy className="w-4 h-4 mr-2" />
            Applications Open Now
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Award Categories
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-green-100">
            Five prestigious categories celebrating innovation, excellence, and impact across different business sectors
          </p>
          <p className="text-lg max-w-3xl mx-auto text-green-200">
            Each category is designed to recognize unique strengths and contributions to Katsina State's economic growth
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '5', label: 'Award Categories', icon: <Award className="h-8 w-8" />, color: 'green' },
              { number: '₦10M+', label: 'Total Prize Pool', icon: <Trophy className="h-8 w-8" />, color: 'yellow' },
              { number: '500+', label: 'Expected Applications', icon: <Users className="h-8 w-8" />, color: 'blue' },
              { number: '60', label: 'Days to Apply', icon: <Clock className="h-8 w-8" />, color: 'purple' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each category has specific criteria and requirements. Select the one that best matches your business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group">
                <div className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border ${getBgColorClasses(category.color)}`}>
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${getColorClasses(category.color)} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                          {category.icon}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{category.prize}</div>
                          <div className="text-sm opacity-90">Prize Money</div>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
                      <p className="text-white/90 leading-relaxed text-lg">{category.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Evaluation Criteria
                      </h4>
                      <ul className="space-y-3">
                        {category.criteria.map((criterion, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${getColorClasses(category.color)}`}></div>
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Eligibility</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{category.eligibility}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {category.requirements.map((req, index) => (
                          <li key={index} className="flex items-center text-gray-600 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full mr-2 bg-gray-400"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                        <span className="font-medium">Application Deadline</span>
                        <span className="font-bold text-gray-900">{category.deadline}</span>
                      </div>
                      
                      <Link 
                        to="/signup" 
                        className={`w-full bg-gradient-to-r ${getColorClasses(category.color)} text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center group-hover:shadow-xl`}
                      >
                        Apply for {category.name}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Timeline & Important Dates</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay on track with these key milestones for the 2025 Katsina nMSME Awards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                date: 'July 1, 2025',
                title: 'Applications Open',
                description: 'Start submitting your applications for the awards',
                icon: <Calendar className="h-8 w-8" />,
                color: 'green',
                status: 'Active'
              },
              {
                date: 'September 30, 2025',
                title: 'Applications Close',
                description: 'Final deadline for all award applications',
                icon: <Clock className="h-8 w-8" />,
                color: 'red',
                status: 'Deadline'
              },
              {
                date: 'October 15, 2025',
                title: 'Judging Begins',
                description: 'Expert panel starts evaluating applications',
                icon: <Users className="h-8 w-8" />,
                color: 'blue',
                status: 'Upcoming'
              },
              {
                date: 'November 30, 2025',
                title: 'Awards Ceremony',
                description: 'Celebration of winners and finalists',
                icon: <Award className="h-8 w-8" />,
                color: 'purple',
                status: 'Event'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 ${
                  item.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  item.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  item.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {item.icon}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  item.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  item.color === 'red' ? 'bg-red-500/20 text-red-400' :
                  item.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {item.status}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                <div className="text-xl font-bold text-white">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Showcase Your Excellence?
          </h2>
          <p className="text-xl mb-10 text-green-100 leading-relaxed max-w-4xl mx-auto">
            Join hundreds of outstanding businesses competing for recognition, rewards, and the opportunity to be part of Katsina State's business excellence story.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-green-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-2xl hover:shadow-3xl"
            >
              Start Your Application
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
            <Link 
              to="/about" 
              className="border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-green-700 transition-all inline-flex items-center justify-center backdrop-blur-sm"
            >
              Learn More About Awards
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;