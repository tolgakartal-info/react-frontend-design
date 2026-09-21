import React from 'react';
import PageHeader from '../components/PageHeader';

export default function NotFoundPage({ navigate }) {
  return (
    <div>
      {/* Sayfa Üst Başlığı */}
      <PageHeader 
        title="404 - Sayfa Bulunamadı" 
        description="Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir." 
        icon="⚠️" 
      />

      {/* Sayfa İçerik Kartı */}
      <div className="bg-white p-5 rounded shadow-sm border text-center my-4">
        <div className="display-1 fw-bold text-secondary mb-3">404</div>
        <h3 className="h4 text-dark mb-2">Aradığınız Sayfaya Ulaşılamadı</h3>
        <p className="text-muted max-w-md mx-auto mb-4">
          Lütfen URL adresini kontrol edin veya aşağıdaki butonu kullanarak kayıtlı sayfalardan birine geçiş yapın.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => navigate('/companies')}
            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
          >
            <span>🏢</span> Firmalar Sayfasına Dön
          </button>
        </div>
      </div>
    </div>
  );
}
