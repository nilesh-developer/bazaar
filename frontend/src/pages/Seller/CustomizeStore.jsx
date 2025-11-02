import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';
import { HexColorPicker } from 'react-colorful';
import { SketchPicker } from 'react-color';

function CustomizeStore() {
  const [store, setStore] = useState({});
  const [storeId, setStoreId] = useState("");
  const [updateData, setUpdateData] = useState({
    name: "",
    metaTitle: "",
    metaDescription: "",
    color1: "#ffffff",
    color2: "#000000",
  });
  const [showPicker1, setShowPicker1] = useState(false)
  const [showPicker2, setShowPicker2] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const { token } = useAuth();

  const getStoreData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setStoreId(responseData.data.store._id);
        setStore(responseData.data.store);
        setUpdateData({
          name: responseData.data.store.name,
          metaTitle: responseData.data.store.metaTitle,
          metaDescription: responseData.data.store.metaDescription,
          color1: responseData.data.store.themeColorOne,
          color2: responseData.data.store.themeColorTwo,
        });
        setSelectedTemplate(responseData.data.store.template);
        setIsChecked(responseData.data.store.hideCategory);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStoreData();
  }, []);

  if (loading) {
    return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/update/basic/${storeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updateData,
          hideCategory: isChecked,
          template: selectedTemplate
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
  };

  return (
    <div className='w-full h-screen'>
      <div className='lg:my-7 lg:mx-10 my-3 mx-3'>
        <h2 className='text-2xl lg:text-3xl text-zinc-900 font-bold tracking-tighter'>Customize Store</h2>
        <div className='mt-7'>
          <form onSubmit={handleSubmit} className='grid grid-flow-row'>
            <label className='font-semibold tracking-tight text-zinc-800 lg:text-lg' htmlFor="name">Store Name <span className='text-red-700'>*</span></label>
            <input
              type="text"
              name='name'
              id="name"
              onChange={handleInput}
              value={updateData.name}
              placeholder="Store Name"
              className="border outline-none rounded-lg px-3 py-3 text-black bg-transparent w-full max-w-xs"
              required
            />
            <label className='font-semibold tracking-tight text-zinc-800 lg:text-lg mt-3' htmlFor="name">Store Handle</label>
            <input
              type="text"
              value={store?.storename}
              className="border outline-none rounded-lg px-3 py-3 text-gray-800 bg-gray-200 w-full max-w-xs"
              readOnly
            />
            <p className='text-sm text-gray-700'>Your store will be available at {store?.subdomain}</p>
            <p className='text-sm text-gray-700'>Store handle is fixed after creation. Contact support if you need an exception.</p>
            <label className='font-semibold tracking-tight text-zinc-800 lg:text-lg mt-7' htmlFor="storeTitle">Color palette</label>
            <div className='flex space-x-3 w-full'>
              {/* <input
                className='p-1 h-10 w-14 block bg-gray-100 border cursor-pointer rounded-lg'
                onChange={handleInput}
                value={updateData.color1}
                type="color"
                name="color1"
                id="color1"
              />
              <input
                className='p-1 h-10 w-14 block bg-gray-100 border cursor-pointer rounded-lg'
                onChange={handleInput}
                value={updateData.color2}
                type="color"
                name="color2"
                id="color2"
              /> */}

              {/* <HexColorPicker
                color={updateData.color1}
                onChange={(color) =>
                  setUpdateData({
                    ...updateData,
                    color1: color, // Corrected key assignment
                  })
                }
              /> */}
              {/* <SketchPicker
                color={updateData.color1}
                onChangeComplete={(newColor) => setUpdateData({
                  ...updateData,
                  color1: newColor.hex,
                })}
              /> */}

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {/* Color Preview Circle */}
                <div
                  onClick={() => setShowPicker1(!showPicker1)}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: updateData.color1,
                    cursor: "pointer",
                    border: "2px solid #333",
                    display: "inline-block",
                  }}
                ></div>

                {/* Color Picker */}
                {showPicker1 && (
                  <div style={{ position: "absolute", marginTop: "10px" }}>
                    <SketchPicker
                      color={updateData.color1}
                      onChangeComplete={(newColor) => {
                        setUpdateData({
                          ...updateData,
                          color1: newColor.hex,
                        })
                        setShowPicker1(false); // Hide picker after selecting
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {/* Color Preview Circle */}
                <div
                  onClick={() => setShowPicker2(!showPicker2)}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: updateData.color2,
                    cursor: "pointer",
                    border: "2px solid #333",
                    display: "inline-block",
                  }}
                ></div>

                {/* Color Picker */}
                {showPicker2 && (
                  <div style={{ position: "absolute", marginTop: "10px" }}>
                    <SketchPicker
                      color={updateData.color2}
                      onChangeComplete={(newColor) => {
                        setUpdateData({
                          ...updateData,
                          color2: newColor.hex,
                        })
                        setShowPicker2(false); // Hide picker after selecting
                      }}
                    />
                  </div>
                )}
              </div>

            </div>

            <div>
              <h3 className="text-gray-800 font-semibold mb-3 mt-6">Template</h3>
              <div className="grid grid-cols-2 gap-4 lg:max-w-lg">
                {/* Theme1 */}
                <div
                  onClick={() => setSelectedTemplate("theme1")}
                  className={`border rounded-xl p-4 text-left transition ${selectedTemplate === "theme1"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800 text-sm">Instagram Special</span>
                  </div>
                  <div>
                    <img className='h-full' src="/Theme1.jpg" alt="Theme1" />
                  </div>
                </div>

                {/* Theme2 */}
                <div
                  onClick={() => setSelectedTemplate("theme2")}
                  className={`border rounded-xl p-4 text-left transition ${selectedTemplate === "theme2"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800 text-sm">Professional Special</span>
                  </div>
                  {/* <p className="text-xs text-gray-500">Files customers download</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    PDFs, templates, courses, music
                  </p> */}
                  <div>
                    <img className='h-full' src="/Theme2.jpg" alt="Theme2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-control mt-6 w-48">
              <label className="label cursor-pointer gap-2">
                <span className="label-text text-lg tracking-tight text-black font-semibold">Hide Categories</span>
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={isChecked}
                  className="checkbox border border-gray-700"
                />
              </label>
            </div>

            <div className='mt-7 grid grid-flow-row'>
              <h2 className='text-2xl lg:text-3xl text-zinc-900 font-bold tracking-tighter my-4'>Your store metadata</h2>
              <label className='font-semibold tracking-tight text-zinc-800 lg:text-lg' htmlFor="name">Meta title</label>
              <input
                type="text"
                name='metaTitle'
                id="metaTitle"
                onChange={handleInput}
                value={updateData.metaTitle}
                placeholder="Type store meta title"
                className="border outline-none rounded-lg px-3 py-3 text-black bg-transparent w-full max-w-xs"
                required
              />

              <label className='font-semibold tracking-tight text-zinc-800 lg:text-lg mt-4' htmlFor="name">Meta description</label>
              <textarea
                name='metaDescription'
                id="metaDescription"
                onChange={handleInput}
                value={updateData.metaDescription}
                placeholder="Give store meta description"
                className="border outline-none h-[150px] rounded-lg px-3 py-3 text-black bg-transparent w-full max-w-xs"
              />
            </div>

            <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 lg:text-lg mt-6 mb-20 w-28">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomizeStore;
