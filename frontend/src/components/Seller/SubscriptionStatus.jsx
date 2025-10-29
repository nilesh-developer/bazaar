import React, { useEffect, useState } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SubscriptionStatus() {
  const token = localStorage.getItem("token");
  const { userData, isLoading, userAuthentication, currentPlan } = useAuth();
  const navigate = useNavigate();
  const [extraMonths, setExtraMonths] = useState(3);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentIsProcessing, setPaymentIsProcessing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  console.log(currentPlan);

  //razorpay start
  const handlePayment = async () => {
    const plan = {
      name: selectedPlan,
      duration: billingCycle === "monthly" ? 1 : Number(12 + Number(extraMonths)),
      amount: selectedPlan === "go"
        ? (billingCycle === "monthly" ? 149 : 1490)
        : (billingCycle === "monthly" ? 299 : 2990)
    }
    try {
      setPaymentIsProcessing(true)
      // 1. Call backend to create order
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription/create-order-razorpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken: token, plan: plan }),
      });

      const { order, userData, message } = await res.json();

      if (!res.ok) {
        toast.error(message)
        return
      }

      // 2. Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Growo",
        description: "Subscription Transaction",
        order_id: order.id,
        handler: async function (response) {
          // alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
          //Verify payment on backend
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription/verify-razorpay-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: userData._id,
              amount: order.amount,
              currency: order.currency,
              plan: plan
            }),
          });
          const result = await verifyRes.json();
          if (verifyRes.ok) {
            toast.success(result.message)
            userAuthentication();
            setSelectedPlan(null);
          } else {
            toast.error(result.message)
          }
        },
        prefill: {
          email: userData.email,
        },
        theme: { color: "#00873d" },
      };

      // 3. Open Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setPaymentIsProcessing(false)
    }
  };
  //razorpay end

  if (isLoading) {
    return <div className='flex h-[calc(100vh-100px)] lg:h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
  }
  return (
    <div className="py-8">
      <div className="mx-auto">
        {/* Subscription Status Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">Subscription status</h2>
            <button onClick={async () => await userAuthentication()} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Status */}
          {userData?.subscription_plan_type === "free" ?
            <>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">No active subscription</h1>
              <p className="text-gray-600 mb-6">Activate a plan to unlock Growo premium features.</p>
            </>
            :
            <h1 className="text-2xl font-semibold text-green-800 mb-2">Active</h1>
          }

          {/* Plan Badge */}
          <div className="inline-flex items-center gap-2 mb-8 bg-gray-100 px-3 rounded-full py-1">
            <span className="text-xs font-medium text-gray-600 uppercase">PLAN</span>
            <span className="text-sm font-medium text-gray-900 capitalize">{userData?.subscription_plan_type}</span>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Products */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">PRODUCTS</h3>
              <div className="text-2xl font-semibold text-gray-900 mb-1">{userData?.store?.products?.length} / {currentPlan?.features?.upToProducts}</div>
              <div className="text-sm text-gray-600 mb-2">{Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100}% of limit</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{Number(userData?.store?.products?.length) / Number(currentPlan?.features?.upToProducts) * 100}% of limit</div>
            </div>

            {/* Active Discount Codes */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">ACTIVE DISCOUNT CODES</h3>
              <div className="text-2xl font-semibold text-gray-900 mb-1">{Number(userData?.store?.coupon?.length) + " / " + Number(currentPlan?.features?.discountCodes)}</div>
              <div className="text-sm text-gray-600">{Number(Number(userData?.store?.coupon?.length) / Number(currentPlan?.features?.discountCodes) * 100).toFixed(2)}% of limit</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${Number(Number(userData?.store?.coupon?.length) / Number(currentPlan?.features?.discountCodes) * 100)}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{Number(Number(userData?.store?.coupon?.length) / Number(currentPlan?.features?.discountCodes) * 100)}% of limit</div>
            </div>

            {/* Secure Digital Downloads */}
            {currentPlan === "free" && <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">SECURE DIGITAL DOWNLOADS</h3>
              <div className="text-xl font-semibold text-gray-900 mb-1">Not included</div>
              <div className="text-sm text-gray-600">Unlock direct file delivery with Go</div>
            </div>
            }

            {currentPlan !== "free" && <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">SECURE DIGITAL DOWNLOADS</h3>
              <div className="text-xl font-semibold text-gray-900 mb-1">{Number(userData?.store?.coupon?.length) + " / " + Number(currentPlan?.features?.discountCodes)}</div>
              <div className="text-sm text-gray-600">{Number(Number(userData?.store?.coupon?.length) / Number(currentPlan?.features?.discountCodes) * 100).toFixed(2)}% of limit</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${Number(Number(userData?.store?.coupon?.length) / Number(currentPlan?.features?.discountCodes) * 100)}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{Number(Number(userData?.store?.coupon?.length) / Number(currentPlan?.features?.discountCodes) * 100)}% of limit</div>
            </div>
            }

            {/* Custom Domain */}
            {currentPlan !== "plus" && <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">CUSTOM DOMAIN</h3>
              <div className="text-xl font-semibold text-gray-900 mb-1">Not included</div>
              <div className="text-sm text-gray-600">Plus plan unlocks branded domains</div>
            </div>
            }

            {currentPlan === "plus" && <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-medium text-gray-600 uppercase mb-3">CUSTOM DOMAIN</h3>
              <div className="text-xl font-semibold text-gray-900 mb-1">Included</div>
              <div className="text-sm text-gray-600">Add your custom domain</div>
            </div>
            }
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${billingCycle === "monthly"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:text-gray-900"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${billingCycle === "yearly"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:text-gray-900"
                }`}
            >
              Yearly (3 months free)
            </button>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Go Plan */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Go</h3>
              <p className="text-gray-600 text-sm mb-6">
                Grow with secure digital delivery and inventory tools
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {billingCycle === "monthly" ? "₹149" : "₹1,490"}
                  </span>
                  <span className="text-gray-600">
                    {billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-green-600 text-sm">(3 months free)</p>
                )}
              </div>

              {/* Features Box */}
              <div className="bg-green-50 rounded-lg p-4 mb-6 space-y-2">
                <Feature label="Products: 5 → 25" />
                <Feature label="Discount codes: 1 → 3" />
                <Feature label="Adds secure digital downloads" />
              </div>

              {/* Feature List */}
              <FeatureList
                items={[
                  "Everything in Free",
                  "Up to 15 products",
                  "Secure digital downloads (3 files, 500MB total)",
                  "Inventory tracking & low-stock alerts",
                  "Discount codes (3 active at a time)",
                  "Refund initiation from dashboard",
                ]}
                unavailable={[
                  "Upload product videos (Plus plan feature)",
                  "Custom domain (shop.brand.com)",
                ]}
              />

              {currentPlan?.name?.toLowerCase() === "free" ? <button onClick={() => setSelectedPlan("go")} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
                Unlock Go
              </button> : <button className="w-full bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors">
                Active
              </button>}
            </div>

            {/* Plus Plan */}
            <div className="bg-white rounded-lg border-2 border-green-500 p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Plus</h3>
              <p className="text-gray-600 text-sm mb-6">
                Look premium with your own domain and higher limits
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {billingCycle === "monthly" ? "₹299" : "₹2,990"}
                  </span>
                  <span className="text-gray-600">
                    {billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-green-600 text-sm">(3 months free)</p>
                )}
              </div>

              {/* Features Box */}
              <div className="bg-green-50 rounded-lg p-4 mb-6 space-y-2">
                <Feature label="Products: 5 → 50" />
                <Feature label="Discount codes: 0 → 25" />
                <Feature label="Adds secure digital downloads" />
              </div>

              {/* Feature List */}
              <FeatureList
                items={[
                  "Everything in Go",
                  "Up to 50 products",
                  "Custom domain with SSL",
                  "Secure digital downloads (5 files, 1GB total)",
                  "Upload product videos (MP4, MOV, AVI)",
                  "Run 25 active discount codes at once",
                  "Improve your advertising with Meta Pixel event capture (view, cart, checkout, purchase)",
                ]}
              />

              <button onClick={() => setSelectedPlan("plus")} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
                Upgrade to Plus
              </button>
            </div>
          </div>
          {/* Confirm Modal */}
          {selectedPlan && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
              <div className="bg-white rounded-lg shadow-xl w-[450px] max-w-full p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Confirm plan change
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  We will apply the update and open Razorpay if a payment is required.
                </p>

                <div className="border rounded-md p-3 mb-4 bg-gray-50">
                  <div className="font-medium text-gray-900 capitalize">{selectedPlan}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {billingCycle === "monthly"
                      ? `₹${selectedPlan === "go" ? "149" : "299"} billed monthly`
                      : `₹${selectedPlan === "go" ? "1,490" : "2,990"} billed yearly`}
                    {" · "}
                    Current plan: {userData?.subscription_plan_type}
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-6">
                  • No additional payment is required for this change.
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                  >
                    {paymentIsProcessing ? "Processing..." : "Confirm & Continue"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Helper Components */
function Feature({ label }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span>{label}</span>
    </div>
  );
}

function FeatureList({ items, unavailable = [] }) {
  return (
    <div className="space-y-3 mb-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </div>
      ))}
      {unavailable.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-2 text-sm text-gray-400"
        >
          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}