import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Target, Users, Zap, CheckCircle, ArrowRight, Trophy, Gift, Calendar, Award, TrendingUp } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const categories = [
    {
      id: 1,
      icon: <Star className="h-12 w-12" />,
      title: "Fashion Award",
      description: "Recognizing excellence in fashion design, manufacturing, retail, and related services that demonstrate creativity, quality, and market innovation.",
      criteria: [
        "Design innovation and creativity",
        "Quality craftsmanship and materials",
        "Market presence and brand recognition",
        "Sustainable fashion practices"
      ],
      prize: "₦1,500,000",
      color: "pink",
      eligibility: "Fashion businesses of all sizes"
    },
    {
      id: 2,
      icon: <Target className="h-12 w-12" />,
      title: "Information Technology (IT) Award",
      description: "Celebrating innovation in software development, hardware solutions, digital services, and technology-driven business solutions.",
      criteria: [
        "Technological innovation and advancement",
        "Software/hardware development excellence",
        "Digital transformation impact",
        "Scalability and market potential"
      ],
      prize: "₦2,000,000",
      color: "blue",
      eligibility: "IT and technology companies"
    },
    {
      id: 3,
      icon: <Users className="h-12 w-12" />,
      title: "Agribusiness Award",
      description: "Honoring agricultural innovation, food production excellence, and sustainable farming practices that contribute to food security.",
      criteria: [
        "Agricultural innovation and technology",
        "Sustainable farming practices",
        "Food production efficiency",
        "Market access and distribution"
      ],
      prize: "₦1,800,000",
      color: "green",
      eligibility: "Agricultural and farming businesses"
    },
    {
      id: 4,
      icon: <Zap className="h-12 w-12" />,
      title: "Food & Beverage Award",
      description: "Supporting culinary excellence, beverage innovation, and food service businesses that demonstrate quality and innovation.",
      criteria: [
        "Culinary innovation and quality",
        "Food safety and hygiene standards",
        "Customer satisfaction and service",
        "Menu diversity and creativity"
      ],
      prize: "₦1,200,000",
      color: "orange",
      eligibility: "Food and beverage businesses"
    },
    {
      id: 5,
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Light Manufacturing Award",
      description: "Rewarding manufacturing excellence, industrial innovation, and production efficiency in light manufacturing sectors.",
      criteria: [
        "Manufacturing efficiency and quality",
        "Product innovation and design",
        "Operational excellence",
        "Market competitiveness"
      ],
      prize: "₦1,600,000",
      color: "purple",
      eligibility: "Light manufacturing businesses"
    },
    {
      id: 6,
      icon: <Award className="h-12 w-12" />,
      title: "Creative Enterprise Award",
      description: "Celebrating creativity in arts, media, entertainment, and creative industries that demonstrate artistic excellence and commercial viability.",
      criteria: [
        "Creative excellence and innovation",
        "Artistic quality and originality",
        "Commercial viability and market success",
        "Cultural impact and contribution"
      ],
      prize: "₦1,000,000",
      color: "yellow",
      eligibility: "Creative and artistic businesses"
    },
    {
      id: 7,
      icon: <Trophy className="h-12 w-12" />,
      title: "Special Nano Category",
      description: "Recognizing micro-enterprises with exceptional potential, innovative ideas, and strong growth prospects despite limited resources.",
      criteria: [
        "Innovative business concept",
        "Resource efficiency and creativity",
        "Growth potential and scalability",
        "Community impact and sustainability"
      ],
      prize: "₦500,000",
      color: "indigo",
      eligibility: "Micro-enterprises with limited resources"
    },
    {
      id: 8,
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Emerging Enterprise Award",
      description: "Supporting promising startups and emerging businesses that show exceptional potential for growth and market disruption.",
      criteria: [
        "Innovative business model",
        "Market disruption potential",
        "Scalability and growth prospects",
        "Leadership and vision"
      ],
      prize: "₦800,000",
      color: "teal",
      eligibility: "Startups and emerging businesses"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "border-blue-200 bg-blue-50",
      green: "border-green-200 bg-green-50",
      purple: "border-purple-200 bg-purple-50",
      orange: "border-orange-200 bg-orange-50",
      pink: "border-pink-200 bg-pink-50",
      yellow: "border-yellow-200 bg-yellow-50",
      indigo: "border-indigo-200 bg-indigo-50",
      teal: "border-teal-200 bg-teal-50"
    };
    return colorMap[color] || "border-gray-200 bg-gray-50";
  };

  const getIconColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      orange: "text-orange-600",
      pink: "text-pink-600",
      yellow: "text-yellow-600",
      indigo: "text-indigo-600",
      teal: "text-teal-600"
    };
    return colorMap[color] || "text-gray-600";
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Award Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the five prestigious categories in the Katsina State nMSME Awards. 
            Each category celebrates different aspects of business excellence and innovation.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((category, index) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className={`${getColorClasses(category.color)} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border`}>
                      <div className={getIconColor(category.color)}>
                        {category.icon}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {category.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        <span className="text-yellow-800 font-semibold">{category.prize}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <Users className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700 text-sm">{category.eligibility}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Evaluation Criteria</h3>
                    <ul className="space-y-3 mb-6">
                      {category.criteria.map((criterion, criterionIndex) => (
                        <li key={criterionIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to="/apply" 
                      state={{ selectedCategory: category.id }}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
                    >
                      Apply for this Category
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline & Important Dates */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mark your calendar with these key dates for the 2024 Katsina nMSME Awards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                date: "Aug 1, 2025",
                title: "Applications Open",
                description: "Submit your applications across all categories"
              },
              {
                date: "Sep 30, 2025",
                title: "Deadline",
                description: "Final date for application submissions"
              },
              {
                date: "Oct 15, 2025",
                title: "Evaluation Complete",
                description: "Judging process completed, results finalized"
              },
              {
                date: "Oct 31, 2025",
                title: "Awards Ceremony",
                description: "Winners announced and awards presented"
              }
            ].map((event, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{event.date}</h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose your category and start your journey toward business excellence recognition
          </p>
          <Link 
            to="/apply" 
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center"
          >
            Start Application Process
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;