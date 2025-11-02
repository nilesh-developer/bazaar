import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeactivatedStore() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    if (loading) {
        // Loading screen
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className='flex h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
                </div>
            </div>
        );
    }

    // The actual deactivated store page (if loading was false before navigate fires)
    return (
        <div className="min-h-screen bg-white flex flex-col items-stretch">
            <main className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center py-20">
                    <div className="mb-8 flex items-center justify-center">
                        <svg
                            width="160"
                            height="160"
                            viewBox="0 0 160 160"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="30" y="10" width="100" height="60" rx="8" fill="#F6C143" />
                            <path d="M60 70h40" stroke="#A1643A" strokeWidth="8" strokeLinecap="round" />
                            <path d="M80 78v30" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="80" cy="118" r="8" fill="#222" />
                            <path
                                d="M80 86c-4 8-10 12-14 18"
                                stroke="#4CAF50"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect x="18" y="76" width="18" height="28" rx="6" fill="#FDECEC" />
                        </svg>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                        There's nothing here
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">Currently, store is closed</p>

                    <div className="flex justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 rounded-2xl bg-green-700 text-white font-medium shadow-md hover:brightness-95 focus:outline-none"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </main>

            <footer className="h-6" />
        </div>
    );
}
