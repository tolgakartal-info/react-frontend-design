import React, { useState, useEffect } from 'react';

export default function RightSidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed,screenSize,setScreenSize }) {
    // Sayfa ilk açıldığında localStorage'a bak, yoksa varsayılan 'dark' yap
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('app_theme') || 'dark';
    });

    const isDark = currentTheme === 'dark';

    const changeTheme = (newTheme) => {
        setCurrentTheme(newTheme);
        localStorage.setItem('app_theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        if (newTheme === 'dark') {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#f8f9fa';
        } else {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#212529';
        }

        // 🚀 DİĞER BİLEŞENLERE HABER VER: Tema değişti!
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    };

    // Bileşen ekrana ilk geldiğinde temayı HTML'e ve body'e uygula
    useEffect(() => {
        changeTheme(currentTheme);
    }, []);

    // Bileşen ekrana ilk geldiğinde temayı uygula
    useEffect(() => {
        changeTheme(currentTheme);
    }, []);

    const [activeTab, setActiveTab] = useState('notifications');

    const [tasks, setTasks] = useState([
        { id: 1, title: 'Veritabanı Yedekleme', time: '03:00', status: 'completed' },
        { id: 2, title: 'IoT Cihaz Senkronizasyonu', time: '04:30', status: 'pending' },
        { id: 3, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 4, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 5, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 6, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 7, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 8, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 9, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 10, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 11, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 12, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 14, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 13, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
        { id: 15, title: 'Haftalık Rapor E-postası', time: '08:00', status: 'failed' },
    ]);

    const [notifications] = useState([
        { id: 1, text: 'Yeni bir cihaz sisteme eklendi (#108)', time: '10 dk önce', unread: true },
        { id: 2, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 4, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 3, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 5, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 6, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 7, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 8, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 9, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 10, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 11, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 12, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 13, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 14, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
        { id: 15, text: 'ABC Projesi evrakları tamamlandı', time: '1 saat önce', unread: false },
    ]);

    const sidebarWidth = isCollapsed ? '70px' : '300px';

    const handleMobileTabClick = (tabName) => {
        setActiveTab(tabName);
        setIsOpen(true);
    };

    return (
        <>
            <style>{`
        .custom-sidebar {
          background-color: ${isDark ? '#212529' : '#f8f9fa'} !important;
          color: ${isDark ? '#f8f9fa' : '#212529'} !important;
          border-color: ${isDark ? '#343a40' : '#dee2e6'} !important;
        }
        .custom-item-bg {
          background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff'} !important;
          border-color: ${isDark ? '#343a40' : '#dee2e6'} !important;
        }
        .custom-text-muted {
          color: ${isDark ? '#adb5bd' : '#6c757d'} !important;
        }
        .custom-text-main {
          color: ${isDark ? '#f8f9fa' : '#212529'} !important;
        }
        .right-sidebar-item-container {
          position: relative;
        }
        .right-sidebar-tooltip {
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 10px;
          background-color: ${isDark ? '#343a40' : '#212529'};
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
        .right-sidebar-item-container:hover .right-sidebar-tooltip {
          opacity: 1;
          visibility: visible;
        }
        .right-sidebar-transition {
          transition: width 0.3s ease, padding 0.3s ease;
        }
        .sidebar-toggle-btn {
          background-color: #0d6efd;
          color: #ffffff;
          border: none;
          transition: all 0.2s ease-in-out;
        }
        .sidebar-toggle-btn:hover {
          background-color: #0b5ed7;
          transform: scale(1.1);
        }
      `}</style>

            {/* ================= 1. MASAÜSTÜ SAĞ SIDEBAR ================= */}
            <aside
                className={`custom-sidebar p-3 min-vh-100 position-sticky top-0 right-sidebar-transition d-none d-md-flex flex-column border-start`}
                style={{
                    width: sidebarWidth,
                    minWidth: sidebarWidth,
                    zIndex: 1050,
                    overflowX: 'hidden',
                    flexShrink: 0
                }}
            >
                <div className={`d-flex align-items-center mb-4 pt-1 px-1 ${isCollapsed ? 'justify-content-center' : 'justify-content-between'}`}>
                    {!isCollapsed && (
                        <h2 className="h5 fw-bold mb-0 text-truncate custom-text-main">
                            Yönetim Paneli
                        </h2>
                    )}

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="btn btn-sm sidebar-toggle-btn d-none d-md-flex align-items-center justify-content-center rounded-circle shadow-sm"
                        style={{ width: '32px', height: '32px', fontSize: '16px', fontWeight: 'bold' }}
                        title={isCollapsed ? 'Paneli Genişlet' : 'Paneli Daralt'}
                        type="button"
                    >
                        {isCollapsed ? '❮' : '❯'}
                    </button>
                </div>

                {isCollapsed ? (
                    <div className="nav nav-pills flex-column gap-3 align-items-center">
                        <div className="right-sidebar-item-container w-100 d-flex justify-content-center">
                            <button
                                onClick={() => { setIsCollapsed(false); setActiveTab('notifications'); }}
                                className={`btn custom-item-bg custom-text-main rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm border`}
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                                type="button"
                            >
                                🔔
                            </button>
                            <div className="right-sidebar-tooltip">Bildirimler</div>
                        </div>

                        <div className="right-sidebar-item-container w-100 d-flex justify-content-center">
                            <button
                                onClick={() => { setIsCollapsed(false); setActiveTab('tasks'); }}
                                className={`btn custom-item-bg custom-text-main rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm border`}
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                                type="button"
                            >
                                ⏰
                            </button>
                            <div className="right-sidebar-tooltip">Zamanlanmış Görevler</div>
                        </div>

                        <div className="right-sidebar-item-container w-100 d-flex justify-content-center">
                            <button
                                onClick={() => { setIsCollapsed(false); setActiveTab('add'); }}
                                className={`btn custom-item-bg custom-text-main rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm border`}
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                                type="button"
                            >
                                ➕
                            </button>
                            <div className="right-sidebar-tooltip">Yeni Ekle</div>
                        </div>

                        <div className="right-sidebar-item-container w-100 d-flex justify-content-center">
                            <button
                                onClick={() => { setIsCollapsed(false); setActiveTab('theme'); }}
                                className={`btn custom-item-bg custom-text-main rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm border`}
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                                type="button"
                            >
                                🎨
                            </button>
                            <div className="right-sidebar-tooltip">Tema Ayarları</div>
                        </div>

                        <div className="right-sidebar-item-container w-100 d-flex justify-content-center">
                            <button
                                onClick={() => { setIsCollapsed(false); setActiveTab('sizing'); }}
                                className={`btn custom-item-bg custom-text-main rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm border`}
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                                type="button"
                            >
                                🔠
                            </button>
                            <div className="right-sidebar-tooltip">Boyutlandırma</div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3 flex-grow-1 overflow-auto" style={{ fontSize: '13px' }}>
                        <div className="d-flex gap-1 bg-secondary bg-opacity-10 p-1 rounded border border-secondary border-opacity-25 flex-wrap" role="group">
                            <button
                                type="button"
                                className={`btn btn-sm flex-fill ${activeTab === 'notifications' ? 'btn-primary' : 'btn-link text-decoration-none custom-text-main'}`}
                                onClick={() => setActiveTab('notifications')}
                                style={{ fontSize: '10px' }}
                            >
                                Bildirim
                            </button>
                            <button
                                type="button"
                                className={`btn btn-sm flex-fill ${activeTab === 'tasks' ? 'btn-primary' : 'btn-link text-decoration-none custom-text-main'}`}
                                onClick={() => setActiveTab('tasks')}
                                style={{ fontSize: '10px' }}
                            >
                                Görev
                            </button>
                            <button
                                type="button"
                                className={`btn btn-sm flex-fill ${activeTab === 'add' ? 'btn-primary' : 'btn-link text-decoration-none custom-text-main'}`}
                                onClick={() => setActiveTab('add')}
                                style={{ fontSize: '10px' }}
                            >
                                + Yeni
                            </button>
                            <button
                                type="button"
                                className={`btn btn-sm flex-fill ${activeTab === 'theme' ? 'btn-primary' : 'btn-link text-decoration-none custom-text-main'}`}
                                onClick={() => setActiveTab('theme')}
                                style={{ fontSize: '11px' }}
                            >
                                Tema
                            </button>
                            <button
                                type="button"
                                className={`btn btn-sm flex-fill ${activeTab === 'sizing' ? 'btn-primary' : 'btn-link text-decoration-none custom-text-main'}`}
                                onClick={() => setActiveTab('sizing')}
                                style={{ fontSize: '10px' }}
                            >
                                Boyut
                            </button>
                        </div>

                        {activeTab === 'notifications' && (
                            <div className="d-flex flex-column gap-2">
                                <span className="custom-text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Son Bildirimler</span>
                                {notifications.map(n => (
                                    <div key={n.id} className={`p-2 rounded custom-item-bg border ${n.unread ? 'border-primary' : ''} shadow-sm`}>
                                        <p className={`mb-1 custom-text-main`}>{n.text}</p>
                                        <small className="custom-text-muted" style={{ fontSize: '10px' }}>{n.time}</small>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'tasks' && (
                            <div className="d-flex flex-column gap-2">
                                <span className="custom-text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Zamanlanmış Görevler</span>
                                {tasks.map(t => (
                                    <div key={t.id} className={`p-2 rounded custom-item-bg border d-flex justify-content-between align-items-center shadow-sm`}>
                                        <div>
                                            <div className={`fw-semibold custom-text-main`}>{t.title}</div>
                                            <small className="custom-text-muted" style={{ fontSize: '10px' }}>Saat: {t.time}</small>
                                        </div>
                                        <div>
                                            {t.status === 'completed' && <span className="badge bg-success" style={{ fontSize: '9px' }}>Yapıldı</span>}
                                            {t.status === 'pending' && <span className="badge bg-warning text-dark" style={{ fontSize: '9px' }}>Bekliyor</span>}
                                            {t.status === 'failed' && <span className="badge bg-danger" style={{ fontSize: '9px' }}>Hata</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'add' && (
                            <div className="d-flex flex-column gap-2">
                                <span className="custom-text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Hızlı İşlemler</span>
                                <button type="button" className={`btn btn-sm ${isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle'} text-start`}>+ Yeni Proje Oluştur</button>
                                <button type="button" className={`btn btn-sm ${isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle'} text-start`}>+ Yeni Cihaz Tanımla</button>
                                <button type="button" className={`btn btn-sm ${isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle'} text-start`}>+ Görev Zamanla</button>
                            </div>
                        )}

                        {activeTab === 'theme' && (
                            <div className="d-flex flex-column gap-2">
                                <span className="custom-text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Tema Tercihi</span>

                                <button
                                    type="button"
                                    onClick={() => changeTheme('dark')}
                                    className={`p-2 rounded custom-item-bg border d-flex justify-content-between align-items-center shadow-sm w-100 text-start`}
                                    style={{ cursor: 'pointer', borderColor: isDark ? '#0d6efd' : undefined }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fs-5">🌙</span>
                                        <div>
                                            <div className={`fw-semibold custom-text-main`}>Karanlık Mod</div>
                                            <small className="custom-text-muted" style={{ fontSize: '10px' }}>Göz yormayan koyu tema</small>
                                        </div>
                                    </div>
                                    {isDark && <span className="badge bg-primary" style={{ fontSize: '9px' }}>Aktif</span>}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeTheme('light')}
                                    className={`p-2 rounded custom-item-bg border d-flex justify-content-between align-items-center shadow-sm w-100 text-start`}
                                    style={{ cursor: 'pointer', borderColor: !isDark ? '#0d6efd' : undefined }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fs-5">☀️</span>
                                        <div>
                                            <div className={`fw-semibold custom-text-main`}>Aydınlık Mod</div>
                                            <small className="custom-text-muted" style={{ fontSize: '10px' }}>Klasik açık renkli tema</small>
                                        </div>
                                    </div>
                                    {!isDark && <span className="badge bg-primary" style={{ fontSize: '9px' }}>Aktif</span>}
                                </button>
                            </div>
                        )}

                        {activeTab === 'sizing' && (
                            <div className="d-flex flex-column gap-2">
                                <span className="custom-text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Boyutlandırma</span>
                                
                                <button
                                    type="button"
                                    onClick={() => setScreenSize('small')}
                                    className={`btn btn-sm ${screenSize === 'small' ? 'btn-primary' : (isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle')} text-start`}
                                >
                                    Küçük
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScreenSize('normal')}
                                    className={`btn btn-sm ${screenSize === 'normal' ? 'btn-primary' : (isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle')} text-start`}
                                >
                                    Normal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScreenSize('large')}
                                    className={`btn btn-sm ${screenSize === 'large' ? 'btn-primary' : (isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle')} text-start`}
                                >
                                    Büyük
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </aside>

            {/* ================= 2. MOBİL ALT TAB ÇUBUĞU VE AÇILIR PENCERE ================= */}
            <div className="d-md-none">
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50"
                        style={{ zIndex: 1040 }}
                    />
                )}

                {isOpen && (
                    <div
                        className={`position-fixed bottom-0 start-0 w-100 custom-sidebar rounded-top-4 p-3 shadow-lg border-top`}
                        style={{ zIndex: 1055, maxHeight: '60vh', overflowY: 'auto', marginBottom: '60px' }}
                    >
                        <div className={`d-flex justify-content-between align-items-center mb-3 border-bottom pb-2`} style={{ borderColor: isDark ? '#343a40' : '#dee2e6' }}>
                            <h6 className={`m-0 fw-bold text-uppercase custom-text-main`} style={{ fontSize: '12px' }}>
                                {activeTab === 'notifications' && '🔔 Bildirimler'}
                                {activeTab === 'tasks' && '⏰ Zamanlanmış Görevler'}
                                {activeTab === 'add' && '➕ Yeni Ekle'}
                                {activeTab === 'theme' && '🎨 Tema Ayarları'}
                                {activeTab === 'sizing' && '🔠 Boyutlandırma'}
                            </h6>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`btn btn-sm ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} border-0 p-0 fs-5`}
                                type="button"
                            >
                                ✕
                            </button>
                        </div>

                        {activeTab === 'notifications' && (
                            <div className="d-flex flex-column gap-2">
                                {notifications.map(n => (
                                    <div key={n.id} className={`p-2 rounded custom-item-bg border ${n.unread ? 'border-primary' : ''}`}>
                                        <p className={`mb-1 custom-text-main`} style={{ fontSize: '13px' }}>{n.text}</p>
                                        <small className="custom-text-muted" style={{ fontSize: '10px' }}>{n.time}</small>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'tasks' && (
                            <div className="d-flex flex-column gap-2">
                                {tasks.map(t => (
                                    <div key={t.id} className={`p-2 rounded custom-item-bg border d-flex justify-content-between align-items-center`}>
                                        <div>
                                            <div className={`fw-semibold custom-text-main`} style={{ fontSize: '13px' }}>{t.title}</div>
                                            <small className="custom-text-muted" style={{ fontSize: '10px' }}>Saat: {t.time}</small>
                                        </div>
                                        <div>
                                            {t.status === 'completed' && <span className="badge bg-success" style={{ fontSize: '9px' }}>Yapıldı</span>}
                                            {t.status === 'pending' && <span className="badge bg-warning text-dark" style={{ fontSize: '9px' }}>Bekliyor</span>}
                                            {t.status === 'failed' && <span className="badge bg-danger" style={{ fontSize: '9px' }}>Hata</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'add' && (
                            <div className="d-flex flex-column gap-2">
                                <button type="button" className={`btn btn-sm ${isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle'} text-start py-2`}>+ Yeni Proje Oluştur</button>
                                <button type="button" className={`btn btn-sm ${isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle'} text-start py-2`}>+ Yeni Cihaz Tanımla</button>
                                <button type="button" className={`btn btn-sm ${isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle'} text-start py-2`}>+ Görev Zamanla</button>
                            </div>
                        )}

                        {activeTab === 'theme' && (
                            <div className="d-flex flex-column gap-2">
                                <button
                                    type="button"
                                    onClick={() => changeTheme('dark')}
                                    className={`p-2 rounded custom-item-bg border d-flex justify-content-between align-items-center w-100 text-start`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fs-5">🌙</span>
                                        <div>
                                            <div className={`fw-semibold custom-text-main`} style={{ fontSize: '13px' }}>Karanlık Mod</div>
                                            <small className="custom-text-muted" style={{ fontSize: '10px' }}>Göz yormayan koyu tema</small>
                                        </div>
                                    </div>
                                    {isDark && <span className="badge bg-primary" style={{ fontSize: '9px' }}>Aktif</span>}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeTheme('light')}
                                    className={`p-2 rounded custom-item-bg border d-flex justify-content-between align-items-center w-100 text-start`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fs-5">☀️</span>
                                        <div>
                                            <div className={`fw-semibold custom-text-main`} style={{ fontSize: '13px' }}>Aydınlık Mod</div>
                                            <small className="custom-text-muted" style={{ fontSize: '10px' }}>Klasik açık renkli tema</small>
                                        </div>
                                    </div>
                                    {!isDark && <span className="badge bg-primary" style={{ fontSize: '9px' }}>Aktif</span>}
                                </button>
                            </div>
                        )}

                        {activeTab === 'sizing' && (
                            <div className="d-flex flex-column gap-2">
                                <button
                                    type="button"
                                    onClick={() => setScreenSize('small')}
                                    className={`btn btn-sm ${screenSize === 'small' ? 'btn-primary' : (isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle')} text-start py-2`}
                                >
                                    Küçük
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScreenSize('medium')}
                                    className={`btn btn-sm ${screenSize === 'normal' ? 'btn-primary' : (isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle')} text-start py-2`}
                                >
                                    Normal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScreenSize('large')}
                                    className={`btn btn-sm ${screenSize === 'large' ? 'btn-primary' : (isDark ? 'btn-outline-light border-secondary' : 'btn-outline-dark border-secondary-subtle')} text-start py-2`}
                                >
                                    Büyük
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className={`position-fixed bottom-0 start-0 w-100 custom-sidebar border-top shadow-lg d-flex justify-content-around align-items-center py-2 px-3`} style={{ zIndex: 1050, height: '60px' }}>
                    <button
                        onClick={() => handleMobileTabClick('notifications')}
                        className={`btn custom-text-main d-flex flex-column align-items-center p-0 border-0 bg-transparent`}
                        style={{ fontSize: '11px' }}
                        type="button"
                    >
                        <span className="fs-5">🔔</span>
                        <span style={{ fontSize: '10px' }}>Bildirim</span>
                    </button>
                    <button
                        onClick={() => handleMobileTabClick('tasks')}
                        className={`btn custom-text-main d-flex flex-column align-items-center p-0 border-0 bg-transparent`}
                        style={{ fontSize: '11px' }}
                        type="button"
                    >
                        <span className="fs-5">⏰</span>
                        <span style={{ fontSize: '10px' }}>Görevler</span>
                    </button>
                    <button
                        onClick={() => handleMobileTabClick('add')}
                        className={`btn custom-text-main d-flex flex-column align-items-center p-0 border-0 bg-transparent`}
                        style={{ fontSize: '11px' }}
                        type="button"
                    >
                        <span className="fs-5">➕</span>
                        <span style={{ fontSize: '10px' }}>Yeni</span>
                    </button>
                    <button
                        onClick={() => handleMobileTabClick('theme')}
                        className={`btn custom-text-main d-flex flex-column align-items-center p-0 border-0 bg-transparent`}
                        style={{ fontSize: '11px' }}
                        type="button"
                    >
                        <span className="fs-5">🎨</span>
                        <span style={{ fontSize: '10px' }}>Tema</span>
                    </button>
                    <button
                        onClick={() => handleMobileTabClick('sizing')}
                        className={`btn custom-text-main d-flex flex-column align-items-center p-0 border-0 bg-transparent`}
                        style={{ fontSize: '11px' }}
                        type="button"
                    >
                        <span className="fs-5">🔠</span>
                        <span style={{ fontSize: '10px' }}>Boyut</span>
                    </button>
                </div>
            </div>
        </>
    );
}