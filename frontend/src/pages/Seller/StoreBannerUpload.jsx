import React, { useEffect, useState } from 'react';
import { Upload, X, Image, Monitor, Smartphone, Globe, Star } from 'lucide-react';
import useStoreData from '../../Hooks/useStoreData';
import toast from 'react-hot-toast';
import axios from 'axios'

export default function StoreBannerUpload() {
    const [uploading, setUploading] = useState(false)
    const [uploads, setUploads] = useState({
        logo: null,
        favicon: null,
        desktopBanner: null,
        mobileBanner: null,
        sliderImages: []
    });
    const [previousUploads, setPreviousUploads] = useState({
        logo: null,
        favicon: null,
        desktopBanner: null,
        mobileBanner: null,
        sliderImages: []
    });
    const { user, loading } = useStoreData()

    useEffect(() => {
        if (user?.store) {
            setPreviousUploads({
                logo: user.store.logo || null,
                favicon: user.store.favicon || null,
                desktopBanner: user.store.desktopBanner || null,
                mobileBanner: user.store.mobileBanner || null,
                sliderImages: user.store.sliderImages || []
            });
        }
    }, [user]);

    const handleFileUpload = (type, file) => {
        if (type === 'sliderImages') {
            setUploads(prev => ({
                ...prev,
                sliderImages: [...prev.sliderImages, file]
            }));
        } else {
            setUploads(prev => ({
                ...prev,
                [type]: file
            }));
        }
    };

    const removeFile = (type, index = null) => {
        if (type === 'sliderImages' && index !== null) {
            setUploads(prev => ({
                ...prev,
                sliderImages: prev.sliderImages.filter((_, i) => i !== index)
            }));
        } else {
            setUploads(prev => ({
                ...prev,
                [type]: null
            }));
        }
    };

    const FileUploadCard = ({ title, description, icon: Icon, type, acceptedFormats, maxSize, isMultiple = false }) => {
        const currentFile = uploads[type];

        return (
            <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                </div>

                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        multiple={isMultiple}
                        onChange={(e) => {
                            if (isMultiple) {
                                Array.from(e.target.files).forEach(file => handleFileUpload(type, file));
                            } else {
                                handleFileUpload(type, e.target.files[0]);
                            }
                        }}
                        className="hidden"
                        id={`upload-${type}`}
                    />
                    <label htmlFor={`upload-${type}`} className="cursor-pointer">
                        <Upload className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-700 font-medium mb-1">Click to upload</p>
                        <p className="text-xs text-gray-500">{acceptedFormats} • Max {maxSize}</p>
                    </label>
                </div>

                {/* Display current file if exists */}
                {previousUploads[type] && type !== 'sliderImages' && (
                    <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded">
                        <img src={previousUploads[type]} alt="image" className='h-10' />
                        <span className='text-gray-700 italic'>Stored file</span>
                    </div>
                )}

                {type === 'sliderImages' && previousUploads.sliderImages.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {previousUploads.sliderImages.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                <img src={previousUploads[type]} alt="image" className='h-10' />
                                <span className='text-gray-700 italic'>Stored file</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Display uploaded files */}
                {type === 'sliderImages' && uploads.sliderImages.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {uploads.sliderImages.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded">
                                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                <button
                                    onClick={() => removeFile(type, index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {currentFile && type !== 'sliderImages' && (
                    <div className="mt-4 flex items-center justify-between bg-green-50 p-2 rounded">
                        <span className="text-sm text-gray-700 truncate">{currentFile.name}</span>
                        <button
                            onClick={() => removeFile(type)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formdata = new FormData();
        formdata.append('logo', uploads.logo);
        formdata.append('favicon', uploads.favicon);
        formdata.append('desktopBanner', uploads.desktopBanner);
        formdata.append('mobileBanner', uploads.mobileBanner);
        formdata.append('storeId', user.store._id);

        uploads.sliderImages.forEach((file, index) => {
            formdata.append('sliderImages', file); // multiple files under same key
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/store/upload/images`,
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            toast.success(response.data.message);
        } catch (err) {
            console.error(err);
            toast.error("Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <div className='flex h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }
    if (!user?.store) {
        return <div className='flex h-screen w-full justify-center items-center text-lg text-gray-700'>No store found. Please create a store first.</div>;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4 pb-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Star className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Store Assets Upload
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Upload your store's visual assets to create a professional and engaging online presence
                    </p>
                </div>

                {/* Upload Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <FileUploadCard
                        title="Store Logo"
                        description="Your main brand identity"
                        icon={Image}
                        type="logo"
                        acceptedFormats="PNG, JPG, SVG"
                        maxSize="2MB"
                    />

                    <FileUploadCard
                        title="Favicon"
                        description="Small icon for browser tabs"
                        icon={Globe}
                        type="favicon"
                        acceptedFormats="ICO, PNG"
                        maxSize="1MB"
                    />

                    <FileUploadCard
                        title="Desktop Banner"
                        description="Main banner for desktop visitors"
                        icon={Monitor}
                        type="desktopBanner"
                        acceptedFormats="PNG, JPG"
                        maxSize="5MB"
                    />

                    <FileUploadCard
                        title="Mobile Banner"
                        description="Optimized banner for mobile devices"
                        icon={Smartphone}
                        type="mobileBanner"
                        acceptedFormats="PNG, JPG"
                        maxSize="3MB"
                    />
                </div>

                {/* Slider Images Section */}
                <div className="mb-8">
                    <FileUploadCard
                        title="Banner Slider Images (Upto 5 images)"
                        description="Multiple images for your promotional slider"
                        icon={Image}
                        type="sliderImages"
                        acceptedFormats="PNG, JPG"
                        maxSize="5MB each"
                        isMultiple={true}
                    />
                </div>

                {/* Guidelines */}
                <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Guidelines</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-green-700 mb-2">Recommended Dimensions:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Logo: 200x200px or higher</li>
                                <li>• Favicon: 32x32px or 16x16px</li>
                                <li>• Desktop Banner: 1920x600px</li>
                                <li>• Mobile Banner: 768x400px</li>
                                <li>• Slider Images: 1920x600px</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-green-700 mb-2">Best Practices:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Use high-quality images</li>
                                <li>• Optimize file sizes for web</li>
                                <li>• Maintain consistent branding</li>
                                <li>• Test on different devices</li>
                                <li>• Use PNG for transparency</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {   /* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        {uploading ? <span className="loading loading-spinner loading-md"></span> : "Save Store Assets"}
                    </button>
                    <button
                        onClick={() => setUploads({
                            logo: null,
                            favicon: null,
                            desktopBanner: null,
                            mobileBanner: null,
                            sliderImages: []
                        })}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 shadow-lg transition-all duration-300"
                    >
                        Clear All
                    </button>
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 bg-white rounded-xl shadow-lg border border-green-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Progress</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { key: 'logo', label: 'Logo' },
                            { key: 'favicon', label: 'Favicon' },
                            { key: 'desktopBanner', label: 'Desktop' },
                            { key: 'mobileBanner', label: 'Mobile' },
                            { key: 'sliderImages', label: 'Slider' }
                        ].map(({ key, label }) => (
                            <div key={key} className="text-center">
                                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${(key === 'sliderImages' ? uploads[key].length > 0 : uploads[key])
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {(key === 'sliderImages' ? uploads[key].length > 0 : uploads[key]) ? '✓' : '○'}
                                </div>
                                <p className="text-xs text-gray-600">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}