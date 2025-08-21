import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ApplicationPage from './pages/ApplicationPage';
import AdminPage from './pages/AdminPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

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
          <Route path="/apply" element={<ApplicationPage />} />
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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;