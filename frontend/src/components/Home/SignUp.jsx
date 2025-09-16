import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../store/auth'
import { Helmet } from "react-helmet"
import { Eye, EyeOff } from 'lucide-react' // Modern icons

function SignUp() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [otpsend, setOtpsend] = useState(false)
    const [otp, setOtp] = useState('')
    const [loadingBtn, setLoadingBtn] = useState(false)
    const navigate = useNavigate()
    const { storeTokenInLS, setUserId } = useAuth()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sendOTP = async (e) => {
        e.preventDefault()
        if (!user.email || !user.password || !confirmPassword) {
            toast.error("All fields are required")
            return
        }
        if (user.password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        try {
            setLoadingBtn(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/sendotp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('code', data.otp)
                setOtpsend(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoadingBtn(false)
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        if (!user.email || !user.password || !confirmPassword) {
            toast.error("All fields are required")
            return
        }
        if (user.password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        if (!otp) {
            toast.error("Invalid OTP")
            return
        }
        try {
            setLoadingBtn(true)
            const otpToken = localStorage.getItem('code')
            const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/verifyotp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otpToken })
            })
            const verifyData = await verifyResponse.json()

            if (verifyResponse.ok && verifyData.otp.otp === Number(otp)) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                })
                const registerData = await response.json()

                if (response.ok) {
                    setUser({ email: "", password: "" })
                    setConfirmPassword("")
                    localStorage.removeItem("code")
                    setUserId(registerData.data.user._id)
                    storeTokenInLS(registerData.data.token)
                    toast.success(registerData.message)
                    navigate("/create-store")
                } else {
                    toast.error(registerData.message)
                }
            } else {
                toast.error(verifyData.message || "Incorrect OTP")
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoadingBtn(false)
        }
    }

    return (
        <>
            <Helmet><title>Sign Up</title></Helmet>
            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-center text-green-700 mb-2">Create an Account</h1>
                    <p className="text-center text-gray-500 mb-8 text-sm">
                        Sign up to get started with your new store.
                    </p>

                    <form className="space-y-6">
                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                required
                                className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none"
                                placeholder="Email"
                            />
                            <label
                                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
                            >
                                Email
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleInput}
                                required
                                className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none"
                                placeholder="Password"
                            />
                            <label
                                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
                            >
                                Password
                            </label>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none"
                                placeholder="Confirm Password"
                            />
                            <label
                                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
                            >
                                Confirm Password
                            </label>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-500">
                                {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>

                        {/* OTP */}
                        {otpsend && (
                            <>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none"
                                        placeholder="Enter OTP"
                                    />
                                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600">
                                        OTP
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={sendOTP}
                                    className="text-xs text-green-700 font-semibold hover:underline text-right w-full"
                                >
                                    Resend OTP
                                </button>
                            </>
                        )}

                        {/* Submit */}
                        <button
                            onClick={otpsend ? verifyOtp : sendOTP}
                            className="w-full py-3 rounded-md text-white font-semibold text-lg bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-md"
                        >
                            {loadingBtn ? <span className="loading loading-spinner loading-md"></span> : (otpsend ? "Verify" : "Send OTP")}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-green-700 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
