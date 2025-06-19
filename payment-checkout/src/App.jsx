import { useState, useEffect } from 'react'
import './App.css'
import { load } from '@cashfreepayments/cashfree-js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

function App() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("sessionid")
  const orderId = searchParams.get("orderid")
  const subdomain = searchParams.get("storename")

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyPayment = async (id, subdomain) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: id
        })
      })

      if (response.ok) {
        const responseData = await response.json()
        toast.success(responseData?.message)
        window.location.replace(`https://${subdomain}/payment-response?order_id=${id}`)
      } else {
        const responseData = await response.json()
        toast.error(responseData?.message)
        window.location.replace(`https://${subdomain}/payment-response?order_id=${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const processPayment = async () => {
    try {
      setLoading(true);

      if (!sessionId || !orderId) {
        throw new Error("Session ID or Order ID is missing");
      }
      const cashfree = await load({ mode: "production" }); // or "sandbox"

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      }; // _self

      await cashfree.checkout(checkoutOptions)
        .then(async (res) => {
          await verifyPayment(orderId, subdomain); // now using correct orderId
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId && orderId) {
      processPayment()
    } else {
      const referrer = document.referrer;
      if (referrer.includes("eazzy.site")) {
        window.location.replace(`${import.meta.env.VITE_DOMAIN_NAME}/payment-response?order_id=${orderId}`)
      }
      console.error("Session ID or Order ID is missing");
    }
    window.scrollTo(0, 0);
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="mt-2">Redirecting to the payment page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <p className="mt-2">Redirecting to the payment page</p>
      </div>
    </div>
  )
}

export default App
