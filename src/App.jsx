import React, { useState, useEffect } from 'react';

import SideBar from './components/SideBar';
import RightSidebar from './components/RightSideBar';
import Header from './components/Header';
import Footer from './components/Footer';

import DashboardPage from './pages/DashboardPage';
import CompaniesPage from './pages/CompanyPage';
import ProjectPage from './pages/ProjectPage';
import DevicePage from './pages/DevicePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import MessagesPage from './pages/MessagesPage';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [screenSize,setScreenSize] = useState('medium')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isRightCollapsed, setIsRightCollapsed] = useState(true); // Web'de ilk açılışta kapalı (daraltılmış)
  const [isRightOpen, setIsRightOpen] = useState(false); // Mobilde alt tab penceresi durumu
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'dark');
  const isDark = theme === 'dark';
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tema değiştiğinde yakalamak için window event'ini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem('app_theme') || 'dark';
      setTheme(savedTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    // Aynı pencere içi değişimler için kendi event'imiz
    window.addEventListener('themeChanged', (e) => setTheme(e.detail));

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChanged', (e) => setTheme(e.detail));
    };
  }, []);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (toPath) => {
    window.history.pushState({}, '', toPath);
    setPath(toPath);
  };

  // Boyuta göre kök font boyutunu değiştirebiliriz
  const getRootFontSize = () => {
    switch (screenSize) {
      case 'small': return '10px';
      case 'medium': return "12px"
      case 'large': return '14px';
      default: return '12px'; // normal
    }
  };

  const renderPage = () => {
    switch (path) {
      case '/': return <DashboardPage navigate={navigate} />;
      case '/companies': return <CompaniesPage />;
      case '/projects': return <ProjectPage />;
      case '/devices': return <DevicePage />;
      case '/profile': return <ProfilePage />;
      case '/messages': return <MessagesPage screenSize={getRootFontSize} />;
      default: return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    // En dış kapsayıcı: Yan yana esnek yerleşim
    <div className="min-vh-100 bg-light d-flex w-100 overflow-x-hidden"
      style={{
        backgroundColor: isDark ? '#121212' : '#ffffff',
        color: isDark ? '#f8f9fa' : '#212529',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>

      {/* 1. Sol Sidebar (Akışın resmi parçası) */}
      <SideBar
        currentPath={path}
        navigate={navigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* 2. Sağ Taraf: Kalan tüm genişliği otomatik doldurur */}
      <div className="d-flex flex-column flex-grow-1 min-vw-0">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-4 flex-grow-1">
          {renderPage()}
        </main>
        <Footer />
      </div>

      {/* Sağ Sidebar / Mobil Alt Tab */}
      <RightSidebar
        isCollapsed={isRightCollapsed}
        setIsCollapsed={setIsRightCollapsed}
        isOpen={isRightOpen}
        setIsOpen={setIsRightOpen}
        theme={currentTheme}
        setScreenSize={setScreenSize}
      />
    </div>
  );
}