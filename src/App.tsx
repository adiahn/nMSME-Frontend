import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AdminPage from './pages/AdminPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

// User context for managing user data globally
interface UserData {
  fullName: string;
  email: string;
  phone: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  userData: UserData;
  setUserData: (data: UserData) => void;
  updateUserData: (updates: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Load user data from localStorage on app start
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      email: '',
      phone: '',
      isAuthenticated: false
    };
  });

  const updateUserData = (updates: Partial<UserData>) => {
    const newData = { ...userData, ...updates };
    setUserData(newData);
    localStorage.setItem('userData', JSON.stringify(newData));
  };

  const setUserDataHandler = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      setUserData: setUserDataHandler, 
      updateUserData 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Pages that should not show header and footer
const AUTH_PAGES = ['/signup', '/login', '/dashboard'];

function AppContent() {
  const location = useLocation();
  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;