import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const sendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            setStatusMessage('Please enter a valid email.');
            return;
        }
        try {
            setLoadingBtn(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/sendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('code', data.otp);
                setOtpSent(true);
                setStatusMessage('OTP has been sent to your email.');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoadingBtn(false);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Invalid OTP");
            setStatusMessage('Invalid OTP. Please try again.');
            return;
        }

        try {
            setLoadingBtn(true);
            const otpToken = localStorage.getItem('code');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/verifyotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ otpToken })
            });

            const data = await response.json();

            if (response.ok && data.otp.otp === Number(otp)) {
                setOtpVerified(true);
                localStorage.removeItem("code");
                setStatusMessage('OTP verified successfully!');
                toast.success('OTP verified successfully!');
            } else {
                toast.error("Incorrect OTP");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoadingBtn(false);
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoadingBtn(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/reset-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password updated successfully!");
                setStatusMessage("Password has been updated.");
                navigate("/login")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoadingBtn(false);
        }
    };

    return (
        <div data-theme="light" className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>

                {!otpSent && (
                    <>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <button
                            onClick={sendOtp}
                            className="w-full bg-green-700 text-white py-2 rounded-xl hover:bg-green-800 transition"
                        >
                            {!loadingBtn ? "Send OTP" : <span className="loading loading-spinner loading-md"></span>}
                        </button>
                    </>
                )}

                {otpSent && !otpVerified && (
                    <>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                            />
                        </div>
                        <button
                            onClick={verifyOtp}
                            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                        >
                            {!loadingBtn ? "Verify OTP" : <span className="loading loading-spinner loading-md"></span>}
                        </button>
                    </>
                )}

                {otpVerified && (
                    <>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button
                            onClick={updatePassword}
                            className="w-full bg-green-700 text-white py-2 rounded-xl hover:bg-green-800 transition"
                        >
                            {!loadingBtn ? "Update Password" : <span className="loading loading-spinner loading-md"></span>}
                        </button>
                    </>
                )}

                {statusMessage && (
                    <p className="text-sm text-center text-gray-600">{statusMessage}</p>
                )}
            </div>
        </div>
    );
}
