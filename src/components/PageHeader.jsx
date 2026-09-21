import React from 'react';

export default function PageHeader({ title, description, icon }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm border mb-4">
      <div className="d-flex align-items-center gap-3 text-start">
        {/* İkon Kapsayıcısı */}
        <div 
          className="bg-primary bg-opacity-10 text-primary rounded d-flex align-items-center justify-content-center fs-3 flex-shrink-0"
          style={{ width: '50px', height: '50px' }}
        >
          {icon}
        </div>

        {/* Başlık ve Açıklama Metni (Sola Yaslı) */}
        <div className="flex-grow-1 text-start">
          <h2 className="h4 fw-bold mb-1 text-dark text-start">{title}</h2>
          <p className="text-muted mb-0 small text-start">{description}</p>
        </div>
      </div>
    </div>
  );
}
