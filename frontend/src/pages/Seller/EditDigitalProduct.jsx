import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { Link2, Upload } from "lucide-react";
import ProductImagesUpload from "../../components/Seller/ProductImagesUpload";

export default function EditDigitalProduct() {
    const { id } = useParams()
    const { token, currentPlan, userData } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [store, setStore] = useState(null);
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Basic product fields
    const [product, setProduct] = useState({
        name: "",
        shortDescription: "",
        originalPrice: "",
        salePrice: "",
        category: "",
        metaTitle: "",
        metaDescription: "",
        returnDetails: '',
        deliveryDetails: '',
    });
    const [images, setImages] = useState({
        featuredImage: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    });
    const [status, setStatus] = useState(true);
    const [recommended, setRecommeded] = useState(true)
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);

    // Digital-specific
    const [deliveryMethod, setDeliveryMethod] = useState("external"); // 'external' or 'upload'
    const [externalLink, setExternalLink] = useState("");
    const [availableDigitalFiles, setAvailableDigitalFiles] = useState([]);
    const [digitalFiles, setDigitalFiles] = useState([]); // File list
    const [downloadAccess, setDownloadAccess] = useState("unlimited"); // 'unlimited' or 'limited'
    const [downloadLimit, setDownloadLimit] = useState(1);

    const navigate = useNavigate();

    async function getProductData() {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/data/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                setProduct({
                    name: responseData.data.name,
                    shortDescription: responseData.data.shortDescription,
                    originalPrice: responseData.data.originalPrice,
                    salePrice: responseData.data.salePrice,
                    category: responseData.data.category._id,
                    returnDetails: responseData.data.returnDetails,
                    deliveryDetails: responseData.data.deliveryDetails,
                    metaTitle: responseData.data.metaTitle,
                    metaDescription: responseData.data.metaDescription,
                });
                setDescription(responseData.data.description)
                setImages({
                    featuredImage: responseData.data.images.featuredImage,
                    image1: responseData.data.images.image1,
                    image2: responseData.data.images.image2,
                    image3: responseData.data.images.image3,
                    image4: responseData.data.images.image4,
                });
                setTags(responseData.data.tags);
                setStatus(responseData.data.status);
                setRecommeded(responseData.data.recommended)
                setDeliveryMethod(responseData.data.digital?.deliveryMethod)
                setExternalLink(responseData.data.digital?.externalLink)
                setAvailableDigitalFiles(responseData.data.digital?.digitalFiles)
                setDownloadAccess(responseData.data.digital?.downloadAccess)
                setDownloadLimit(responseData.data.digital?.downloadLimit)
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchInitial();
        getProductData()
    }, []);

    const fetchInitial = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                setStore(data.data.store);

                // fetch categories
                const catRes = await fetch(`${import.meta.env.VITE_API_URL}/api/category/get-data/${data.data.store._id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (catRes.ok) {
                    const catData = await catRes.json();
                    setCategories(catData.data || []);
                }
            } else {
                toast.error("Failed to fetch user store data");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setImages((prevImages) => ({ ...prevImages, [name]: files[0] }));
    };

    const getImageUrl = (image) => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }
        if (typeof image === 'string') {
            return image;
        }
        return "/image.svg";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((p) => ({ ...p, [name]: value }));
    };

    const handleFilesChange = (e) => {
        const files = Array.from(e.target.files || []);
        // optional: enforce client-side limits (also enforce on server)
        setDigitalFiles(files);
    };

    const addTag = (tag) => {
        if (!tag) return;
        setTags((prev) => {
            if (prev.includes(tag)) return prev;
            return [...prev, tag];
        });
    };
    const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t));

    const validate = () => {
        if (!product.name.trim()) return "Product name is required";
        if (!product.shortDescription.trim()) return "Short description is required";
        if (!product.originalPrice) return "Price is required";
        if (!product.category) return "Category is required";
        // delivery method checks
        if (deliveryMethod === "external" && !externalLink.trim()) return "Provide a download URL or choose upload files";
        if (deliveryMethod === "upload" && digitalFiles.length === 0 && availableDigitalFiles.length === 0) return "Upload at least one digital file";
        return null;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const err = validate();
        if (err) return toast.error(err);

        const formData = new FormData();
        Object.keys(images).forEach((key) => formData.append(key, images[key]));
        formData.append("name", product.name);
        formData.append("shortDescription", product.shortDescription);
        formData.append("originalPrice", product.originalPrice);
        formData.append("salePrice", product.salePrice);
        formData.append("category", product.category);
        formData.append("description", description);
        formData.append("metaTitle", product.metaTitle);
        formData.append("metaDescription", product.metaDescription);
        formData.append("returnDetails", product.returnDetails);
        formData.append("deliveryDetails", product.deliveryDetails);
        formData.append("tags", JSON.stringify(tags));
        formData.append("storeId", store._id);
        formData.append("status", status);
        formData.append("recommended", recommended);
        formData.append("isDigital", true);

        // Delivery method specifics
        formData.append("deliveryMethod", deliveryMethod); // 'external' or 'upload'
        if (deliveryMethod === "external") {
            formData.append("externalLink", externalLink);
        } else {
            // append files as digitalFiles[]
            digitalFiles.forEach((file, idx) => {
                formData.append("digitalFiles[]", file, file.name);
            });
        }

        formData.append("downloadAccess", downloadAccess);
        if (downloadAccess === "limited") {
            formData.append("downloadLimit", downloadLimit);
        }

        try {
            setUploading(true);
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/product/update-digital-product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message || "Digital product updated");
            // reset form
            setProduct({
                name: "",
                shortDescription: "",
                originalPrice: "",
                salePrice: "",
                category: "",
                metaTitle: "",
                metaDescription: "",
                returnDetails: '',
                deliveryDetails: '',
            });
            setImages({
                featuredImage: null,
                image1: null,
                image2: null,
                image3: null,
                image4: null,
            });
            setDescription("");
            setTags([]);
            setDigitalFiles([]);
            setExternalLink("");
            navigate("../products");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }


    return (
        <div data-theme="light" className="bg-white p-4 lg:p-10 lg:min-h-screen h-full lg:mb-0 mb-20">
            <div className="flex justify-between">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Edit Digital Product</h2>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="w-full hidden lg:block px-4 py-2 font-bold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none"
                        disabled={uploading}
                    >
                        {uploading ? <span className="loading loading-spinner loading-md"></span> : "Update"}
                    </button>
                </div>
            </div>

            <div className="lg:flex lg:gap-3">
                {/* LEFT: main form */}
                <div className="w-full h-auto lg:mt-0 space-y-3 rounded-lg">
                    <div className="w-full py-3 bg-white rounded-lg">
                        <h4 className="font-bold text-lg">Product Information</h4>
                        <p className="text-gray-600 font-semibold text-sm tracking-tight">
                            Update title, prices,category and digital delivery.
                        </p>

                        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md"
                                    value={product.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                                    Short Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="shortDescription"
                                    name="shortDescription"
                                    required
                                    className="w-full h-[120px] px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md"
                                    value={product.shortDescription}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description<span className="text-red-500">*</span></label>
                                {/* Product Description Field (ReactQuill) */}
                                <div className="form-group">
                                    <ReactQuill
                                        value={description}
                                        onChange={setDescription}
                                        className='h-[200px] mb-28 lg:mb-24'
                                        modules={{
                                            toolbar: [
                                                [{ header: '1' }, { header: '2' }, { font: [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                ['link', 'image'],
                                                ['clean'],
                                            ],
                                        }}
                                        formats={[
                                            'header',
                                            'font',
                                            'size',
                                            'bold',
                                            'italic',
                                            'underline',
                                            'strike',
                                            'blockquote',
                                            'list',
                                            'bullet',
                                            'link',
                                            'image',
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-full">
                                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="originalPrice"
                                        name="originalPrice"
                                        type="number"
                                        required
                                        className="w-full px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md"
                                        value={product.originalPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">
                                        Discounted Price
                                    </label>
                                    <input
                                        id="salePrice"
                                        name="salePrice"
                                        type="number"
                                        className="w-full px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md"
                                        value={product.salePrice}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Product Category <span className="text-red-500">*</span>
                                    </label>
                                    <Link className="text-sm font-semibold text-emerald-500" to="../add-category">
                                        Add new category
                                    </Link>
                                </div>
                                <select
                                    onChange={handleChange}
                                    value={product.category}
                                    id="category"
                                    name="category"
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md"
                                >
                                    <option value="" disabled>
                                        Select product category
                                    </option>
                                    {categories.map((category, index) => (
                                        <option value={category._id} key={index}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags (simple input + add) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tags</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Enter tag then press add"
                                        className="px-3 py-2 border border-gray-300 rounded-md w-full"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addTag(e.target.value.trim());
                                                e.target.value = "";
                                            }
                                        }}
                                    />
                                    {/* <button
                                        type="button"
                                        onClick={() => {
                                            const el = document.querySelector("#temp-tag-input");
                                            if (el?.value) {
                                                addTag(el.value.trim());
                                                el.value = "";
                                            }
                                        }}
                                        className="px-3 py-2 bg-emerald-600 text-white rounded-md"
                                    >
                                        Add
                                    </button> */}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((t, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {t}{" "}
                                            <button onClick={() => removeTag(t)} className="ml-2 text-gray-500">
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-between pb-3">
                        <div className="flex items-center">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mr-3">Visibility Status<span className="text-red-500">*</span></label>
                            <input
                                data-theme='light'
                                id='status'
                                name='status'
                                type="checkbox"
                                className="toggle toggle-success text-red-600"
                                onChange={() => setStatus(!status)}
                                checked={status}
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="recommended" className="block text-sm font-medium text-gray-700 mr-3">Featured<span className="text-red-500">*</span></label>
                            <input
                                data-theme='light'
                                id='recommended'
                                name='recommended'
                                type="checkbox"
                                className="toggle toggle-success text-red-600"
                                onChange={() => setRecommeded(!recommended)}
                                checked={recommended}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="returnDetails" className="block text-sm font-medium text-gray-700">Return Details<span className="text-red-500">*</span></label>
                        <textarea
                            id="returnDetails"
                            name="returnDetails"
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={product.returnDetails}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="deliveryDetails" className="block text-sm font-medium text-gray-700">Delivery Details<span className="text-red-500">*</span></label>
                        <textarea
                            id="deliveryDetails"
                            name="deliveryDetails"
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-transparent border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={product.deliveryDetails}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                {/* RIGHT: delivery + usage + files */}
                <div className="w-full h-auto mt-6 lg:mt-0 space-y-6 rounded-lg">
                    <div className="py-6 bg-white rounded-lg">
                        <h3 className="font-semibold">Delivery Method</h3>
                        <p className="text-sm text-gray-500">Choose how you want to deliver the digital product to customers</p>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="w-full">
                                <button
                                    type="button"
                                    onClick={() => setDeliveryMethod("upload")}
                                    className={`flex justify-center items-center py-3 px-4 w-full rounded-lg border text-sm text-left ${deliveryMethod === "upload" ? "bg-emerald-100 border-emerald-600 shadow-sm text-emerald-900 font-semibold" : "bg-white border-gray-200"
                                        }`}
                                    disabled={currentPlan?.name === "free" ? true : false}
                                >
                                    <Upload className="h-4" /> Upload Files
                                </button>
                            </div>
                            <div className="w-full">
                                <button
                                    type="button"
                                    onClick={() => setDeliveryMethod("external")}
                                    className={`flex justify-center items-center py-3 px-4 w-full rounded-lg border text-sm text-left ${deliveryMethod === "external" ? "bg-emerald-100 border-emerald-600 shadow-sm text-emerald-900 font-semibold" : "bg-white border-gray-200"
                                        }`}
                                >
                                    <Link2 className="h-4" /> External Link
                                </button>
                            </div>
                        </div>

                        {/* Plan / usage notice */}
                        {currentPlan?.name?.toLowerCase() === "free" && <div className="mt-4 p-3 rounded-md bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
                            <div className="font-medium">{currentPlan?.name} Plan</div>
                            <div className="mt-1">
                                Upgrade to Go to upload files with expiring download links (3 files per product, 500MB per product),
                                or continue sharing external URLs on the Free plan.
                            </div>

                            <div className="mt-2 bg-emerald-100 p-2 rounded text-xs text-emerald-700">
                                <strong>Secure file delivery starts with Go</strong> — upgrade to unlock expiring links (3 files per product, 500MB per product).
                            </div>

                            {/* usage progress */}
                            <div className="mt-3">
                                <div className="text-xs text-gray-600 mb-1">
                                    You're using <strong>{store?.products?.length}</strong> of <strong>{currentPlan?.features?.upToProducts}</strong> active product slots.
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div
                                        className={`h-2 rounded-full ${Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100) >= 80 ? "bg-amber-500" : "bg-emerald-600"}`}
                                        style={{ width: `${Math.min(100, Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100))}%` }}
                                    />
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Usage {Math.min(100, Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100))}%</div>
                            </div>
                        </div>
                        }

                        {currentPlan?.name?.toLowerCase() === "go" && <div className="mt-4 p-3 rounded-md bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
                            <div className="font-medium">{currentPlan?.name} Plan</div>
                            <div className="mt-1">
                                Upgrade to Plus to upload files with expiring download links (5 files per product, 1GB per product),
                                or continue sharing external URLs on the Free plan.
                            </div>

                            <div className="mt-2 bg-emerald-100 p-2 rounded text-xs text-emerald-700">
                                <strong>Secure file delivery starts with Plus</strong> — upgrade to unlock expiring links (5 files per product, 1GB per product).
                            </div>

                            {/* usage progress */}
                            <div className="mt-3">
                                <div className="text-xs text-gray-600 mb-1">
                                    You're using <strong>{store?.products?.length}</strong> of <strong>{currentPlan?.features?.upToProducts}</strong> active product slots.
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div
                                        className={`h-2 rounded-full ${Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100) >= 80 ? "bg-amber-500" : "bg-emerald-600"}`}
                                        style={{ width: `${Math.min(100, Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100))}%` }}
                                    />
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Usage {Math.min(100, Number(Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100))}%</div>
                            </div>
                        </div>
                        }
                    </div>

                    {/* Upload Files or External Link */}
                    <div className="bg-white rounded-lg">
                        {deliveryMethod === "external" ? (
                            <>
                                <label className="block text-sm font-medium text-gray-700">Download Link (External)</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/download/product.zip"
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                                    value={externalLink}
                                    onChange={(e) => setExternalLink(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Customers will be redirected to this URL after purchase. Make sure the link remains accessible.
                                </p>
                            </>
                        ) : (
                            <>
                                <label className="block text-sm font-medium text-gray-700">Upload Files</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFilesChange}
                                    accept=".zip,.pdf,.png,.jpg,.jpeg,.mp3"
                                    className="w-full mt-2"
                                />
                                <div className="mt-2 text-xs text-gray-600">
                                    {digitalFiles.length > 0 ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {digitalFiles.map((f, i) => (
                                                <li key={i}>
                                                    {f?.name} — {(f?.size / (1024 * 1024)).toFixed(2)} MB
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div>No files selected</div>
                                    )}
                                </div>
                                {currentPlan?.name?.toLowerCase() === "free" && <p className="text-xs text-gray-500 mt-2">
                                    Secure downloads are available on paid plans. Max 3 files per product, 500MB total on Go.
                                </p>
                                }
                                {availableDigitalFiles.length > 0 && <p className="text-sm text-emerald-800 font-semibold"><a href={availableDigitalFiles[0]}>View File</a></p>}
                            </>
                        )}
                    </div>

                    {/* Download access options */}
                    <div className="py-6 bg-white rounded-lg">
                        <h3 className="font-semibold">Download Access</h3>
                        <p className="text-sm text-gray-500">Control how many times the customer can download the file.</p>

                        <div className="mt-3 flex gap-3">
                            <button
                                onClick={() => setDownloadAccess("unlimited")}
                                className={`px-4 py-2 rounded-lg border w-full text-sm ${downloadAccess === "unlimited" ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200"
                                    }`}
                            >
                                Unlimited Downloads
                            </button>
                            <button
                                onClick={() => setDownloadAccess("limited")}
                                className={`px-4 py-2 rounded-lg border w-full text-sm ${downloadAccess === "limited" ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200"
                                    }`}
                            >
                                Limited Downloads
                            </button>
                        </div>

                        {downloadAccess === "limited" && (
                            <div className="mt-3">
                                <label className="block text-sm text-gray-700">Number of downloads</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={1000}
                                    value={downloadLimit}
                                    onChange={(e) => setDownloadLimit(Number(e.target.value))}
                                    className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-36"
                                />
                                <p className="text-xs text-gray-500 mt-2">Once the limit is reached, the download link will expire.</p>
                            </div>
                        )}
                    </div>

                    {/* <div className="py-6 bg-white rounded-lg">
                        <h3 className="font-semibold">SEO Information</h3>
                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm">Meta title</label>
                            <input
                                name="metaTitle"
                                value={product.metaTitle}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter meta title"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm">Meta description</label>
                            <textarea
                                name="metaDescription"
                                value={product.metaDescription}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md h-28"
                                placeholder="Enter meta description"
                            />
                        </div>
                    </div> */}
                    <div className="w-full h-auto mt-10 lg:mt-0 lg:p-8 space-y-6 bg-white rounded-lg">
                        <div className="text-center">
                            <h2 className="text-xl text-left font-bold">Product Images<span className="text-red-500">*</span></h2>
                            <p className="text-gray-600 text-sm font-semibold mb-4 text-left">Upload images to make your product stand out. Up to 5 images allowed</p>
                            <div className="flex justify-center gap-6 mb-6">
                                <div className="flex flex-col items-center cursor-pointer">
                                    <input onChange={handleImageChange} type="file" id="featuredImage" name="featuredImage" accept="image/*" hidden />
                                    <label htmlFor="featuredImage" className="flex flex-col items-center">
                                        <div className="w-48 h-48 border border-gray-300 rounded flex justify-center items-center mb-2">
                                            <img src={getImageUrl(images?.featuredImage)} alt="Upload images" className="w-32 h-32" />
                                        </div>
                                        <span className="text-gray-700">Upload Featured Image</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
                                {["image1", "image2", "image3", "image4"].map((img, idx) => (
                                    <div key={idx}>
                                        <input onChange={handleImageChange} type="file" id={img} name={img} accept="image/*" hidden />
                                        <label htmlFor={img} className="flex flex-col items-center">
                                            <img src={getImageUrl(images[img])} alt={`Image ${idx + 1}`} className="w-auto h-24 p-2 object-cover rounded border border-gray-400" />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* mobile Update button */}
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="w-full lg:hidden px-4 py-2 font-bold text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                            disabled={uploading}
                        >
                            {uploading ? <span className="loading loading-spinner loading-md"></span> : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
