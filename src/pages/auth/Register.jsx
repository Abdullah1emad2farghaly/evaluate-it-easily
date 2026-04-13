import React, { useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from '@mui/icons-material/Mail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from 'react-router-dom';
import { register } from '../../services/authServices';
import SimpleLoader from '../../loaders/SimpleLoader';

import { toast } from 'react-toastify';
import { HandleErrors } from '../../utils/HandleErrors';

export default function Register({ handleForm, active }) {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => {
        setHiddenPassword(!hiddenPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const reset = () => {
        setHiddenPassword(true);
        setShowConfirmPassword(true);
    }

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const clearForm = () => {
        setData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        if (!data.fullName || !data.email || !data.password || !data.confirmPassword) {
            toast.error("All fields are required!")
            return;
        }
        setLoading(true);
        try {
            const res = await register(data)
            console.log(res);
            clearForm();
            handleForm();
            clearErrors();
            setLoading(false);
            reset();
            toast.success("Registration successful! Please check your email to confirm your account.");
        } catch (err) {
            HandleErrors(err.errors)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <SimpleLoader className={`hidden`} loading={loading} />
            <div className={`form-box ${active ? "z-10" : ""} register md:w-1/2 w-full right-0 md:p-[0px_40px_0px_60px] px-5 `}>
                <h2
                    className="text-3xl mb-5 text-white text-center animation"
                    style={{ "--i": 17, "--j": 0 }}
                >
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div
                        className="input-box animation"
                        style={{ "--i": 18, "--j": 1 }}
                    >
                        <input value={data.fullName} onChange={handleChange} type="text" id="fullName" name="fullName" required />
                        <label htmlFor="fullName">Full Name</label>
                        <PersonIcon className="icon" />
                    </div>
                    <div
                        className="input-box animation"
                        style={{ "--i": 19, "--j": 2 }}
                    >
                        <input value={data.email} onChange={handleChange} type="text" id="register-email" name="email" required />
                        <label htmlFor="register-email">Email</label>
                        <MailIcon className="icon" />
                    </div>
                    <div
                        className="input-box animation"
                        style={{ "--i": 20, "--j": 3 }}
                    >
                        <input value={data.password} onChange={handleChange} type={hiddenPassword ? "password" : "text"} id="register-password" name="password" required />
                        <label htmlFor="register-password">Password</label>
                        {
                            hiddenPassword ?
                                <LockIcon className="icon cursor-pointer" onClick={togglePassword} />
                                :
                                <LockOpenIcon className='icon cursor-pointer' onClick={togglePassword} />
                        }
                    </div>
                    <div
                        className="input-box animation"
                        style={{ "--i": 21, "--j": 4 }}
                    >
                        <input value={data.confirmPassword} onChange={handleChange} type={showConfirmPassword ? "password" : "text"} id="confirmPassword" name="confirmPassword" required />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {
                            showConfirmPassword ?
                                <LockIcon className="icon cursor-pointer" onClick={toggleConfirmPassword} />
                                :
                                <LockOpenIcon className='icon cursor-pointer' onClick={toggleConfirmPassword} />
                        }
                    </div>
                    <button
                        type="submit"
                        className="btn animation mb-3 mt-3"
                        style={{ "--i": 22, "--j": 5 }}
                    >
                        Sign Up
                    </button>
                    <div
                        className="logreg-link animation text-[14.5px] text-[#fff] text-center m-[0px_0px_10px] "
                        style={{ "--i": 24, "--j": 7 }}
                    >
                        <p>
                            Already have an account?
                            <NavLink
                                onClick={() => {
                                    handleForm();
                                    clearForm();
                                    reset();
                                }}
                                className="login-link decoration-0 text-[#0ef] font-[600] hover:underline "
                            >
                                Login
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
            <div className="info-text md:flex hidden pointer-events-none left-0 text-left p-[0px_100px_60px_40px] register">
                <h2 className="animation font-semibold" style={{ "--i": 17, "--j": 0 }}>
                    Evaluate It Easily
                </h2>
                <p className="animation" style={{ "--i": 18, "--j": 1 }}>
                    To keep connected with us please login with your personal info
                </p>
            </div>
        </>
    )
}
