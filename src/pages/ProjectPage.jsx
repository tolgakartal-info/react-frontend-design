import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function ProjectsPage() {
  const [allProjects] = useState([
    { id: 1, title: 'ABC Fabrika Otomasyonu', code: 'PRJ-001', client: 'ABC Holding', category: 'Endüstriyel', status: 'Aktif', statusColor: 'bg-success', progress: 75, budget: '₺450K', devicesCount: 14 },
    { id: 2, title: 'Akıllı Enerji İzleme Altyapısı', code: 'PRJ-004', client: 'TeknoKent A.Ş.', category: 'IoT', status: 'Test', statusColor: 'bg-warning text-dark', progress: 90, budget: '₺280K', devicesCount: 32 },
    { id: 3, title: 'Lojistik Depo Takip Sistemi', code: 'PRJ-009', client: 'LojiTrans', category: 'Yazılım', status: 'Planlanıyor', statusColor: 'bg-info text-dark', progress: 20, budget: '₺190K', devicesCount: 8 },
    { id: 4, title: 'Saha Veri Toplama Ağı', code: 'PRJ-012', client: 'Liman İşletmeleri', category: 'Telemetri', status: 'Aktif', statusColor: 'bg-success', progress: 60, budget: '₺310K', devicesCount: 22 },
    { id: 5, title: 'Güneş Santrali SCADA', code: 'PRJ-015', client: 'SolarEnerji A.Ş.', category: 'Enerji', status: 'Test', statusColor: 'bg-warning text-dark', progress: 85, budget: '₺520K', devicesCount: 45 },
    { id: 6, title: 'Su Deposu Seviye Takibi', code: 'PRJ-018', client: 'Büyükşehir Bld.', category: 'IoT', status: 'Aktif', statusColor: 'bg-success', progress: 40, budget: '₺140K', devicesCount: 12 },
    { id: 7, title: 'Bina Otomasyon Sistemi', code: 'PRJ-021', client: 'Plaza Yönetimi', category: 'Bina Yönetimi', status: 'Planlanıyor', statusColor: 'bg-info text-dark', progress: 10, budget: '₺210K', devicesCount: 19 }
  ]);

  // Ekranda gösterilecek görünür öge sayısı
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  return (
    <div>
      <PageHeader 
        title="Projeler" 
        description="Devam eden ve planlanan tüm saha projeleri." 
        icon="🚀" 
      />

      <div className="bg-white rounded shadow-sm border overflow-hidden">
        
        {/* Üst Bar */}
        <div className="p-2 bg-light border-bottom d-flex justify-content-between align-items-center px-3">
          <span className="fw-bold text-dark" style={{ fontSize: '13px' }}>
            Proje Listesi ({visibleProjects.length} / {allProjects.length})
          </span>
          <button className="btn btn-sm btn-primary py-1 px-2" style={{ fontSize: '12px' }}>+ Yeni Proje</button>
        </div>

        {/* Liste Satırları */}
        <div className="list-group list-group-flush">
          {visibleProjects.map((p) => (
            <div key={p.id} className="list-group-item p-2 px-3 hover-bg-light transition-all">
              <div className="row align-items-center g-2">
                <div className="col-12 col-md-4">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-light text-dark border" style={{ fontSize: '10px' }}>{p.code}</span>
                    <h6 className="mb-0 text-dark fw-bold text-truncate" style={{ fontSize: '13px' }}>{p.title}</h6>
                  </div>
                  <small className="text-muted" style={{ fontSize: '11px' }}>{p.client} • {p.category}</small>
                </div>

                <div className="col-6 col-md-3">
                  <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '11px' }}>
                    <span className="text-muted">İlerleme</span>
                    <span className="fw-semibold">%{p.progress}</span>
                  </div>
                  <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar bg-success" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                <div className="col-6 col-md-2 text-md-center" style={{ fontSize: '11px' }}>
                  <span className="text-muted d-block">Bütçe / Cihaz</span>
                  <span className="fw-semibold text-dark">{p.budget} • {p.devicesCount} Cihaz</span>
                </div>

                <div className="col-12 col-md-3 d-flex align-items-center justify-content-end gap-2">
                  <span className={`badge ${p.statusColor} py-1 px-2`} style={{ fontSize: '10px' }}>{p.status}</span>
                  <button className="btn btn-sm btn-light border py-0 px-2" style={{ fontSize: '11px' }}>Detay</button>
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
              ▼ Daha Fazla Yükle ({allProjects.length - visibleCount} proje kaldı)
            </button>
          </div>
        ) : (
          <div className="p-2 bg-light border-top text-center text-muted" style={{ fontSize: '11px' }}>
            Tüm projeler listelendi.
          </div>
        )}

      </div>
    </div>
  );
}
