import MailIcon from '@mui/icons-material/Mail';
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { NavLink, useNavigate } from "react-router-dom";
import Home from "../website/Home";
import { useState } from "react";
import { login } from "../../services/authServices";
import SimpleLoader from '../../loaders/SimpleLoader';
import { HandleErrors } from '../../utils/HandleErrors';

export default function Login({ handleForm, active }) {
    const navigate = useNavigate();
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => {
        setHiddenPassword(!hiddenPassword);
    }

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const clearForm = () => {
        setData({
            email: "",
            password: "",
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await login(data);
            clearForm();

            if (res.role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            HandleErrors(err.errors)
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <SimpleLoader loading={loading} />
            <div className={`form-box ${active ? "" : "z-100"} md:w-1/2 w-full login left-0 md:p-[0px_60px_0px_40px] px-5`}>
                <h2
                    className="text-3xl mb-5 text-[#fff] text-center animation"
                    style={{ "--i": 0, "--j": 23 }}
                >
                    Login
                </h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="input-box animation" style={{ "--i": 1, "--j": 24 }}>
                        <input value={data.email} onChange={handleChange} type="email" id="email" name="email" required />
                        <label htmlFor="email">Email</label>
                        <MailIcon className="icon" />
                    </div>
                    <div className="input-box animation" style={{ "--i": 2, "--j": 25 }}>
                        <input value={data.password} onChange={handleChange} type={hiddenPassword ? "password" : "text"} id="input-password" name="password" required />
                        <label htmlFor="input-password">Password</label>
                        {
                            hiddenPassword ?
                                <LockIcon className="icon cursor-pointer" onClick={togglePassword} />
                                :
                                <LockOpenIcon className='icon cursor-pointer' onClick={togglePassword} />
                        }
                    </div>
                    <button
                        type="submit"
                        style={{ "--i": 3, "--j": 26 }}
                        className="btn animation mt-5 mb-3"
                    >
                        Login
                    </button>
                    <div
                        style={{ "--i": 4, "--j": 27 }}
                        className="logreg-link animation text-[14.5px] text-[#fff] text-center m-[10px_0px_10px] "
                    >
                        <p>
                            Don't have an account?
                            <NavLink
                                onClick={() => {
                                    handleForm();
                                    clearForm();
                                    setHiddenPassword(true)
                                }}
                                className="register-link decoration-0 text-[#0ef] font-[600] hover:underline "
                            >
                                Sign Up
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
            <div className="info-text md:flex hidden right-0 text-right p-[0px_40px_60px_100px] login">
                <h2 className="animation font-semibold" style={{ "--i": 0, "--j": 23 }}>
                    Evaluate It Easily
                </h2>
                <p className="animation" style={{ "--i": 1, "--j": 24 }}>
                    To keep connected with us please login with your personal info
                </p>
            </div>
        </>
    );
}
