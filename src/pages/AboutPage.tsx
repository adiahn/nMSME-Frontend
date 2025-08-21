import React from 'react';
import { Target, Eye, Heart, Users, Award, CheckCircle, MapPin, Calendar, Mail, Phone } from 'lucide-react';

const AboutPage: React.FC = () => {
  const objectives = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Recognize Excellence",
      description: "Identify and celebrate outstanding nano, micro, small, and medium enterprises demonstrating exceptional performance, innovation, and growth."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Foster Economic Growth",
      description: "Promote entrepreneurship and business development to drive economic growth and job creation in Katsina State."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community Impact",
      description: "Highlight businesses making significant positive contributions to their communities and society at large."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Inspire Innovation",
      description: "Encourage continuous innovation and best practices among businesses in the state."
    }
  ];

  const criteria = [
    "Business must be registered and operating in Katsina State",
    "Minimum of 2 years in operation (as of application deadline)",
    "Demonstrated financial sustainability and growth",
    "Positive impact on community and/or environment",
    "Innovation in products, services, or business processes",
    "Job creation and employment opportunities",
    "Compliance with tax obligations and regulatory requirements",
    "Ethical business practices and good governance"
  ];

  const timeline = [
    { phase: "Applications Open", date: "August 1, 2025", description: "Online application portal opens for all categories" },
    { phase: "Application Deadline", date: "September 30, 2025", description: "Final date for submission of complete applications" },
    { phase: "Initial Screening", date: "October 1-5, 2025", description: "Verification of eligibility and documentation" },
    { phase: "Evaluation Process", date: "October 6-15, 2025", description: "Expert panel evaluation and scoring" },
    { phase: "Final Selection", date: "October 16-20, 2025", description: "Final judging and winner selection" },
    { phase: "Awards Ceremony", date: "October 31, 2025", description: "Public announcement and awards presentation" }
  ];

  const judges = [
    {
      name: "Prof. Amina Bello",
      title: "Lead Judge",
      expertise: "Business Strategy & Innovation",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg"
    },
    {
      name: "Dr. Ibrahim Katsina",
      title: "Senior Judge",
      expertise: "Economic Development",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      name: "Hajiya Khadija Sani",
      title: "Industry Expert",
      expertise: "SME Development",
      image: "https://images.pexels.com/photos/3760091/pexels-photo-3760091.jpeg"
    },
    {
      name: "Malam Usman Ahmad",
      title: "Business Mentor",
      expertise: "Entrepreneurship",
      image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About nMSME Awards</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The Katsina State nMSME Awards recognize and celebrate exceptional businesses 
            that are driving economic growth, innovation, and positive community impact.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To recognize, celebrate, and support outstanding nano, micro, small, and medium enterprises 
              in Katsina State that demonstrate excellence in business operations, innovation, community impact, 
              and sustainable growth practices.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To create a thriving ecosystem of successful businesses in Katsina State that serve as 
              catalysts for economic development, job creation, and community transformation while 
              inspiring the next generation of entrepreneurs.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Objectives</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The key goals driving the nMSME Awards program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600 flex-shrink-0">
                    {objective.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{objective.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{objective.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Requirements businesses must meet to qualify for the awards
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{criterion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Awards Timeline</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important dates and milestones for the 2024 awards cycle
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-300"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-6">
                  <div className="bg-green-600 w-4 h-4 rounded-full relative z-10"></div>
                  <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.phase}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0 text-green-600 font-semibold">
                        <Calendar className="h-4 w-4 mr-2" />
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Judging Panel */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Judging Panel</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals and experts who will evaluate the applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {judges.map((judge, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-square">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{judge.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{judge.title}</p>
                  <p className="text-gray-600 text-sm">{judge.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-lg text-green-100 mb-6">
                Have questions about the awards program or need assistance with your application?
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-200" />
                  <span>Ministry of Commerce & Industry, Katsina State</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-200" />
                  <span>+234 xxx xxx xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-200" />
                  <span>awards@katsinanmsme.gov.ng</span>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Contact Support Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;