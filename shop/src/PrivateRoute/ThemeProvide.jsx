import React from 'react'
import LazyLoadingPage from '../components/LazyLoadingPage';
import MiniLayout from '../pages/MiniLayout';
import StoreLayout from '../pages/StoreLayout';
import { useEffect } from 'react';
import { useState } from 'react';

function ThemeProvider() {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState("")

    const subdomain = window.location.hostname;

    useEffect(() => {
        try {
            setLoading(true)
                ; (async () => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/data`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ subdomain })
                    })
                    const responseData = await response.json();
                    if (responseData.data.store.status === true) {
                        setStore(responseData.data.store)
                    }


                })()

            setLoading(false)

        } catch (error) {
            console.log("Error", error)
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <LazyLoadingPage />
    }

    return store?.template === "theme1" ?
        <MiniLayout />
        :
        <StoreLayout />
}

export default ThemeProvider