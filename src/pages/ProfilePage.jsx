import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function ProfilePage() {
  // Kullanıcı bilgileri (Form için local state)
  const [user, setUser] = useState({
    name: 'Ahmet Yılmaz',
    title: 'Sistem Yöneticisi',
    email: 'ahmet.yilmaz@panatili.com',
    phone: '+90 (555) 000 00 00',
    department: 'Bilgi Teknolojileri',
    location: 'İstanbul, Türkiye',
    bio: 'Panatili platformu üzerinde proje yönetimi ve cihaz konfigürasyonlarından sorumlu sistem yöneticisi.',
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profil bilgileriniz başarıyla güncellendi!');
  };

  return (
    <div>
      {/* Üst Başlık */}
      <PageHeader
        title="Profilim"
        description="Kişisel bilgilerinizi, hesap tercihlerinizi ve güvenlik ayarlarınızı yönetin."
        icon="👤"
      />

      <div className="row g-4">
        {/* Sol Kolon: Kullanıcı Kartı & Özet */}
        <div className="col-12 col-lg-4">
          <div className="bg-white p-4 rounded shadow-sm border text-center mb-4">
            {/* Profil Resmi & Avatar */}
            <div className="position-relative d-inline-block mb-3">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-1 mx-auto shadow-sm"
                style={{ width: '100px', height: '100px' }}
              >
                {user.name.charAt(0)}
              </div>
              <button
                className="btn btn-sm btn-light border position-absolute bottom-0 end-0 rounded-circle p-2 shadow-sm"
                title="Fotoğraf Değiştir"
              >
                📷
              </button>
            </div>

            <h5 className="fw-bold mb-1 text-dark">{user.name}</h5>
            <p className="text-muted small mb-2">{user.title}</p>
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill small">
              ● Hesap Aktif
            </span>

            <hr className="my-4" />

            {/* İletişim Özet Bilgileri */}
            <div className="text-start small">
              <div className="mb-2 text-muted">
                <strong>E-posta:</strong> <br />
                <span className="text-dark">{user.email}</span>
              </div>
              <div className="mb-2 text-muted">
                <strong>Departman:</strong> <br />
                <span className="text-dark">{user.department}</span>
              </div>
              <div className="mb-0 text-muted">
                <strong>Konum:</strong> <br />
                <span className="text-dark">{user.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Form ve Tab Yapısı */}
        <div className="col-12 col-lg-8">
          <div className="bg-white rounded shadow-sm border">
            {/* Tab Menüsü Header */}
            <div className="border-bottom px-4 pt-3">
              <ul className="nav nav-tabs border-0 gap-2">
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 pb-3 fw-semibold ${
                      activeTab === 'general' ? 'active border-bottom border-primary border-3 text-primary' : 'text-muted'
                    }`}
                    onClick={() => setActiveTab('general')}
                  >
                    ⚙️ Genel Bilgiler
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 pb-3 fw-semibold ${
                      activeTab === 'security' ? 'active border-bottom border-primary border-3 text-primary' : 'text-muted'
                    }`}
                    onClick={() => setActiveTab('security')}
                  >
                    🔒 Güvenlik & Şifre
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab 1: Genel Bilgiler Formu */}
            {activeTab === 'general' && (
              <form onSubmit={handleSave} className="p-4">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-dark">Ad Soyad</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-dark">Unvan</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={user.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-dark">E-posta Adresi</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-dark">Telefon Numarası</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-dark">Departman</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={user.department}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-dark">Konum / Şehir</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={user.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">Biyografi / Hakkında</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="bio"
                      value={user.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary px-4">
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Güvenlik Formu */}
            {activeTab === 'security' && (
              <form onSubmit={(e) => { e.preventDefault(); alert('Şifreniz başarıyla değiştirildi!'); }} className="p-4">
                <div className="row g-3 max-w-md">
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">Mevcut Şifre</label>
                    <input type="password" className="form-control" required />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">Yeni Şifre</label>
                    <input type="password" className="form-control" required />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">Yeni Şifre (Tekrar)</label>
                    <input type="password" className="form-control" required />
                  </div>
                </div>

                <div className="mt-4 text-start">
                  <button type="submit" className="btn btn-warning text-dark fw-semibold px-4">
                    Şifreyi Güncelle
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
