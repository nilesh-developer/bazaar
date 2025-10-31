import React, { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

export default function ProductImagesUpload({ images, setImages }) {

    const fileInputRef = useRef(null);
    const keysOrder = ["featuredImage", "image1", "image2", "image3", "image4"];

    const handleFiles = (rawFiles) => {
        const files = Array.from(rawFiles || []);
        if (files.length === 0) return;

        setImages((prev) => {
            const updated = { ...prev };
            let availableKeys = keysOrder.filter((k) => !updated[k]);
            if (availableKeys.length === 0) availableKeys = [...keysOrder];

            for (let i = 0; i < files.length && i < availableKeys.length; i++) {
                updated[availableKeys[i]] = files[i];
            }
            return updated;
        });
    };

    const handleBrowse = (e) => {
        handleFiles(e.target.files);
        e.target.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer?.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const clearImage = (key) => {
        setImages((prev) => ({ ...prev, [key]: null }));
    };

    const getPreview = (file) => {
        if (!file) return null;
        return URL.createObjectURL(file);
    };

    const allFiles = keysOrder.map((k) => images[k]).filter(Boolean);

    return (
        <div className="space-y-4">
            <label className="block font-medium text-gray-800">
                Images <span className="text-red-500">*</span>
            </label>

            {/* Upload area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <UploadCloud className="mx-auto text-gray-400" size={40} />
                <p className="mt-3 text-gray-800 font-medium">
                    Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-500">
                    Images up to 10MB · Videos up to 50MB
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Tip: Aim for a 4:5 aspect ratio so storefront grids and product pages look their best.
                </p>

                <div className="mt-4">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current.click();
                        }}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-md hover:bg-emerald-700"
                    >
                        Choose Files
                    </button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleBrowse}
                />
            </div>

            {/* Preview only after upload */}
            {allFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {keysOrder.map((key) => {
                        const file = images[key];
                        if (!file) return null;
                        const preview = getPreview(file);
                        const isVideo = file.type.startsWith("video");
                        return (
                            <div
                                key={key}
                                className="relative border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                            >
                                {isVideo ? (
                                    <video
                                        src={preview}
                                        className="object-cover w-full h-32"
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={preview}
                                        alt={key}
                                        className="object-cover w-full h-32"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => clearImage(key)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 text-xs hover:bg-black/80"
                                    title="Remove"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            {!images?.featuredImage && <p className="text-xs text-red-600">Upload atleast 1 image</p>}
        </div>
    );
}
