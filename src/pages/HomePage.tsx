import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Trophy, Users, Calendar, CheckCircle, ArrowRight, Star, Target, Zap, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Katsina State nMSME
              <span className="block text-yellow-400">Awards 2025</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Celebrating Excellence in Nano, Micro, Small & Medium Enterprises
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-green-100">
              Join us in recognizing outstanding businesses that are driving innovation, 
              creating jobs, and fostering economic growth in Katsina State.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-yellow-500 text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Apply for Awards
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/categories" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-900 transition-all inline-flex items-center justify-center"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">8</h3>
              <p className="text-gray-600">Award Categories</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Expected Applications</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Oct 2025</h3>
              <p className="text-gray-600">Awards Ceremony</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Award Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Five distinct categories celebrating different aspects of business excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8" />,
                title: "Fashion",
                description: "Recognizing excellence in fashion design, manufacturing, and retail",
                color: "pink"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Information Technology (IT)",
                description: "Celebrating innovation in software, hardware, and digital services",
                color: "blue"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Agribusiness",
                description: "Honoring agricultural innovation and food production excellence",
                color: "green"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Food & Beverage",
                description: "Supporting culinary excellence and beverage innovation",
                color: "orange"
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Light Manufacturing",
                description: "Rewarding manufacturing excellence and industrial innovation",
                color: "purple"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Creative Enterprise",
                description: "Celebrating creativity in arts, media, and entertainment",
                color: "yellow"
              },
              {
                icon: <Trophy className="h-8 w-8" />,
                title: "Special Nano Category",
                description: "Recognizing micro-enterprises with exceptional potential",
                color: "indigo"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Emerging Enterprise Award",
                description: "Supporting promising startups and emerging businesses",
                color: "teal"
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
                <div className={`bg-${category.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-${category.color}-600`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/categories" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
            >
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to submit your application and join the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Profile",
                description: "Register your business and complete your profile with all necessary information"
              },
              {
                step: "02",
                title: "Submit Application",
                description: "Choose your category and submit your application with required documents"
              },
              {
                step: "03",
                title: "Evaluation & Results",
                description: "Expert judges evaluate applications and winners are announced publicly"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Showcase Your Excellence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to be recognized for your outstanding business achievements
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center"
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;