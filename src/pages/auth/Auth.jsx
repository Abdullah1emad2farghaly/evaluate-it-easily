import React, { useState } from 'react'
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';

export default function Auth() {
    const [active, setActive] = useState("");

    const handleSignUp = () => {
        if (!active) {
            setActive("active");
        } else {
            setActive("");
        }
    };


    return (
        <div className="parent flex justify-center items-center h-screen bg-[#081b29]">
            <div
                className={`wrapper ${active} rounded-2xl shadow-[0px_0px_10px_#0df] overflow-hidden relative md:w-[800px] sm:w-[80%] w-[98%] h-[500px] bg-transparent border border-[#0df]`}
            >
                <span className="bg-animate md:block hidden pointer-events-none"></span>
                <span className="bg-animate2 md:block hidden pointer-events-none"></span>
                <Login active={active} handleForm={handleSignUp} />
                <Register active={active} handleForm={handleSignUp} />
            </div>
        </div>
    );
}
