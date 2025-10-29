import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Briefcase, Download, Package } from 'lucide-react';

const BusinessDetails = () => {
  const { storename } = useParams();
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    mobileNo: ''
  });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/businessdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ storename, ...formData, category: selectedType })
      })

      const responseData = await response.json()

      if (response.ok) {
        toast.success("Store created successfully")
        navigate("/seller/dashboard")
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex lg:items-center justify-center h-screen bg-white mt-10">
      <div data-theme="light" className="bg-white px-5 py-8 mt-4 lg:mt-0 rounded-lg w-full max-w-xl">
        <h2 className="text-4xl font-bold text-black text-center mb-8">Business Details</h2>
        <form onSubmit={handleSubmit}>

          {/* Business Name Field */}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;
