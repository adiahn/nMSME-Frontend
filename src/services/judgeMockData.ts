// Mock data service for Judges Dashboard
// This simulates the backend API responses for different sectors

export interface MockApplication {
  id: string;
  code: string;
  sector: string;
  status: 'assigned' | 'in_progress' | 'completed';
  business_description: string;
  key_achievements: string;
  impact_metrics: {
    jobs_created: number;
    women_youth_percentage: number;
    export_activity: boolean;
    sustainability_initiatives: boolean;
  };
  award_usage_plans: string;
  product_photos: string[];
  pitch_video: {
    url: string;
    platform: 'youtube' | 'vimeo';
  };
  submitted_at: string;
}

// Mock applications for Fashion sector
const fashionApplications: MockApplication[] = [
  {
    id: 'f1',
    code: 'F001',
    sector: 'Fashion',
    status: 'assigned',
    business_description: 'Innovative fashion design company specializing in sustainable materials and traditional Nigerian patterns. We create unique clothing that combines modern aesthetics with cultural heritage.',
    key_achievements: 'Launched 3 successful collections, employed 15 local artisans, achieved 40% revenue growth in 2 years, won local design competition.',
    impact_metrics: {
      jobs_created: 15,
      women_youth_percentage: 80,
      export_activity: true,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Expand production capacity, develop online sales platform, train additional artisans, establish retail outlets in major cities.',
    product_photos: ['fashion1.jpg', 'fashion2.jpg', 'fashion3.jpg'],
    pitch_video: {
      url: 'https://youtube.com/watch?v=abc123',
      platform: 'youtube'
    },
    submitted_at: '2024-12-15T10:30:00Z'
  },
  {
    id: 'f2',
    code: 'F002',
    sector: 'Fashion',
    status: 'in_progress',
    business_description: 'Bespoke tailoring service focusing on corporate wear and traditional attire. We provide personalized fitting and high-quality craftsmanship.',
    key_achievements: 'Served 200+ corporate clients, maintained 95% customer satisfaction, trained 8 apprentices, expanded to 2 locations.',
    impact_metrics: {
      jobs_created: 12,
      women_youth_percentage: 60,
      export_activity: false,
      sustainability_initiatives: false
    },
    award_usage_plans: 'Modernize equipment, implement digital measurement system, expand to wedding wear market, establish online booking system.',
    product_photos: ['fashion4.jpg', 'fashion5.jpg'],
    pitch_video: {
      url: 'https://vimeo.com/123456',
      platform: 'vimeo'
    },
    submitted_at: '2024-12-14T14:20:00Z'
  },
  {
    id: 'f3',
    code: 'F003',
    sector: 'Fashion',
    status: 'completed',
    business_description: 'Accessories manufacturing company creating handbags, jewelry, and footwear using locally sourced materials.',
    key_achievements: 'Exported to 3 countries, created 25 jobs, established supply chain with 50 local suppliers, achieved ISO certification.',
    impact_metrics: {
      jobs_created: 25,
      women_youth_percentage: 75,
      export_activity: true,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Expand product range, establish flagship store, develop e-commerce platform, increase export markets.',
    product_photos: ['fashion6.jpg', 'fashion7.jpg', 'fashion8.jpg', 'fashion9.jpg'],
    pitch_video: {
      url: 'https://youtube.com/watch?v=def456',
      platform: 'youtube'
    },
    submitted_at: '2024-12-13T09:15:00Z'
  }
];

// Mock applications for IT sector
const itApplications: MockApplication[] = [
  {
    id: 'it1',
    code: 'IT001',
    sector: 'Information Technology (IT)',
    status: 'assigned',
    business_description: 'Software development company specializing in educational technology solutions for Nigerian schools. We create interactive learning platforms and student management systems.',
    key_achievements: 'Deployed solutions in 50+ schools, trained 200+ teachers, achieved 60% improvement in student engagement, won national edtech award.',
    impact_metrics: {
      jobs_created: 18,
      women_youth_percentage: 65,
      export_activity: false,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Scale to 200+ schools, develop mobile apps, establish training academy, expand to other African countries.',
    product_photos: ['it1.jpg', 'it2.jpg', 'it3.jpg'],
    pitch_video: {
      url: 'https://youtube.com/watch?v=it123',
      platform: 'youtube'
    },
    submitted_at: '2024-12-15T11:00:00Z'
  },
  {
    id: 'it2',
    code: 'IT002',
    sector: 'Information Technology (IT)',
    status: 'in_progress',
    business_description: 'Digital marketing agency providing comprehensive online marketing solutions for small businesses. We specialize in social media management and SEO optimization.',
    key_achievements: 'Managed 100+ client accounts, achieved average 300% ROI increase, trained 30 digital marketers, expanded to 3 cities.',
    impact_metrics: {
      jobs_created: 22,
      women_youth_percentage: 70,
      export_activity: false,
      sustainability_initiatives: false
    },
    award_usage_plans: 'Develop AI-powered marketing tools, establish digital marketing academy, expand to international markets, launch SaaS platform.',
    product_photos: ['it4.jpg', 'it5.jpg'],
    pitch_video: {
      url: 'https://vimeo.com/it456',
      platform: 'vimeo'
    },
    submitted_at: '2024-12-14T15:30:00Z'
  }
];

// Mock applications for Agribusiness sector
const agribusinessApplications: MockApplication[] = [
  {
    id: 'ag1',
    code: 'AG001',
    sector: 'Agribusiness',
    status: 'assigned',
    business_description: 'Organic farming cooperative focusing on sustainable agriculture practices. We grow vegetables, grains, and fruits using traditional and modern farming techniques.',
    key_achievements: 'Established 100-acre organic farm, employed 40 local farmers, achieved organic certification, supplied 20+ markets.',
    impact_metrics: {
      jobs_created: 40,
      women_youth_percentage: 85,
      export_activity: true,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Expand farm size, implement smart farming technology, establish processing facility, develop export channels.',
    product_photos: ['ag1.jpg', 'ag2.jpg', 'ag3.jpg', 'ag4.jpg'],
    pitch_video: {
      url: 'https://youtube.com/watch?v=ag123',
      platform: 'youtube'
    },
    submitted_at: '2024-12-15T09:15:00Z'
  },
  {
    id: 'ag2',
    code: 'AG002',
    sector: 'Agribusiness',
    status: 'completed',
    business_description: 'Poultry farming enterprise specializing in free-range chicken and egg production. We focus on quality and sustainable farming practices.',
    key_achievements: 'Built 10,000 bird capacity farm, achieved 95% survival rate, supplied 5 major supermarkets, trained 15 farmers.',
    impact_metrics: {
      jobs_created: 20,
      women_youth_percentage: 55,
      export_activity: false,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Expand farm capacity, establish hatchery, develop value-added products, establish retail outlets.',
    product_photos: ['ag5.jpg', 'ag6.jpg'],
    pitch_video: {
      url: 'https://vimeo.com/ag456',
      platform: 'vimeo'
    },
    submitted_at: '2024-12-13T10:45:00Z'
  }
];

// Mock applications for Food & Beverage sector
const foodBeverageApplications: MockApplication[] = [
  {
    id: 'fb1',
    code: 'FB001',
    sector: 'Food & Beverage',
    status: 'assigned',
    business_description: 'Traditional Nigerian restaurant chain specializing in local cuisine with modern presentation. We preserve cultural recipes while adapting to contemporary dining trends.',
    key_achievements: 'Opened 5 restaurant locations, served 50,000+ customers, employed 45 staff, won regional food awards.',
    impact_metrics: {
      jobs_created: 45,
      women_youth_percentage: 75,
      export_activity: false,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Expand to 10 locations, develop franchise model, establish catering service, launch food delivery app.',
    product_photos: ['fb1.jpg', 'fb2.jpg', 'fb3.jpg'],
    pitch_video: {
      url: 'https://youtube.com/watch?v=fb123',
      platform: 'youtube'
    },
    submitted_at: '2024-12-15T12:00:00Z'
  }
];

// Mock applications for Light Manufacturing sector
const lightManufacturingApplications: MockApplication[] = [
  {
    id: 'lm1',
    code: 'LM001',
    sector: 'Light Manufacturing',
    status: 'assigned',
    business_description: 'Furniture manufacturing company creating custom wooden furniture using sustainable materials. We combine traditional craftsmanship with modern design.',
    key_achievements: 'Produced 500+ custom pieces, employed 25 craftsmen, achieved 80% customer satisfaction, established showroom.',
    impact_metrics: {
      jobs_created: 25,
      women_youth_percentage: 40,
      export_activity: true,
      sustainability_initiatives: true
    },
    award_usage_plans: 'Expand production capacity, establish online store, develop furniture design software, increase export markets.',
    product_photos: ['lm1.jpg', 'lm2.jpg', 'lm3.jpg', 'lm4.jpg', 'lm5.jpg'],
    pitch_video: {
      url: 'https://youtube.com/watch?v=lm123',
      platform: 'youtube'
    },
    submitted_at: '2024-12-15T13:30:00Z'
  }
];

// Mock applications for Creative Enterprise sector
const creativeEnterpriseApplications: MockApplication[] = [
  {
    id: 'ce1',
    code: 'CE001',
    sector: 'Creative Enterprise',
    status: 'assigned',
    business_description: 'Digital art and animation studio creating content for advertising, entertainment, and educational sectors. We specialize in 2D and 3D animation.',
    key_achievements: 'Completed 100+ projects, worked with 30+ clients, employed 20 artists, won industry awards.',
    impact_metrics: {
      jobs_created: 20,
      women_youth_percentage: 60,
      export_activity: true,
      sustainability_initiatives: false
    },
    award_usage_plans: 'Expand studio capacity, develop animation training academy, establish international partnerships, launch online courses.',
    product_photos: ['ce1.jpg', 'ce2.jpg', 'ce3.jpg'],
    pitch_video: {
      url: 'https://vimeo.com/ce123',
      platform: 'vimeo'
    },
    submitted_at: '2024-12-15T14:15:00Z'
  }
];

// Function to get applications by sector
export const getApplicationsBySector = (sector: string): MockApplication[] => {
  switch (sector) {
    case 'Fashion':
      return fashionApplications;
    case 'Information Technology (IT)':
      return itApplications;
    case 'Agribusiness':
      return agribusinessApplications;
    case 'Food & Beverage':
      return foodBeverageApplications;
    case 'Light Manufacturing':
      return lightManufacturingApplications;
    case 'Creative Enterprise':
      return creativeEnterpriseApplications;
    default:
      return fashionApplications; // Default fallback
  }
};

// Function to get all applications (for admin view)
export const getAllApplications = (): MockApplication[] => {
  return [
    ...fashionApplications,
    ...itApplications,
    ...agribusinessApplications,
    ...foodBeverageApplications,
    ...lightManufacturingApplications,
    ...creativeEnterpriseApplications
  ];
};

// Function to get application statistics by sector
export const getSectorStatistics = (sector: string) => {
  const applications = getApplicationsBySector(sector);
  return {
    total: applications.length,
    assigned: applications.filter(app => app.status === 'assigned').length,
    in_progress: applications.filter(app => app.status === 'in_progress').length,
    completed: applications.filter(app => app.status === 'completed').length
  };
};

