import { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authServices';
import SimpleLoader from '../../loaders/SimpleLoader';
import { HandleErrors } from '../../utils/HandleErrors';

export default function Login({ onSwitch, setLoading, loading }) {
    const navigate = useNavigate();
    const [hiddenPassword, setHiddenPassword] = useState(true);

    const [data, setData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const clearForm = () => setData({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(data);
            clearForm();
            window.localStorage.setItem("user", JSON.stringify(res));
            if (res.role === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            HandleErrors(err.errors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>

                {/* Email */}
                <div className="auth-input-group">
                    <label htmlFor="login-email">Email Address</label>
                    <div className="auth-input-wrap">
                        <span className="auth-input-icon-left">
                            <PersonOutlineIcon style={{ fontSize: 18 }} />
                        </span>
                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="auth-input-group">
                    <div className="auth-label-row">
                        <label htmlFor="login-password">Password</label>
                        <button type="button" className="auth-forgot">Forgot password?</button>
                    </div>
                    <div className="auth-input-wrap">
                        <span className="auth-input-icon-left">
                            <LockOutlinedIcon style={{ fontSize: 18 }} />
                        </span>
                        <input
                            id="login-password"
                            type={hiddenPassword ? 'password' : 'text'}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                </div>

                {/* Remember Me */}
                <label className="auth-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                </label>

                {/* Submit */}
                <button type="submit" id="login-submit-btn" className="auth-btn" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>

            </form>

            <p className="auth-footer">
                Don't have an account?
                <button type="button" onClick={onSwitch}>Sign up</button>
            </p>
        </>
    );
}
