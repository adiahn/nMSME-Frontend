import React, { useState } from 'react';
import { Trophy, Medal, Award, Star, Users, MapPin, Calendar, ExternalLink, Crown, Sparkles } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock winners data
  const winners = [
    {
      id: 1,
      rank: 1,
      businessName: 'TechHub Solutions',
      ownerName: 'Dr. Amina Hassan',
      category: 'Information Technology (IT)',
      location: 'Katsina',
      description: 'Innovative software solutions provider specializing in digital transformation for SMEs.',
      prize: '₦2,000,000',
      year: '2024',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
      achievements: [
        '500+ clients served',
        '25% efficiency improvement',
        'Winner of National Tech Award 2023'
      ]
    },
    {
      id: 2,
      rank: 2,
      businessName: 'Green Farms Ltd',
      ownerName: 'Ibrahim Sani',
      category: 'Agribusiness',
      location: 'Daura',
      description: 'Sustainable farming solutions provider making agricultural technology accessible to farmers.',
      prize: '₦1,800,000',
      year: '2024',
      image: 'https://images.pexels.com/photos/9875439/pexels-photo-9875439.jpeg',
      achievements: [
        '200+ farmers supported',
        '60% increase in crop yields',
        'ISO 14001 certified'
      ]
    },
    {
      id: 3,
      rank: 3,
      businessName: 'Creative Studios',
      ownerName: 'Dr. Khadija Musa',
      category: 'Creative Enterprise',
      location: 'Funtua',
      description: 'Digital media and creative services company providing innovative solutions for businesses.',
      prize: '₦1,000,000',
      year: '2024',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg',
      achievements: [
        '100+ projects completed',
        '15 major brands served',
        'International recognition'
      ]
    },
    {
      id: 4,
      rank: 1,
      businessName: 'Fashion Forward',
      ownerName: 'Usman Ahmad',
      category: 'Fashion',
      location: 'Katsina',
      description: 'Contemporary fashion brand combining traditional designs with modern trends.',
      prize: '₦1,500,000',
      year: '2024',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      achievements: [
        '1,000+ customers served',
        '300+ unique designs created',
        '85% customer satisfaction rate'
      ]
    },
    {
      id: 5,
      rank: 1,
      businessName: 'ManufacturePro',
      ownerName: 'Fatima Aliyu',
      category: 'Light Manufacturing',
      location: 'Malumfashi',
      description: 'Light manufacturing company specializing in consumer goods production.',
      prize: '₦1,600,000',
      year: '2024',
      image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg',
      achievements: [
        '300% production growth',
        '150+ employees hired',
        'Expansion to 5 states'
      ]
    }
  ];

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

  const filteredWinners = winners.filter(winner => {
    const yearMatch = winner.year === selectedYear;
    const categoryMatch = selectedCategory === 'all' || winner.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return <Trophy className="h-8 w-8 text-blue-500" />;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-br from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-500 mr-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Award Winners</h1>
            <Sparkles className="h-8 w-8 text-yellow-500 ml-2" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the outstanding businesses that are driving innovation, growth, and positive impact in Katsina State
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="2024">2024 Winners</option>
                <option value="2023">2023 Winners</option>
              </select>

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
            </div>

            <div className="text-sm text-gray-600">
              <Calendar className="h-4 w-4 inline mr-1" />
              Awards Ceremony: October 31, 2025
            </div>
          </div>
        </div>

        {/* Winners Grid */}
        <div className="space-y-8">
          {filteredWinners.map((winner, index) => (
            <div key={winner.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
              <div className="relative">
                {/* Rank Badge */}
                <div className={`absolute top-6 left-6 z-10 ${getRankBackground(winner.rank)} text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg`}>
                  {getRankIcon(winner.rank)}
                  <span className="font-bold text-lg">
                    {winner.rank === 1 ? 'WINNER' : `${winner.rank}${winner.rank === 2 ? 'nd' : 'rd'} PLACE`}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  {/* Business Image & Info */}
                  <div>
                    <div className="aspect-video rounded-xl overflow-hidden mb-6">
                      <img
                        src={winner.image}
                        alt={winner.businessName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {winner.businessName}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{winner.ownerName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{winner.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {winner.category}
                        </span>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {winner.description}
                      </p>
                    </div>
                  </div>

                  {/* Achievements & Prize */}
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-gray-900">Prize Award</h4>
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">{winner.prize}</p>
                      <p className="text-gray-600 mt-1">Cash Prize + Mentorship Program</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-blue-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {winner.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start space-x-2">
                            <div className="bg-green-100 rounded-full p-1 mt-1">
                              <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium">
                        <ExternalLink className="h-4 w-4" />
                        <span>View Full Profile</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Inspired by Our Winners?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the next cohort of exceptional businesses competing for the 2025 Katsina nMSME Awards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Apply for 2025 Awards
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">127</h3>
              <p className="text-gray-600">Total Applications</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-gray-600">Winners Selected</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Jobs Created</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">₦6.75M</h3>
              <p className="text-gray-600">Total Prize Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;