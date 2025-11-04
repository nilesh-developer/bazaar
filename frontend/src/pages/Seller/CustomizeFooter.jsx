import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';
import { Facebook, Instagram, Mail, MessageCircle, Twitter, Youtube } from 'lucide-react';

function CustomizeFooter() {

    const [storeId, setStoreId] = useState("")
    const [store, setStore] = useState({})
    const [loading, setLoading] = useState(true);
    const { token } = useAuth()
    const [updateData, setUpdateData] = useState({
        bio: "",
        email: "",
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: "",
        whatsapp: ""
    })

    const getStoreData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json()
                setStoreId(responseData.data.store._id)
                setStore(responseData.data.store)
                setUpdateData({
                    bio: responseData.data.store.bio,
                    email: responseData.data.store.email,
                    instagram: responseData.data.store.instagram,
                    facebook: responseData.data.store.facebook,
                    twitter: responseData.data.store.twitter,
                    youtube: responseData.data.store.youtube,
                    whatsapp: responseData.data.store.whatsapp
                })
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getStoreData()
    }, [])

    if (loading) {
        return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    const handleInput = (e) => {
        let { name, value } = e.target

        setUpdateData({
            ...updateData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/update/social/${storeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...updateData
                }),
            });

            if (response.ok) {
                toast.success("Store updated successfully");
            } else {
                console.log(response)
                toast.error("Failed to update store");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

    return (
        <div className='flex-grow h-screen'>
            <div className='lg:my-7 lg:mx-10 my-3 mx-3'>
                <h2 className='text-xl lg:text-3xl text-zinc-900 font-bold tracking-tighter'>Store Bio & Social Links</h2>
                <div className='mt-8 pb-6'>
                    <form onSubmit={handleSubmit} className='grid grid-flow-row'>
                        <label className='font-semibold tracking-tight text-zinc-900 text-lg' htmlFor="bio">Bio <span className='text-xs font-normal'>(Write something about your store)</span></label>
                        <textarea
                            className="textarea textarea-bordered resize-none bg-white mt-1 h-[200px] lg:w-[380px]"
                            name='bio'
                            id='bio'
                            onChange={handleInput}
                            value={updateData.bio}
                            placeholder="Store Bio">
                            {updateData.bio}
                        </textarea>
                        <label className='flex items-center gap-1 font-semibold tracking-tight text-zinc-900 text-lg mt-7' htmlFor="email"><Mail className='h-5'/>Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            onChange={handleInput}
                            value={updateData.email}
                            placeholder="Store Email"
                            className="input input-bordered text-black bg-white lg:w-[380px]"
                        />

                        <h2 className='mt-8 text-2xl font-bold text-zinc-900'>Social Links</h2>
                        <label className="flex items-center gap-1 mt-3 text-pink-700"><Instagram className='h-5' />Instagram</label>
                            <input
                                type="text"
                                className="grow input input-bordered flex items-center bg-white gap-2 lg:w-[324px]"
                                name="instagram"
                                onChange={handleInput}
                                value={updateData.instagram}
                                placeholder="Instagram Link"
                            />
                        <label className="flex items-center gap-1 mt-3 text-red-700"><Youtube className='h-5' />YouTube</label>
                        <input
                            type="text"
                            className="grow input input-bordered flex items-center bg-white gap-2 lg:w-[324px]"
                            name='youtube'
                            onChange={handleInput}
                            value={updateData.youtube}
                            placeholder="Youtube Link"
                        />
                        <label className="flex items-center gap-1 mt-3 text-emerald-700"><MessageCircle className='h-5' />WhatsApp</label>
                        <input
                            type="text"
                            className="grow input input-bordered flex items-center bg-white gap-2 lg:w-[324px]"
                            name='whatsapp'
                            onChange={handleInput}
                            value={updateData.whatsapp}
                            placeholder="+919876543210"
                        />
                        <label className="flex items-center gap-1 mt-3 text-blue-700"><Facebook className='h-5' />Facebook</label>
                            <input
                                type="text"
                                className="grow input input-bordered flex items-center bg-white gap-2 lg:w-[324px]"
                                name='facebook'
                                onChange={handleInput}
                                value={updateData.facebook}
                                placeholder="Facebook Link"
                            />
                        <label className="flex items-center gap-1 mt-3 text-black"><Twitter className='h-5' />Twitter</label>
                        <input
                            type="text"
                            className="grow input input-bordered flex items-center bg-white gap-2 lg:w-[324px]"
                            name='twitter'
                            onChange={handleInput}
                            value={updateData.twitter}
                            placeholder="Twitter Link"
                        />
                        <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-lg mt-6 lg:w-28 mb-12">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomizeFooter