import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function DevicePage() {
  const [allDevices] = useState([
    { id: 101, name: 'Endüstriyel Gateway #01', code: 'DEV-800X', project: 'ABC Fabrika', category: 'Gateway', status: 'Çevrimiçi', statusColor: 'bg-success', isOnline: true, ip: '192.168.1.105', battery: 98, lastPing: 'Şimdi', icon: '📡' },
    { id: 102, name: 'Sıcaklık & Nem Sensörü A4', code: 'DEV-TH20', project: 'Akıllı Enerji', category: 'Sensör', status: 'Çevrimiçi', statusColor: 'bg-success', isOnline: true, ip: '192.168.1.112', battery: 45, lastPing: '2 dk önce', icon: '🌡️' },
    { id: 103, name: 'Güç Ölçüm Modülü #08', code: 'DEV-PM30', project: 'Akıllı Enerji', category: 'Modül', status: 'Çevrimdışı', statusColor: 'bg-danger', isOnline: false, ip: '192.168.1.140', battery: 0, lastPing: '4 saat önce', icon: '⚡' },
    { id: 104, name: 'Barkod Okuyucu B2', code: 'DEV-RF09', project: 'Lojistik Depo', category: 'Okuyucu', status: 'Bakımda', statusColor: 'bg-warning text-dark', isOnline: false, ip: '192.168.1.188', battery: 15, lastPing: '1 gün önce', icon: '🏷️' },
    { id: 105, name: 'Titreşim Analiz Sensörü', code: 'DEV-VT02', project: 'ABC Fabrika', category: 'Sensör', status: 'Çevrimiçi', statusColor: 'bg-success', isOnline: true, ip: '192.168.1.190', battery: 82, lastPing: '10 dk önce', icon: '📳' },
    { id: 106, name: 'Gaz Kaçak Dedektörü G1', code: 'DEV-GS01', project: 'Saha Veri Toplama', category: 'Dedektör', status: 'Çevrimiçi', statusColor: 'bg-success', isOnline: true, ip: '192.168.1.201', battery: 90, lastPing: '1 dk önce', icon: '⚠️' }
  ]);

  // Ekranda gösterilecek görünür öge sayısı
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const visibleDevices = allDevices.slice(0, visibleCount);
  const hasMore = visibleCount < allDevices.length;

  return (
    <div>
      <PageHeader 
        title="Cihazlar" 
        description="Sahadaki IoT cihazlarının dinamik listesi." 
        icon="📟" 
      />

      <div className="bg-white rounded shadow-sm border overflow-hidden">
        
        {/* Üst Bar */}
        <div className="p-2 bg-light border-bottom d-flex justify-content-between align-items-center px-3">
          <span className="fw-bold text-dark" style={{ fontSize: '13px' }}>
            Cihaz Listesi ({visibleDevices.length} / {allDevices.length})
          </span>
          <button className="btn btn-sm btn-primary py-1 px-2" style={{ fontSize: '12px' }}>+ Yeni Cihaz Ekle</button>
        </div>

        {/* Cihaz Satırları */}
        <div className="list-group list-group-flush">
          {visibleDevices.map((d) => (
            <div key={d.id} className="list-group-item p-2 px-3 transition-all hover-bg-light">
              <div className="row align-items-center g-2">
                
                <div className="col-12 col-md-4">
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: '16px' }}>{d.icon}</span>
                    <div className="overflow-hidden">
                      <div className="d-flex align-items-center gap-1">
                        <span className="badge bg-light text-dark border" style={{ fontSize: '10px' }}>{d.code}</span>
                        <h6 className="mb-0 text-dark fw-bold text-truncate" style={{ fontSize: '13px' }}>{d.name}</h6>
                      </div>
                      <small className="text-muted d-block text-truncate" style={{ fontSize: '11px' }}>
                        {d.project} • {d.category}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-2">
                  <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '11px' }}>
                    <span className="text-muted">Pil</span>
                    <span className={`fw-semibold ${d.battery < 20 ? 'text-danger' : 'text-dark'}`}>%{d.battery}</span>
                  </div>
                  <div className="progress" style={{ height: '4px' }}>
                    <div 
                      className={`progress-bar ${d.battery < 20 ? 'bg-danger' : 'bg-success'}`} 
                      style={{ width: `${d.battery}%` }} 
                    />
                  </div>
                </div>

                <div className="col-6 col-md-3 text-md-center" style={{ fontSize: '11px' }}>
                  <span className="text-muted d-block">IP / Son Bağlantı</span>
                  <span className="fw-semibold text-dark"><code>{d.ip}</code> • {d.lastPing}</span>
                </div>

                <div className="col-12 col-md-3 d-flex align-items-center justify-content-end gap-2">
                  <span className={`badge ${d.statusColor} py-1 px-2`} style={{ fontSize: '10px' }}>
                    {d.status}
                  </span>
                  <button className="btn btn-sm btn-light border py-0 px-2" style={{ fontSize: '11px' }}>
                    Yönet
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Alt Daha Fazla Yükle Butonu */}
        {hasMore ? (
          <div className="p-2 bg-light border-top text-center">
            <button 
              className="btn btn-sm btn-white border shadow-sm w-100 fw-semibold text-secondary py-1" 
              onClick={handleLoadMore}
              style={{ fontSize: '12px' }}
            >
              ▼ Daha Fazla Yükle ({allDevices.length - visibleCount} cihaz kaldı)
            </button>
          </div>
        ) : (
          <div className="p-2 bg-light border-top text-center text-muted" style={{ fontSize: '11px' }}>
            Tüm cihazlar listelendi.
          </div>
        )}

      </div>
    </div>
  );
}
