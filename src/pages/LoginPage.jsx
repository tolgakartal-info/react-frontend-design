import React, { useState } from 'react';

export default function LoginPage({ isDark, screenSize, onLoginSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Ekran boyutuna göre dinamik padding veya font ölçeklemesi
    const getPaddingSize = () => {
        switch (screenSize) {
            case 'small': return 'p-3';
            case 'large': return 'p-5';
            default: return 'p-4';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simüle edilmiş giriş isteği
        setTimeout(() => {
            setLoading(false);
            if (onLoginSubmit) {
                onLoginSubmit({ email, password });
            }
        }, 1000);
    };

    return (
        <div className={`d-flex align-items-center justify-content-center min-vh-100 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div 
                className={`card shadow-lg border-0 rounded-4 w-100 ${getPaddingSize()}`}
                style={{ 
                    maxWidth: '420px', 
                    backgroundColor: isDark ? '#212529' : '#ffffff',
                    color: isDark ? '#f8f9fa' : '#212529',
                    borderColor: isDark ? '#343a40' : '#dee2e6'
                }}
            >
                <div className="card-body p-4">
                    <div className="text-center mb-4">
                        <div className="fs-1 mb-2">🚀</div>
                        <h2 className="fw-bold fs-3">Hoş Geldiniz</h2>
                        <p className={`text-muted small ${isDark ? 'text-secondary' : ''}`}>
                            Devam etmek için lütfen giriş yapın.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold small">E-posta Adresi</label>
                            <input 
                                type="email" 
                                className={`form-control ${isDark ? 'bg-secondary bg-opacity-10 text-light border-secondary' : ''}`}
                                placeholder="ornek@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold small">Şifre</label>
                            <input 
                                type="password" 
                                className={`form-control ${isDark ? 'bg-secondary bg-opacity-10 text-light border-secondary' : ''}`}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : null}
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <a href="#forgot" className="text-decoration-none small text-primary">
                            Şifremi Unuttum?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}