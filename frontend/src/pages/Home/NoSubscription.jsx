import React from "react";

export default function NoSubscription() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 rounded-full p-4">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Subscription Expired
        </h1>
        <p className="text-gray-600 mb-6">
          Your current subscription has expired. To continue enjoying our
          services, please renew your subscription.
        </p>

        <a
          href="mailto:growostore@gmail.com"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition duration-300"
        >
          Email to Subscribe
        </a>

        <p className="text-sm text-gray-400 mt-6">
          Need help? Contact us at{" "}
          <a
            href="mailto:growostore@gmail.com"
            className="text-indigo-500 hover:underline"
          >
            growostore@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
