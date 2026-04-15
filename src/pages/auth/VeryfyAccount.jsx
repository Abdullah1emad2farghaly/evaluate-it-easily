import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { emailConfirmation, resendEmail } from "../../services/authServices";
import { toast } from "react-toastify";
import SimpleLoader from "../../loaders/SimpleLoader";

export default function VerifyAccount() {
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const resendRef = useRef();

    const params = location.search;
    const code = new URLSearchParams(params).get("code");
    const userId = new URLSearchParams(params).get("userId");
    const email = localStorage.getItem("registeredEmail");


    const data = {
        userId,
        code
    }

    const handleVerify = async (data) => {
        setLoading(true);
        try {
            const res = await emailConfirmation(data);
            toast.success("Email verified successfully!");
            navigate('/auth');
            console.log(res);
        } catch (error) {
            toast.error("Verification failed. Please click on resend code to get a new verification code.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = async (email) => {
        setLoading(true);
        try {
            const res = await resendEmail(email);
            toast.success("Please check your email to confirm your account.");
            console.log(res);
            setIsResendDisabled(true);
            setTimer(30);
        } catch (error) {
            toast.error("Failed to resend verification email. Please try again");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Timer for resend button
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    setIsResendDisabled(false);
                    clearInterval(timerInterval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [timer]);

    if (isResendDisabled) {
        resendRef.current && (resendRef.current.disabled = true);
    } else {
        resendRef.current && (resendRef.current.disabled = false);
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <SimpleLoader loading={loading} />
            <div className="bg-[#0f172a] mx-2 shadow-[0px_0px_10px_#0df] text-white sm:p-8 p-4 rounded-2xl border border-[#0df] w-125 text-center">

                <h2 className="text-2xl font-bold mb-2">Verify your account</h2>
                <p className="text-gray-400 mb-6">
                    Enter to verify to verification {" "}
                    <br className="sm:hidden block" />
                    <span className="text-grey-600 font-bold">your email</span>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-8">
                    <textarea readOnly value={code} className="w-full text-gray-400 border border-[#717070] focus:outline-none p-3 rounded resize-none  " rows={5} name="" id=""></textarea>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <button onClick={() => handleVerify(data)} className="bg-green-500 hover:bg-green-600 cursor-pointer px-8 py-2 rounded-lg font-bold tracking-[1px] transition">
                        Verify
                    </button>

                    <button ref={resendRef} onClick={() => handleResendEmail(email)} className="text-red-500 hover:text-red-400 cursor-pointer underline text-sm">
                        Resend code
                    </button>
                </div>

                <p className="text-gray-500 text-sm">
                    You can request a new code in <span>{timer}s</span>
                </p>
            </div>
        </div>
    );
}