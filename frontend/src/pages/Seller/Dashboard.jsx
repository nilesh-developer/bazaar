import React, { useEffect, useState } from 'react';
import Quicktable from '../../components/Seller/Quicktable';
import { Link, useNavigate } from 'react-router-dom';
import useStoreData from '../../Hooks/useStoreData';
import isTokenExpired from '../../Hooks/verifyJwtToken';
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';
import { DollarSign, ShoppingBag, Users, Package, IndianRupee } from "lucide-react";
import SellerSetupChecklist from '../../components/Seller/SellerSetupChecklist';

function Dashboard() {

  const { user, loading } = useStoreData();
  const { setToken, currentPlan } = useAuth();
  const [noOfOrders, setNoOfOrders] = useState(0);
  const [revenueBasedDays, setRevenueBasedOnDays] = useState(0)
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(true)
  const analyticsDays = currentPlan?.features?.analyticsDays || 30;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setToken(localStorage.getItem('token'));
      }
    } else {
      navigate('/login');
    }
  }, []);

  // const getNumbersOfThirtyDays = async () => {
  //   try {
  //     setLoadingData(true)
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/get-numbers-of-thirty-days/${user?.store?._id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     if (response.ok) {
  //       const data = await response.json();
  //       setNoOfOrders(data.data.noOfOrders)
  //       setRevenueOfLastThirtyDays(data.data.totalRevenueOfLastThirtyDays)
  //     } else {
  //       toast.error("Something went wrong")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoadingData(false)
  //   }
  // }

  const getDataDqayWise = async () => {
    try {
      setLoadingData(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/get-day-wise?storeId=${user?.store?._id}&days=${currentPlan?.features?.analyticsDays}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        const data = await response.json();
        setNoOfOrders(data.data.noOfOrders)
        setRevenueBasedOnDays(data.data.totalRevenueBasedOnDays)
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (user?.store?._id) {
      getDataDqayWise()
    }
  }, [user])

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${revenueBasedDays}`,
      subtitle: `Last ${analyticsDays} days`,
      icon: <IndianRupee className="text-emerald-600" size={28} />,
    },
    {
      title: "Total Orders",
      value: noOfOrders,
      subtitle: `Last ${analyticsDays} days`,
      icon: <ShoppingBag className="text-blue-600" size={28} />,
    },
    {
      title: "Total Customers",
      value: user?.store?.customers?.length || 0,
      subtitle: "All time",
      icon: <Users className="text-purple-600" size={28} />,
    },
    {
      title: "Total Products",
      value: user?.store?.products?.length || 0,
      subtitle: "All time",
      icon: <Package className="text-orange-500" size={28} />,
    },
  ];


  if (loading || loadingData) {
    return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <>
      <section className='bg-white flex-grow h-full pb-14 lg:pb-8'>
        <div className='lg:my-10 my-5 lg:mx-4 mx-3'>
          <h2 className='lg:text-3xl text-2xl text-zinc-900 font-extrabold tracking-tight'>Dashboard</h2>
          {/* alert to verify email */}
          {!user?.isVerified &&
            <div data-theme="light" role="alert" className="alert mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Your email verification is pending. Verify to open your own store</span>
              <div>
                <button className="btn btn-sm btn-primary">Verify</button>
              </div>
            </div>
          }          {/* alert to verify subscription payment */}

          {!user?.subcription &&
            <div data-theme="light" role="alert" className="alert mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Your subscription payment verification is under review. It will take 1 to 4 hours to be verified.</span>
              <Link to={"/seller/subscriptions"}>
                <button className="bg-blue-600 text-white px-2 py-1 rounded font-semibold">View Status</button>
              </Link>
            </div>
          }
          <div className="grid grid-cols-2 mt-4 lg:mt-7 gap-5 lg:grid-cols-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-center">
                  <h3 className="lg:text-lg text-base font-semibold tracking-tight text-gray-800">
                    {card.title}
                  </h3>
                  <div className="bg-gray-50 p-2 rounded-lg">{card.icon}</div>
                </div>
                <p className="text-sm text-gray-500 mt-1 tracking-tight">
                  {card.subtitle}
                </p>
                <h2 className="text-2xl lg:text-4xl font-extrabold mt-4 text-gray-900 overflow-hidden">
                  {card.value}
                </h2>
              </div>
            ))}
          </div>

          {/* <SellerSetupChecklist /> */}

          {/* <div className='grid grid-rows-2 grid-cols-none lg:grid-rows-none lg:grid-cols-2 gap-5 mt-8'> */}
          <div className='mt-8 gap-4 lg:flex'>
            <div className='bg-white  border-gray-200 border lg:w-full h-fit p-5 rounded-xl'>
              <h2 className='lg:text-3xl text-xl font-bold tracking-tighter'>Store</h2>
              {user?.store?.logo ? <div className='flex flex-wrap justify-center mt-5'>
                <img className='h-20' src={user?.store?.logo} alt="store logo" />
              </div> : ""
              }
              <h2 className='text-center text-xl font-bold tracking-tighter'>{user?.store?.name}</h2>
              <p className='text-center'>{user?.store?.products?.length} Products</p>
              <Link to="../edit-store">
                <h2 className='text-center mt-7 font-bold bg-transparent py-4 rounded-xl hover:bg-emerald-100'>
                  Edit Store
                </h2>
              </Link>
              <a href={`https://${user?.store?.subdomain}`}>
                <h2 className='text-center mt-2 text-bold bg-emerald-600 py-4 rounded-xl font-bold text-white hover:bg-emerald-500'>
                  View Store
                </h2>
              </a>
            </div>
            <div className='bg-white  border-gray-200 border w-full h-90 mt-4 lg:mt-0 p-5 rounded-xl'>
              <h2 className='text-xl lg:text-3xl font-bold mb-3 tracking-tighter'>Recent Orders</h2>
              {user?.store?.orders?.length === 0 ?
                <div className='w-full h-full flex justify-center'>
                  <div className='mt-5 lg:mt-10'>
                    <img className='h-20 w-20 ml-2' src="/order.png" alt="" />
                    <p className='font-bold'>No orders yet</p>
                  </div>
                </div>
                :
                <Quicktable />
              }
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Dashboard