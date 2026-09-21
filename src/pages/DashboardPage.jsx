import React from 'react';
import PageHeader from '../components/PageHeader';

export default function DashboardPage({ navigate }) {
  // Özet İstatistik Verileri
  const stats = [
    { title: 'Toplam Firma', value: '24', icon: '🏢', color: 'primary', link: '/companies' },
    { title: 'Aktif Projeler', value: '12', icon: '📁', color: 'success', link: '/projects' },
    { title: 'Bağlı Cihazlar', value: '158', icon: '💻', color: 'info', link: '/devices' },
    { title: 'Bekleyen Bildirimler', value: '3', icon: '🔔', color: 'warning', link: '/profile' },
  ];

  // Son Hareketler / Sistem Akışı
  const recentActivities = [
    { id: 1, title: 'Yeni Proje Oluşturuldu', desc: 'ABC Bilişim için Web Portalı projesi başlatıldı.', time: '10 dk önce', icon: '📁' },
    { id: 2, title: 'Cihaz Durumu Güncellendi', desc: 'Cihaz #104 çevrimiçi duruma geçti.', time: '45 dk önce', icon: '💻' },
    { id: 3, title: 'Yeni Firma Kaydı', desc: 'XYZ Lojistik sisteme eklendi.', time: '2 saat önce', icon: '🏢' },
  ];

  return (
    <div>
      {/* Sayfa Üst Başlığı */}
      <PageHeader 
        title="Ana Sayfa / Dashboard" 
        description="Sistemdeki genel durum, aktif projeler ve cihaz durumlarının anlık özeti." 
        icon="📊" 
      />

      {/* İstatistik Kartları (4'lü Grid) */}
      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-xl-3">
            <div 
              onClick={() => navigate(stat.link)}
              className="bg-white p-3 rounded shadow-sm border h-100 d-flex align-items-center justify-content-between cursor-pointer hover-shadow transition-all"
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="text-muted small fw-medium">{stat.title}</div>
                <div className="fs-3 fw-bold text-dark mt-1">{stat.value}</div>
              </div>
              <div 
                className={`bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-circle d-flex align-items-center justify-content-center fs-3`}
                style={{ width: '50px', height: '50px' }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* İçerik Alanı: Son Hareketler & Hızlı İşlemler */}
      <div className="row g-4">
        {/* Sol Kolon: Son Aktiviteler */}
        <div className="col-12 col-lg-8">
          <div className="bg-white p-4 rounded shadow-sm border h-100">
            <h5 className="fw-bold mb-3 text-dark">Son Sistem Aktiviteleri</h5>
            <div className="list-group list-group-flush">
              {recentActivities.map((act) => (
                <div key={act.id} className="list-group-item px-0 py-3 d-flex align-items-start gap-3 border-bottom">
                  <span className="fs-4">{act.icon}</span>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 fw-semibold text-dark">{act.title}</h6>
                      <small className="text-muted">{act.time}</small>
                    </div>
                    <p className="text-muted small mb-0 mt-1">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Hızlı Bağlantılar */}
        <div className="col-12 col-lg-4">
          <div className="bg-white p-4 rounded shadow-sm border h-100">
            <h5 className="fw-bold mb-3 text-dark">Hızlı Erişim</h5>
            <div className="d-grid gap-2">
              <button 
                onClick={() => navigate('/companies')} 
                className="btn btn-outline-primary text-start d-flex align-items-center gap-2 p-2"
              >
                <span>🏢</span> Firmaları Yönet
              </button>
              <button 
                onClick={() => navigate('/projects')} 
                className="btn btn-outline-primary text-start d-flex align-items-center gap-2 p-2"
              >
                <span>📁</span> Projelere Göz At
              </button>
              <button 
                onClick={() => navigate('/devices')} 
                className="btn btn-outline-primary text-start d-flex align-items-center gap-2 p-2"
              >
                <span>💻</span> Cihaz Listesini İncele
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
