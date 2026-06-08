import { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { register } from '../../services/authServices';
import SimpleLoader from '../../loaders/SimpleLoader';
import { toast } from 'sonner';
import { HandleErrors } from '../../utils/HandleErrors';

export default function Register({ onSwitch }) {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenConfirm, setHiddenConfirm] = useState(true);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateField = (name, value, currentData) => {
        let error = '';
        switch (name) {
            case 'fullName':
                if (!value.trim()) error = 'Full name is required';
                else if (value.trim().length < 3) error = 'Name must be at least 3 characters';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) error = 'Email is required';
                else if (!emailRegex.test(value)) error = 'Please enter a valid email address';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 6) error = 'Password must be at least 6 characters';
                break;
            case 'confirmPassword':
                if (!value) error = 'Please confirm your password';
                else if (value !== currentData.password) error = 'Passwords do not match';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...data, [name]: value };
        setData(newData);
        
        // Live validation on change
        const errorMsg = validateField(name, value, newData);
        setErrors({ ...errors, [name]: errorMsg });

        // If password changes, we should also re-validate confirmPassword if it has a value
        if (name === 'password' && newData.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                [name]: errorMsg,
                confirmPassword: validateField('confirmPassword', newData.confirmPassword, newData)
            }));
        }
    };

    const clearForm = () => {
        setData({ fullName: '', email: '', password: '', confirmPassword: '' });
        setErrors({ fullName: '', email: '', password: '', confirmPassword: '' });
        setHiddenPassword(true);
        setHiddenConfirm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Final validation before submit
        const newErrors = {
            fullName: validateField('fullName', data.fullName, data),
            email: validateField('email', data.email, data),
            password: validateField('password', data.password, data),
            confirmPassword: validateField('confirmPassword', data.confirmPassword, data),
        };
        
        setErrors(newErrors);

        if (Object.values(newErrors).some(err => err !== '')) {
            toast.error('Please fix the errors in the form before submitting.');
            return;
        }

        setLoading(true);
        try {
            await register(data);
            clearForm();
            onSwitch();
            toast.success('Registration successful! Please check your email to confirm your account.');
        } catch (err) {
            HandleErrors(err.errors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SimpleLoader loading={loading} />

            <form onSubmit={handleSubmit} noValidate>

                {/* Full Name */}
                <div className="auth-input-group">
                    <label htmlFor="reg-fullname">Full Name</label>
                    <div className="auth-input-wrap">
                        <span className="auth-input-icon-left">
                            <PersonOutlineIcon style={{ fontSize: 18 }} />
                        </span>
                        <input
                            id="reg-fullname"
                            type="text"
                            name="fullName"
                            value={data.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.fullName ? 'auth-input-error' : ''}
                        />
                    </div>
                    {errors.fullName && <div className="auth-error-text">{errors.fullName}</div>}
                </div>

                {/* Email */}
                <div className="auth-input-group">
                    <label htmlFor="reg-email">Email Address</label>
                    <div className="auth-input-wrap">
                        <span className="auth-input-icon-left">
                            <MailOutlineIcon style={{ fontSize: 18 }} />
                        </span>
                        <input
                            id="reg-email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="admin@example.com"
                            className={errors.email ? 'auth-input-error' : ''}
                        />
                    </div>
                    {errors.email && <div className="auth-error-text">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="auth-input-group">
                    <label htmlFor="reg-password">Password</label>
                    <div className="auth-input-wrap">
                        <span className="auth-input-icon-left">
                            <LockOutlinedIcon style={{ fontSize: 18 }} />
                        </span>
                        <input
                            id="reg-password"
                            type={hiddenPassword ? 'password' : 'text'}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className={errors.password ? 'auth-input-error' : ''}
                        />
                        <span
                            className="auth-input-icon-right clickable"
                            onClick={() => setHiddenPassword(!hiddenPassword)}
                            title={hiddenPassword ? 'Show password' : 'Hide password'}
                        >
                            {hiddenPassword
                                ? <LockOutlinedIcon style={{ fontSize: 18 }} />
                                : <LockOpenOutlinedIcon style={{ fontSize: 18 }} />
                            }
                        </span>
                    </div>
                    {errors.password && <div className="auth-error-text">{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="auth-input-group">
                    <label htmlFor="reg-confirm">Confirm Password</label>
                    <div className="auth-input-wrap">
                        <span className="auth-input-icon-left">
                            <LockOutlinedIcon style={{ fontSize: 18 }} />
                        </span>
                        <input
                            id="reg-confirm"
                            type={hiddenConfirm ? 'password' : 'text'}
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={errors.confirmPassword ? 'auth-input-error' : ''}
                        />
                        <span
                            className="auth-input-icon-right clickable"
                            onClick={() => setHiddenConfirm(!hiddenConfirm)}
                            title={hiddenConfirm ? 'Show password' : 'Hide password'}
                        >
                            {hiddenConfirm
                                ? <LockOutlinedIcon style={{ fontSize: 18 }} />
                                : <LockOpenOutlinedIcon style={{ fontSize: 18 }} />
                            }
                        </span>
                    </div>
                    {errors.confirmPassword && <div className="auth-error-text">{errors.confirmPassword}</div>}
                </div>

                {/* Submit */}
                <button type="submit" id="register-submit-btn" className="auth-btn" disabled={loading}>
                    {loading ? 'Creating account…' : 'Sign Up'}
                </button>

          
            </form>

            <p className="auth-footer">
                Already have an account?
                <button type="button" onClick={onSwitch}>Sign in</button>
            </p>
        </>
    );
}
