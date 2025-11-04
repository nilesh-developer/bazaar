import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";

function Createstore() {
  const [name, setName] = useState("");
  const [storename, setStorename] = useState("");
  const [storeAvailable, setStoreAvailable] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  const domain = window.location.hostname;
  const token = localStorage.getItem("token")

  const handleStore = (e) => {
    setName(e.target.value);
  };

  const handleInput = (e) => {
    setStorename(e.target.value.replace(/\s+/g, "").toLowerCase());
    setStoreAvailable(null);
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json();
        setUserData(data.data)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.log("Error while fetching user data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      userAuthentication()
    }
  }, [token])

  useEffect(() => {
    if (userData?._id && userData.store) {
      navigate("/seller/dashboard");
    }
  }, [userData]);

  // ✅ API to check store name availability
  const check = async () => {
    if (!storename) return;
    setIsChecking(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/check-storename`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storename }),
        }
      );

      const responseData = await response.json();
      setStoreAvailable(responseData.data);
    } catch (error) {
      console.error(error);
      toast.error("Error checking availability");
    } finally {
      setIsChecking(false);
    }
  };

  // ✅ Create store handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeAvailable) return toast.error("Please choose an available name");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/store/create-store`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storename,
            owner: userData._id,
            name,
            subdomain: `${storename}.${domain}`,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        navigate(`/business-details/${storename}`);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ✅ Loading state when user data or auth is still loading
  if (isLoading) {
    return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <>
      <div className="flex flex-wrap justify-center items-center h-auto py-10 lg:py-3">
        <div className="lg:w-[700px] w-96 mx-3 lg:mx-auto bg-white py-16 rounded-2xl shadow-none">
          <div className="grid place-items-center lg:mt-2 sm:mt-10">
            <img
              className="sm:w-96 lg:w-[700] h-auto"
              src="/explore.png"
              alt="image2"
            />
          </div>
          <h1 className="text-xl lg:text-4xl mt-8 text-black font-bold flex flex-wrap justify-center">
            Let's start creating your Store
          </h1>
          <p className="text-gray-400 mb-6 text-center mt-2 lg:text-base text-sm">
            Add name and link to your store
          </p>

          <form onSubmit={handleSubmit}>
            {/* Business Name */}
            <div className="form-input mt-5 mb-6">
              <label className="font-bold" htmlFor="storename">
                Enter your store name
              </label>
              <br />
              <input
                onChange={handleStore}
                value={name}
                className="w-full bg-gray-50 text-xl rounded-md px-4 py-4"
                type="text"
                name="name"
                id="name"
                placeholder="Your business name"
              />
            </div>

            {/* Store Link + Check Button */}
            <div className="form-input mt-5 mb-6">
              <label className="font-bold" htmlFor="storename">
                Set your Store link
              </label>
              <br />
              <div className="flex items-center gap-2 relative">
                <input
                  onChange={handleInput}
                  value={storename}
                  className="w-full bg-gray-50 text-xl rounded-md px-4 py-4 pr-24"
                  type="text"
                  name="storename"
                  id="storename"
                  placeholder="yourstore"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={check}
                    disabled={isChecking || !storename}
                    className={`${isChecking
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                      } text-white px-4 py-2 rounded-md font-semibold text-sm transition`}
                  >
                    {isChecking ? "Checking..." : "Check"}
                  </button>
                </div>
              </div>

              {/* Availability Message */}
              {storeAvailable !== null && (
                <p
                  className={`mt-2 font-semibold ${storeAvailable ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {storeAvailable
                    ? "✅ Store name is available"
                    : "❌ Store name already taken"}
                </p>
              )}

              <p className="text-gray-500 mt-1">
                Store link looks like{" "}
                <span className="text-gray-700 font-semibold">
                  {storename ? storename : "storename"}.
                  {import.meta.env.VITE_HOSTNAME}
                </span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!storeAvailable}
              className={`w-full text-xl font-bold py-4 px-4 rounded-md transition duration-200 ${storeAvailable
                ? "bg-black text-white hover:bg-zinc-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createstore;
