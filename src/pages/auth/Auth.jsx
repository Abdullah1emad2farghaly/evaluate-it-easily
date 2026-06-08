import React, { useState } from 'react';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import '../../styles/Auth.css';
import SimpleLoader from '../../loaders/SimpleLoader';

export default function Auth() {
    const [tab, setTab] = useState('login');
    const [slideDirection, setSlideDirection] = useState('auth-form-slide');
    const [loading, setLoading] = useState(false);

    const handleSwitchTab = (newTab) => {
        setSlideDirection(newTab === 'login' ? 'auth-form-slide-reverse' : 'auth-form-slide');
        setTab(newTab);
    };

    return (
        <div className="auth-screen">
            <SimpleLoader loading={loading} />
            <div className="auth-left">
                <div className="auth-left-logo">
                    <div className="auth-left-logo-icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="auth-left-logo-text">
                        <h3>Evaluate It Easily</h3>
                        <p>Management System</p>
                    </div>
                </div>

                <div className="auth-left-content">
                    <h1>Welcome Back,<br />User</h1>
                    <div className="auth-left-accent"></div>
                    <p>Sign in to access your dashboard and manage your system efficiently.</p>
                </div>

                {/* Dashboard preview placeholder (matching the image) */}
                <div className="auth-left-preview">
                    <div className="auth-left-preview-header">
                        <div className="auth-left-preview-dot"></div>
                        <div className="auth-left-preview-dot"></div>
                        <div className="auth-left-preview-dot"></div>
                    </div>
                    <div className="auth-left-preview-body">
                        <div className="auth-preview-stat">
                            <div className="auth-preview-stat-value">85%</div>
                            <div className="auth-preview-stat-label">Performance</div>
                        </div>
                        <div className="auth-preview-stat">
                            <div className="auth-preview-stat-value">1.2k</div>
                            <div className="auth-preview-stat-label">Users</div>
                        </div>
                        <div className="auth-preview-stat">
                            <div className="auth-preview-stat-value">4.5</div>
                            <div className="auth-preview-stat-label">Rating</div>
                        </div>
                    </div>
                    <div className="auth-preview-chart-row">
                        <div className="auth-preview-chart">
                            <svg className="auth-preview-chart-line" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <path d="M0,25 C20,10 30,30 50,20 C70,10 80,25 100,5" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="auth-right">
                <div className="auth-form-container">

                    <div className="auth-form-panel">
                        {tab === 'login' ? (
                            <div key="login" className={slideDirection}>
                                <div className="auth-form-header">
                                    <h2>Sign in to your account</h2>
                                    <p>Enter your credentials to continue</p>
                                </div>
                                <Login onSwitch={() => handleSwitchTab('register')} setLoading={setLoading} loading={loading} />
                            </div>
                        ) : (
                            <div key="register" className={slideDirection}>
                                <div className="auth-form-header">
                                    <h2>Create an account</h2>
                                    <p>Sign up to get started</p>
                                </div>
                                <Register onSwitch={() => handleSwitchTab('login')} setLoading={setLoading} loading={loading} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
