import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-3 px-4 mt-auto">
      <div className="container-fluid p-0 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 small text-muted">
        
        {/* Sol Taraf: Telif Hakkı Bilgisi */}
        <div>
          © {currentYear} <strong className="text-dark">T-Projects</strong>. Tüm hakları saklıdır.
        </div>

        {/* Orta/Sağ Taraf: Bağlantılar & Sistem Durumu */}
        <div className="d-flex align-items-center gap-3">
          <span className="d-flex align-items-center gap-1 text-success">
            <span className="badge rounded-pill bg-success p-1"> </span>
            Sistem Çalışıyor
          </span>
          <span className="text-black-50">|</span>
          <a href="#help" className="text-decoration-none text-muted hover-primary">
            Yardım
          </a>
          <a href="#privacy" className="text-decoration-none text-muted hover-primary">
            Gizlilik
          </a>
          <a href="#terms" className="text-decoration-none text-muted hover-primary">
            Kullanım Şartları
          </a>
        </div>

      </div>
    </footer>
  );
}
