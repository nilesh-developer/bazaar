import React from 'react'
import { Navigate } from 'react-router-dom'
import useStoreData from '../Hooks/useStoreData';

function CheckStoreCreated({ children }) {
    const { user, loading } = useStoreData();

    if(loading){
        return <div className='flex h-dvh w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return user?.store ? children : <Navigate to="/create-store" /> //  /create-store
}

export default CheckStoreCreated