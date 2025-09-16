import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../store/auth'
import { Helmet } from 'react-helmet'
import { Eye, EyeOff } from 'lucide-react' // for password toggle

function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const navigate = useNavigate()
    const { storeTokenInLS, setUserId } = useAuth()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user.email || !user.password) {
            toast.error("All fields are required")
            return
        }
        setLoadingBtn(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            const data = await response.json()

            if (response.ok) {
                setUser({ email: "", password: "" })
                setUserId(data.data.user._id)
                storeTokenInLS(data.data.token)
                toast.success(data.message)
                if (data.data.user.store) {
                    navigate("/seller/dashboard")
                } else {
                    navigate("/create-store")
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoadingBtn(false)
        }
    }

    return (
        <>
            <Helmet><title>Login</title></Helmet>

            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-center text-green-700 mb-2">Welcome Back</h1>
                    <p className="text-center text-gray-500 mb-8 text-sm">
                        Log in to continue managing your store.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600">
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
                            <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="text-right -mt-3">
                            <Link
                                to="/forgot-password"
                                className="text-green-700 font-medium text-sm hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-md text-white font-semibold text-lg bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-md"
                        >
                            {loadingBtn ? <span className="loading loading-spinner loading-md"></span> : "Login"}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Not registered?{" "}
                            <Link to="/signup" className="font-semibold text-green-700 hover:underline">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
