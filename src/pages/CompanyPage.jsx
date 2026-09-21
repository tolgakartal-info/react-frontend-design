import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';

export default function CompanyPage() {
  // Örnek 25 Firmalık Veri Seti
  const [allCompanies] = useState(
    Array.from({ length: 25 }, (_, i) => {
      const id = i + 1;
      const sectors = ['Endüstriyel Otomasyon', 'Enerji & Lojistik', 'Yazılım & IoT', 'İnşaat & Taahhüt', 'Telekomünikasyon'];
      const statuses = ['Aktif', 'Test / Onayda', 'Pasif'];
      const statusColors = ['bg-success', 'bg-warning text-dark', 'bg-secondary'];

      const sector = sectors[i % sectors.length];
      const statusIdx = i % 3 === 0 ? 1 : i % 5 === 0 ? 2 : 0;

      return {
        id,
        code: `FRM-${1000 + id}`,
        name: `${['ABC', 'Tekno', 'Loji', 'Solar', 'Meta', 'Akıllı', 'Global', 'Saha'][i % 8]} ${['Holding', 'A.Ş.', 'LTD.', 'Sistemleri', 'Enerji'][i % 5]}`,
        taxNo: `${3880000000 + id * 123}`,
        sector,
        city: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Kocaeli'][i % 5],
        contactPerson: `${['Ahmet', 'Mehmet', 'Ayşe', 'Canan', 'Ozan'][i % 5]} ${['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Öztürk'][i % 5]}`,
        email: `iletisim@firma${id}.com`,
        phone: `0850 ${100 + id} 22 33`,
        activeProjects: (i % 7) + 1,
        totalDevices: (i + 1) * 6,
        balance: `₺${((i + 1) * 45).toLocaleString('tr-TR')}.000`,
        status: statuses[statusIdx],
        statusColor: statusColors[statusIdx],
        icon: ['🏢', '🏭', '🔌', '🏗️', '📡'][i % 5]
      };
    })
  );

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  // Filtreleme İşlemleri
  const filteredCompanies = allCompanies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = sectorFilter === 'All' || c.sector === sectorFilter;

    return matchesSearch && matchesSector;
  });

  // Gösterilecek Dilim
  const visibleCompanies = filteredCompanies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCompanies.length;

  // Butona Basıldığında +10 Firma Ekle
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // Filtre veya arama değiştiğinde sayacı sıfırla
  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm, sectorFilter]);

  return (
    <div>
      <PageHeader 
        title="Firmalar" 
        description="Müşteri, tedarikçi ve alt yüklenici firma portföyü." 
        icon="🏢" 
      />

      <div className="bg-white rounded shadow-sm border overflow-hidden">
        
        {/* Üst Bar: Filtreler ve Arama */}
        <div className="p-3 bg-light border-bottom d-flex flex-wrap align-items-center justify-content-between gap-2">
          
          <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: '480px' }}>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0">🔍</span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Firma adı, kod veya yetkili ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="form-select form-select-sm"
              style={{ width: '170px' }}
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
            >
              <option value="All">Tüm Sektörler</option>
              <option value="Endüstriyel Otomasyon">Endüstriyel</option>
              <option value="Enerji & Lojistik">Enerji & Lojistik</option>
              <option value="Yazılım & IoT">Yazılım & IoT</option>
              <option value="İnşaat & Taahhüt">İnşaat</option>
              <option value="Telekomünikasyon">Telekom</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="text-muted" style={{ fontSize: '12px' }}>
              Gösterilen: <strong className="text-dark">{visibleCompanies.length}</strong> / {filteredCompanies.length}
            </span>
            <button className="btn btn-sm btn-primary py-1 px-3" style={{ fontSize: '12px' }}>
              + Yeni Firma Ekle
            </button>
          </div>
        </div>

        {/* Firma Liste Alanı */}
        <div className="list-group list-group-flush">
          {visibleCompanies.length > 0 ? (
            visibleCompanies.map((c) => (
              <div key={c.id} className="list-group-item p-3 hover-bg-light transition-all border-bottom">
                <div className="row align-items-center g-3">
                  
                  {/* Firma İsmi & Kod */}
                  <div className="col-12 col-md-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light border rounded p-2 text-center" style={{ minWidth: '42px', fontSize: '20px' }}>
                        {c.icon}
                      </div>
                      <div className="overflow-hidden">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="badge bg-light text-dark border" style={{ fontSize: '10px' }}>{c.code}</span>
                          <h6 className="mb-0 text-dark fw-bold text-truncate" style={{ fontSize: '14px' }}>{c.name}</h6>
                        </div>
                        <small className="text-muted d-block text-truncate" style={{ fontSize: '11px' }}>
                          {c.sector} • VN: {c.taxNo}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* İletişim Kişisi */}
                  <div className="col-6 col-md-3">
                    <span className="text-dark fw-semibold d-block text-truncate" style={{ fontSize: '12px' }}>
                      👤 {c.contactPerson}
                    </span>
                    <small className="text-muted d-block text-truncate" style={{ fontSize: '11px' }}>
                      ✉️ {c.email}
                    </small>
                  </div>

                  {/* Proje & Cihaz Sayısı */}
                  <div className="col-6 col-md-2 text-md-center" style={{ fontSize: '11px' }}>
                    <span className="text-muted d-block">Proje / Cihaz</span>
                    <span className="fw-semibold text-dark">
                      🚀 {c.activeProjects} Proje • 📟 {c.totalDevices} Cihaz
                    </span>
                  </div>

                  {/* Bakiye & Aksiyon */}
                  <div className="col-12 col-md-3 d-flex align-items-center justify-content-end gap-2">
                    <div className="text-end me-2 d-none d-lg-block">
                      <small className="text-muted d-block" style={{ fontSize: '10px' }}>Hacim / Bakiye</small>
                      <span className="fw-bold text-dark" style={{ fontSize: '12px' }}>{c.balance}</span>
                    </div>

                    <span className={`badge ${c.statusColor} py-1 px-2`} style={{ fontSize: '10px' }}>
                      {c.status}
                    </span>

                    <button className="btn btn-sm btn-light border py-1 px-2" style={{ fontSize: '11px' }}>
                      Detay
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="p-5 text-center text-muted" style={{ fontSize: '13px' }}>
              Kriterlere uygun firma bulunamadı.
            </div>
          )}
        </div>

        {/* Alt "Daha Fazla Yükle" Butonu */}
        {hasMore ? (
          <div className="p-2 bg-light border-top text-center">
            <button 
              className="btn btn-sm btn-white border shadow-sm w-100 fw-semibold text-secondary py-2" 
              onClick={handleLoadMore}
              style={{ fontSize: '12px' }}
            >
              ▼ Daha Fazla Yükle ({filteredCompanies.length - visibleCount} firma kaldı)
            </button>
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="p-2 bg-light border-top text-center text-muted" style={{ fontSize: '11px' }}>
            Tüm firmalar listelendi.
          </div>
        ) : null}

      </div>
    </div>
  );
}
