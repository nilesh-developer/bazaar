import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Briefcase, Download, Package } from 'lucide-react';

const BusinessDetails = () => {
  const { storename } = useParams();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    businessName: '',
    address: '',
    mobileNo: ''
  });
  const [logo, setLogo] = useState('')
  const [selectedType, setSelectedType] = useState("physical");
  const navigate = useNavigate()

  const productTypes = [
    {
      id: "physical",
      icon: <Package className="w-6 h-6 text-green-600" />,
      title: "Physical Product",
      subtitle: "Items you ship to customers",
      desc: "Clothing, accessories, handmade goods",
    },
    {
      id: "digital",
      icon: <Download className="w-6 h-6 text-green-600" />,
      title: "Digital Product",
      subtitle: "Files customers download",
      desc: "PDFs, templates, courses, music",
    },
    {
      id: "service",
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      title: "Service",
      subtitle: "Time-based offerings you schedule with clients",
      desc: "Consultations, classes, freelance work",
    },
  ];

  const getImageUrl = (image) => {
    if (!image) {
      return "/image.svg";
    }
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    if (typeof image === 'string') {
      return image;
    }
    return "/image.svg";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoadingBtn(true);
    // Create FormData object for file + text data
    const data = new FormData();
    data.append("storename", storename);
    data.append("bio", formData.bio);
    data.append("businessName", formData.businessName);
    data.append("address", formData.address);
    data.append("mobileNo", formData.mobileNo);
    data.append("category", selectedType);
    if (logo) {
      data.append("logo", logo); // append logo file
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/businessdetails`, {
      method: "POST",
      body: data, // no headers for FormData
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success("Store created successfully");
      navigate(`/congratulation?storename=${storename}`);
    } else {
      toast.error(responseData.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred");
  } finally {
    setLoadingBtn(false);
  }
};


  return (
    <div className="flex lg:items-center justify-center h-full bg-white mt-10">
      <div data-theme="light" className="bg-white px-5 py-8 mt-4 lg:mt-0 rounded-lg w-full max-w-xl">
        <h2 className="text-4xl font-bold text-black text-center mb-8">Store Details</h2>
        <form onSubmit={handleSubmit}>

          {/* Business Name Field */}
          <div className="mb-4">
            <label className='font-semibold tracking-tight text-zinc-800 text-lg' htmlFor="logo">Logo:</label>
            <div className="w-32 cursor-pointer">
              <input onChange={e => setLogo(e.target.files[0])} type="file" id="logo" name="logo" accept="image/*" hidden />
              <label htmlFor="logo">
                <div className="border border-gray-300 rounded-xl flex justify-center items-center mb-2">
                  <img src={getImageUrl(logo)} alt="Upload images" className="w-28 p-2" />
                </div>
              </label>
            </div>

            <label className='font-semibold tracking-tight text-zinc-800' htmlFor="bio">Bio:</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Describe your business in a few words"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="businessName" className="block text-sm font-semibold text-gray-900">
              Business Name:
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your business name"
              required
            />
          </div>

          {/* Category Dropdown */}
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Product Type</h2>

          <div className="space-y-3 mb-5">
            {productTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all
              ${selectedType === type.id
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/40"
                  }`}
              >
                <div className="mt-1">{type.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900">{type.title}</p>
                  <p className="text-green-600 text-sm">{type.subtitle}</p>
                  <p className="text-gray-500 text-xs">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-900">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div className="mb-4">
            <label htmlFor="mobileNo" className="block text-sm font-semibold text-gray-900">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Next Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-lg font-bold text-white py-4 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loadingBtn ? <span className="loading loading-spinner loading-md"></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;
