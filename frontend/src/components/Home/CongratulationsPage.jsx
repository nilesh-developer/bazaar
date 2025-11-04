import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

// /Congratulations?storename="demo"
// Dynamic congratulations page that reads storeName from query string and builds storeUrl automatically.

export default function CongratulationsPage() {
  const [searchParams] = useSearchParams();
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    const name = searchParams.get("storename") || "yourstore";
    setStoreName(name);
  }, [searchParams]);

  const storeUrl = `https://${storeName}.${import.meta.env.VITE_HOSTNAME}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-emerald-700 p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="w-24 h-24 flex items-center justify-center rounded-full bg-emerald-700 text-white mb-6 shadow-lg"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        >
          <path d="M20 6L9 17l-5-5" />
        </motion.svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold mb-3 text-center"
      >
        Congratulations! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-center text-emerald-800 max-w-md"
      >
        Your store <span className="font-semibold capitalize">{storeName}</span> is live and ready to share.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex flex-col w-full lg:w-auto sm:flex-row gap-4"
      >
        <a
          href={storeUrl}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 text-center rounded-lg bg-emerald-700 text-white font-medium shadow hover:bg-emerald-800 transition"
        >
          Visit Store
        </a>
        <a
          href="/seller/dashboard"
          className="px-6 py-3 text-center rounded-lg border border-emerald-700 text-emerald-700 font-medium hover:bg-emerald-50 transition"
        >
          Go to Dashboard
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-sm text-center text-emerald-600"
      >
        Share your store link: <a href={storeUrl} className="underline">{storeUrl}</a>
      </motion.div>
    </div>
  );
}