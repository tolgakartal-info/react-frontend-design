import React from 'react';

export default function Header({ toggleSidebar, user, onLogout }) {
  return (
    <header className="navbar navbar-expand bg-white border-bottom px-3 py-2 sticky-top">
      <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
        
        {/* Sol Taraf: Mobil Menü Butonu & Arama Çubuğu */}
        <div className="d-flex align-items-center gap-3 flex-grow-1" style={{ maxWidth: '500px' }}>
          {/* Mobil Sandviç Menü Butonu */}
          <button
            onClick={toggleSidebar}
            className="btn btn-outline-secondary d-md-none border-0"
            type="button"
            aria-label="Menüyü Aç/Kapat"
          >
            <span className="fs-5">☰</span>
          </button>

          {/* Arama Çubuğu */}
          <form className="d-flex w-100 me-2" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">🔍</span>
              <input
                type="search"
                className="form-control bg-light border-start-0"
                placeholder="Proje, firma veya cihaz ara..."
                aria-label="Arama"
              />
            </div>
          </form>
        </div>

        {/* Sağ Taraf: Mesajlar ve Profil Menüsü */}
        <div className="d-flex align-items-center gap-3">
          {/* Mesajlar İkonu & Bildirim Rozeti */}
          <div className="dropdown">
            <button
              className="btn btn-light position-relative rounded-circle p-2 d-flex align-items-center justify-content-center"
              type="button"
              id="messagesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: '40px', height: '40px' }}
            >
              💬
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="messagesDropdown">
              <li><h6 className="dropdown-header">Mesajlar (3 Okunmamış)</h6></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item small" href="#msg1">📩 Yeni proje güncellendi</a></li>
              <li><a className="dropdown-item small" href="#msg2">💬 Mehmet: Evraklar tamamlandı</a></li>
              <li><a className="dropdown-item small" href="#msg3">⚙️ Sistem bildirimi</a></li>
            </ul>
          </div>

          {/* Giriş Yapan Kişi / Profil Menüsü */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{ width: '32px', height: '32px' }}
              >
                {user.name.charAt(0)}
              </div>
              <div className="text-start d-none d-sm-block">
                <div className="fw-semibold lh-1 fs-6">{user?.name || 'Kullanıcı'}</div>
                <small className="text-muted" style={{ fontSize: '11px' }}>{user?.role || 'Misafir'}</small>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userMenu">
              <li><a className="dropdown-item" href="#profile">👤 Profilim</a></li>
              <li><a className="dropdown-item" href="#settings">⚙️ Ayarlar</a></li>
              <li><hr className="dropdown-divider" /></li>
              {/* Çıkış Yap Butonu */}
              <li>
                <button className="dropdown-item text-danger" onClick={onLogout}>
                  🚪 Çıkış Yap
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </header>
  );
}