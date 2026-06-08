import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailConfirmation, resendEmail } from '../../services/authServices';
import { toast } from 'sonner';
import SimpleLoader from '../../loaders/SimpleLoader';
import '../../styles/Auth.css';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

export default function VerifyAccount() {
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const resendRef = useRef();

    const params = location.search;
    const code = new URLSearchParams(params).get('code');
    const userId = new URLSearchParams(params).get('userId');
    const email = localStorage.getItem('registeredEmail');

    const data = { userId, code };

    const handleVerify = async () => {
        setLoading(true);
        try {
            await emailConfirmation(data);
            toast.success('Email verified successfully!');
            navigate('/auth');
        } catch (error) {
            toast.error('Verification failed. Please click Resend to get a new link.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setLoading(true);
        try {
            await resendEmail(email);
            toast.success('Verification email sent. Please check your inbox.');
            setIsResendDisabled(true);
            setTimer(30);
        } catch (error) {
            toast.error('Failed to resend verification email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Countdown timer for resend
    useEffect(() => {
        if (!isResendDisabled) return;
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isResendDisabled]);

    return (
        <div className="auth-screen">
            <SimpleLoader loading={loading} />

            <div className="auth-card" style={{ maxWidth: 400, textAlign: 'center' }}>

                {/* Icon */}
                <div style={{
                    width: 52,
                    height: 52,
                    background: '#1e1e30',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                }}>
                    <MarkEmailReadOutlinedIcon style={{ fontSize: 26, color: '#818cf8' }} />
                </div>

                <h2 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#f1f5f9',
                    margin: '0 0 8px',
                    fontFamily: 'Montserrat, sans-serif',
                }}>
                    Check your email
                </h2>

                <p style={{
                    fontSize: 13,
                    color: '#64748b',
                    margin: '0 0 22px',
                    lineHeight: 1.6,
                }}>
                    We sent a verification link to{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>
                        {email || 'your email address'}
                    </span>.
                    Click the link, or paste the code below and click Verify.
                </p>

                {/* Code display */}
                <div style={{ marginBottom: 20 }}>
                    <textarea
                        readOnly
                        value={code || ''}
                        rows={3}
                        style={{
                            width: '100%',
                            background: '#0d0d14',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 8,
                            color: '#64748b',
                            fontSize: 12,
                            fontFamily: 'monospace',
                            padding: '10px 12px',
                            resize: 'none',
                            outline: 'none',
                            boxSizing: 'border-box',
                            lineHeight: 1.5,
                        }}
                    />
                </div>

                {/* Verify button */}
                <button
                    id="verify-btn"
                    className="auth-btn"
                    onClick={handleVerify}
                    disabled={loading}
                    style={{ marginTop: 0 }}
                >
                    {loading ? 'Verifying…' : 'Verify Email'}
                </button>

                {/* Resend */}
                <div style={{ marginTop: 16 }}>
                    {isResendDisabled ? (
                        <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>
                            Resend available in{' '}
                            <span style={{ color: '#818cf8', fontWeight: 600 }}>{timer}s</span>
                        </p>
                    ) : (
                        <button
                            ref={resendRef}
                            type="button"
                            onClick={handleResendEmail}
                            disabled={loading}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#818cf8',
                                fontSize: 13,
                                fontWeight: 600,
                                fontFamily: 'Montserrat, sans-serif',
                                cursor: 'pointer',
                                padding: 0,
                                textDecoration: 'underline',
                                textDecorationColor: 'transparent',
                                transition: 'color 0.15s, text-decoration-color 0.15s',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#a5b4fc';
                                e.target.style.textDecorationColor = '#a5b4fc';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#818cf8';
                                e.target.style.textDecorationColor = 'transparent';
                            }}
                        >
                            Resend verification email
                        </button>
                    )}
                </div>

                {/* Back to login */}
                <p style={{ marginTop: 20, fontSize: 12, color: '#475569' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/auth')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            fontSize: 12,
                            fontFamily: 'Montserrat, sans-serif',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        ← Back to Sign In
                    </button>
                </p>

            </div>
        </div>
    );
}