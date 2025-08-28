# Judges Dashboard - nMSME Awards Portal

## Overview
The Judges Dashboard is a comprehensive web application that allows judges to review and score business applications for the nMSME Awards. It features a secure authentication system, anonymous application review, structured scoring, and offline capability.

## Features Implemented

### ✅ Core Functionality
- **Secure Authentication**: Judge login with mock credentials
- **Sector-based Assignment**: Judges only see applications from their assigned sector
- **Anonymous Review**: Applications are identified by codes, not business names
- **Structured Scoring**: 6-criteria rubric with 1-100 scoring scale
- **Conflict Declaration**: Mandatory conflict of interest reporting
- **Offline Support**: Draft scores saved locally when network unavailable

### ✅ User Interface
- **Responsive Design**: Mobile and desktop compatible
- **Tabbed Navigation**: Overview, Applications, Scoring, Conflict Declaration
- **Progress Tracking**: Visual indicators for application status
- **Real-time Updates**: Live score calculations and status changes

### ✅ Data Management
- **Mock Data Service**: Comprehensive sample applications across all sectors
- **Local Storage**: Offline data persistence and sync management
- **Export Functionality**: CSV export of scoring data
- **State Management**: React hooks for application state

## Technical Architecture

### File Structure
```
src/
├── pages/
│   ├── JudgeLoginPage.tsx          # Judge authentication
│   └── JudgeDashboardPage.tsx      # Main dashboard interface
├── services/
│   ├── judgeMockData.ts            # Mock application data
│   └── judgeOfflineStorage.ts      # Offline storage service
└── components/
    └── (existing components)
```

### Key Components

#### 1. JudgeLoginPage.tsx
- **Purpose**: Secure authentication for judges
- **Features**: Email/password login, demo credentials, error handling
- **Mock Credentials**: 5 judge accounts across different sectors

#### 2. JudgeDashboardPage.tsx
- **Purpose**: Main judging interface
- **Tabs**: Overview, Applications, Scoring, Conflict Declaration
- **Features**: Application review, scoring, status management

#### 3. judgeMockData.ts
- **Purpose**: Mock data service for development
- **Coverage**: All 7 award sectors with realistic applications
- **Data**: Business descriptions, achievements, impact metrics, media

#### 4. judgeOfflineStorage.ts
- **Purpose**: Offline data persistence and sync management
- **Features**: Local storage, sync queue, conflict resolution

## Scoring System

### Rubric Criteria (Total: 100%)
1. **Innovation & Differentiation** - 20%
2. **Market Traction & Growth** - 20%
3. **Impact & Job Creation** - 25%
4. **Financial Health & Governance** - 15%
5. **Inclusion & Sustainability** - 10%
6. **Scalability & Award Use** - 10%

### Scoring Scale
- **Range**: 0-100 for each criterion
- **Calculation**: Weighted average with automatic total computation
- **Validation**: Real-time score validation and error handling

## Mock Data

### Available Sectors
1. **Fashion** - 3 applications (F001, F002, F003)
2. **Information Technology (IT)** - 2 applications (IT001, IT002)
3. **Agribusiness** - 2 applications (AG001, AG002)
4. **Food & Beverage** - 1 application (FB001)
5. **Light Manufacturing** - 1 application (LM001)
6. **Creative Enterprise** - 1 application (CE001)

### Application Data
Each application includes:
- Business description and achievements
- Impact metrics (jobs created, women/youth percentage)
- Export activity and sustainability initiatives
- Award usage plans
- Product photos (mock placeholders)
- Video pitch links (YouTube/Vimeo)

## Demo Credentials

### Judge Accounts
```
Email: judge1@nmsme.com | Password: judge123 | Sector: Fashion
Email: judge2@nmsme.com | Password: judge123 | Sector: IT
Email: judge3@nmsme.com | Password: judge123 | Sector: Agribusiness
Email: judge4@nmsme.com | Password: judge123 | Sector: Food & Beverage
Email: judge5@nmsme.com | Password: judge123 | Sector: Light Manufacturing
```

### Access Instructions
1. Navigate to `/judge/login`
2. Use any judge email and password `judge123`
3. Access dashboard at `/judge/dashboard`

## Offline Capabilities

### Features
- **Draft Saving**: Scores automatically saved locally
- **Sync Queue**: Pending items tracked for online sync
- **Storage Management**: Local storage usage monitoring
- **Conflict Resolution**: Handles sync failures gracefully

### Storage Limits
- **Local Storage**: 5MB limit (browser standard)
- **Data Types**: Scores, conflict declarations, sync queue
- **Cleanup**: Automatic cleanup on logout

## User Experience Features

### Navigation
- **Tabbed Interface**: Easy switching between functions
- **Breadcrumbs**: Clear location indicators
- **Progress Tracking**: Visual application status indicators

### Scoring Interface
- **Side-by-side Layout**: Application details and scoring panel
- **Real-time Updates**: Live score calculations
- **Validation**: Input validation and error messages
- **Auto-save**: Automatic draft saving

### Conflict Declaration
- **Structured Forms**: Clear conflict type selection
- **Required Fields**: Mandatory information collection
- **Admin Notification**: Automatic conflict reporting

## Security Features

### Authentication
- **Session Management**: Secure login/logout handling
- **Role-based Access**: Sector-specific application access
- **Data Isolation**: Judges only see assigned applications

### Data Protection
- **Anonymous Review**: No business names visible
- **Local Storage**: Secure offline data handling
- **Conflict Management**: Proper conflict of interest handling

## Export Functionality

### CSV Export
- **Format**: Standard CSV with headers
- **Data**: Application codes, scores, status, totals
- **Filename**: Sector and date-based naming
- **Compatibility**: Excel, Google Sheets, etc.

### Export Fields
1. Application Code
2. Sector
3. Individual criterion scores
4. Total Score
5. Status

## Future Enhancements

### Planned Features
- **Multi-language Support**: Hausa language interface
- **Advanced Filtering**: Search and sort applications
- **Bulk Operations**: Multiple application management
- **Real-time Collaboration**: Judge communication tools

### Technical Improvements
- **API Integration**: Replace mock data with real backend
- **Performance**: Optimize large application lists
- **Accessibility**: Enhanced screen reader support
- **Mobile App**: Native mobile application

## Development Notes

### Mock Data Structure
- **Realistic Content**: Business descriptions based on actual sectors
- **Varied Applications**: Different statuses and completion levels
- **Media Links**: YouTube/Vimeo video examples
- **Impact Metrics**: Realistic job creation and sustainability data

### State Management
- **React Hooks**: useState, useEffect for component state
- **Local Storage**: Persistent data across sessions
- **Event Handling**: User interactions and data updates
- **Error Handling**: Graceful failure management

### Performance Considerations
- **Lazy Loading**: Applications loaded on demand
- **Memoization**: Score calculations optimized
- **Storage Monitoring**: Local storage usage tracking
- **Sync Management**: Efficient offline/online transitions

## Testing Instructions

### Manual Testing
1. **Login Flow**: Test all judge credentials
2. **Application Review**: Navigate through different applications
3. **Scoring System**: Test scoring validation and calculations
4. **Offline Mode**: Disconnect network and test local storage
5. **Export Function**: Test CSV download functionality

### Browser Testing
- **Chrome**: Primary development browser
- **Firefox**: Cross-browser compatibility
- **Safari**: Mobile and desktop testing
- **Edge**: Windows compatibility

## Deployment Notes

### Production Considerations
- **API Endpoints**: Replace mock service calls
- **Authentication**: Implement proper JWT/session management
- **Data Security**: Secure transmission and storage
- **Performance**: Production build optimization

### Environment Variables
- **API Base URL**: Backend service endpoint
- **Authentication**: JWT secret keys
- **Storage**: Local storage configuration
- **Features**: Feature flags for gradual rollout

## Support and Maintenance

### Documentation
- **Code Comments**: Inline documentation for complex logic
- **Type Definitions**: TypeScript interfaces for data structures
- **Error Handling**: Comprehensive error logging and user feedback
- **User Guides**: Step-by-step judge instructions

### Monitoring
- **Performance Metrics**: Load times and user interactions
- **Error Tracking**: Application errors and user feedback
- **Usage Analytics**: Feature usage and judge activity
- **Storage Monitoring**: Local storage usage patterns

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Ready for Testing

