import React, { useEffect } from 'react';

export default function SideBar({ currentPath, navigate, isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
  // Menü elemanları
  const menuItems = [
    { url: '/', title: 'Ana Sayfa', icon: '📊' },
    { url: '/companies', title: 'Firmalar', icon: '🏢' },
    { url: '/projects', title: 'Projeler', icon: '📁' },
    { url: '/devices', title: 'Cihazlar', icon: '💻' },
    { url: '/messages', title: 'Mesajlar', icon: '💬' },
    { url: '/profile', title: 'Profil', icon: '👤' },
  ];

  // Ekran masaüstüne geçtiğinde açık kalan mobil menüyü otomatik kapat
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, setIsOpen]);

  const handleNavigation = (url) => {
    navigate(url);
    setIsOpen(false);
  };

  // Genişlik hesabı: Sadece mobilde menü açıkken tam boy, diğer durumlarda isCollapsed durumuna göre ayarlanır
  const sidebarWidth = (!isOpen && isCollapsed) ? '70px' : '250px';

  return (
    <>
      <style>{`
        .sidebar-item-container {
          position: relative;
        }
        .sidebar-tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 10px;
          background-color: #212529;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, visibility 0.2s ease;
          z-index: 1060;
        }
        .sidebar-item-container:hover .sidebar-tooltip {
          opacity: 1;
          visibility: visible;
        }
        .sidebar-transition {
          transition: width 0.3s ease, padding 0.3s ease;
        }
        .sidebar-toggle-btn {
          background-color: #0d6efd;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease-in-out;
        }
        .sidebar-toggle-btn:hover {
          background-color: #0b5ed7;
          color: #ffffff;
          transform: scale(1.1);
        }
      `}</style>

      {/* Mobil Karartma Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-md-none"
          style={{ zIndex: 1040 }}
        />
      )}

      {/* SideBar */}
      <aside
        className={`bg-dark text-white p-3 min-vh-100 position-sticky top-0 sidebar-transition ${
          isOpen ? 'd-block' : 'd-none d-md-block'
        }`}
        style={{ 
          width: sidebarWidth, 
          minWidth: sidebarWidth, 
          zIndex: 1050,
          overflowX: 'hidden',
          flexShrink: 0
        }}
      >
        {/* Logo ve Daraltma Butonu */}
        <div className={`d-flex align-items-center mb-4 pt-1 px-1 ${isCollapsed && !isOpen ? 'justify-content-center' : 'justify-content-between'}`}>
          {(!isCollapsed || isOpen) && (
            <h1 
              onClick={() => handleNavigation('/')} 
              className="h4 fw-bold text-white mb-0 text-truncate" 
              style={{ cursor: 'pointer' }}
            >
              T-Projects
            </h1>
          )}

          {/* Masaüstü Daralt/Genişlet Butonu */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-sm sidebar-toggle-btn d-none d-md-flex align-items-center justify-content-center rounded-circle shadow-sm"
            style={{ width: '32px', height: '32px', fontSize: '16px', fontWeight: 'bold' }}
            title={isCollapsed ? 'Menüyü Genişlet' : 'Menüyü Daralt'}
            aria-label={isCollapsed ? 'Menüyü Genişlet' : 'Menüyü Daralt'}
          >
            {isCollapsed ? '❯' : '❮'}
          </button>

          {/* Mobil Kapatma Butonu */}
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-sm btn-outline-light d-md-none border-0 fs-5 p-0 ms-auto"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        {/* Menü Linkleri */}
        <div className="nav nav-pills flex-column gap-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.url;
            const showText = !isCollapsed || isOpen;
            
            return (
              <div key={item.url} className="sidebar-item-container">
                <button
                  onClick={() => handleNavigation(item.url)}
                  className={`nav-link text-start text-white border-0 d-flex align-items-center w-100 transition-all ${
                    !showText ? 'justify-content-center px-0' : 'gap-2 px-3'
                  } ${isActive ? 'active bg-primary' : 'bg-transparent'}`}
                  style={{ height: '40px' }}
                >
                  <span className="fs-5">{item.icon}</span>
                  
                  {showText && (
                    <span className="text-truncate" style={{ fontSize: '14px' }}>
                      {item.title}
                    </span>
                  )}
                </button>

                {isCollapsed && !isOpen && (
                  <div className="sidebar-tooltip">
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}