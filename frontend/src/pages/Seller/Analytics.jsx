import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  RefreshCcw,
  Download,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";
import useStoreData from "../../Hooks/useStoreData";

export default function AnalyticsDashboard() {
  const { user } = useStoreData();
  const { setToken, currentPlan } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [range, setRange] = useState("7");
  const [loading, setLoading] = useState(false);
  const [mockData, setMockData] = useState({})

  const fetchAnalytics = async (days) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/event/analytics/${user?.store?._id}?days=${days}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data)
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (user?.store?._id) {
      fetchAnalytics(range);
    }
  }, [user, range]);

  const exportData = (type) => {
    if (!analytics) return;
    const dataStr =
      type === "json"
        ? JSON.stringify(analytics, null, 2)
        : convertToCSV(analytics);
    const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `growo_analytics_${range}days.${type}`;
    link.click();
  };

  const convertToCSV = (obj) => {
    const trafficCSV = obj.traffic.map(
      (t) => `${t.name},${t.visits},${t.sales}`
    );
    return `Day,Visits,Sales\n${trafficCSV.join("\n")}`;
  };

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 lg:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => exportData("csv")}
            className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={() => exportData("json")}
            className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Download size={16} /> Export JSON
          </button>
          <button
            onClick={() => fetchAnalytics(range)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700"
          >
            <RefreshCcw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* RANGE FILTER */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["7", "30", "90", "365"].map((d) => (
          <button
            key={d}
            onClick={() => {
              if (Number(currentPlan?.features?.analyticsDays) >= Number(d)) {
                setRange(d)
              } else {
                if(Number(d) === 30){
                  toast.error("This feature is available in Go Plan")
                } else if(Number(d) === 90){
                  toast.error("This feature is available in Plus Plan")
                } else if(Number(d) === 365){
                  toast.error("This feature is available in Max Plan")
                } else {
                  toast.error("Limit is reached")
                }
              }
            }}
            className={`px-4 py-2 text-sm rounded-full border ${range === d
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
          >
            Last {d} Days
          </button>
        ))}
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          icon={<Users />}
          title="Visitors"
          value={analytics.summary.visits.toLocaleString()}
          trend="+8%"
        />
        <SummaryCard
          icon={<ShoppingBag />}
          title="Orders"
          value={analytics.summary.orders.toLocaleString()}
          trend="+12%"
        />
        <SummaryCard
          icon={<IndianRupee />}
          title="Revenue"
          value={`₹${analytics.summary.revenue.toLocaleString()}`}
          trend="+6%"
        />
        <SummaryCard
          icon={<TrendingUp />}
          title="Conversion"
          value={`${analytics.summary.conversion}%`}
          trend="+2%"
        />
      </div>

      {/* CONVERSION FUNNEL */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Conversion Funnel
        </h3>

        <div className="grid md:grid-cols-5 gap-4 text-center">
          {[
            { title: "Visitors", value: analytics.funnel.visits, percent: "100.0%", drop: "100.0% drop-off⚠️" },
            { title: "Product Views", value: analytics.funnel.productViews, percent: "0.0%", drop: "0.0% drop-off" },
            { title: "Added to Cart", value: analytics.funnel.addToCart, percent: "0.0%", drop: "0.0% drop-off" },
            { title: "Checkout", value: analytics.funnel.checkout, percent: "0.0%", drop: "0.0% drop-off" },
            { title: "Completed Orders", value: analytics.funnel.completedOrders, percent: "0.0%", drop: "0.0% drop-off" },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-emerald-50 rounded-lg border border-emerald-100 p-4"
            >
              <h4 className="font-medium text-gray-800">{step.title}</h4>
              <p className="text-2xl font-semibold text-emerald-700 mt-1">
                {step.value}
              </p>
              {/* <p className="text-gray-600 text-sm">{step.percent}</p>
              <p className="text-gray-500 text-xs mt-1">{step.drop}</p> */}
            </div>
          ))}
        </div>
      </div>

      {/* TRAFFIC CHART + SALES PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* TRAFFIC CHART */}
        <div className="bg-white p-3 lg:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg p-3 lg:p-0 font-semibold text-gray-800 mb-4">
            Traffic & Sales
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.traffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* SALES PERFORMANCE */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Total Orders</p>
              <p className="font-semibold text-gray-800">
                {analytics.summary.orders}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Total Revenue</p>
              <p className="font-semibold text-emerald-700">
                ₹{analytics.summary.revenue.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Average Conversion Rate</p>
              <p className="font-semibold text-blue-700">
                {analytics.summary.conversion}%
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Top Performing Day</p>
              <p className="font-semibold text-gray-800">
                {analytics.traffic.reduce((prev, curr) =>
                  curr.sales > prev.sales ? curr : prev
                ).name || "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500 border-t pt-3">
            Compared to previous period:{" "}
            <span className="text-emerald-600 font-medium">+6.5%</span>
          </div>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Top Products
        </h3>
        {analytics.products?.length !== 0 ?
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b text-gray-600 text-sm">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Views</th>
                  <th className="pb-2">Sales</th>
                  <th className="pb-2">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {analytics.products.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 font-medium text-gray-800">{p.name}</td>
                    <td className="py-3 text-gray-700">{p.views}</td>
                    <td className="py-3 text-gray-700">{p.sales}</td>
                    <td className="py-3 text-gray-700">
                      {p.views > 0
                        ? ((p.sales / p.views) * 100).toFixed(1) + "%"
                        : "0.0%"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :
          <div>
            <p className="flex items-center justify-center gap-2 text-gray-600"><AlertCircle />Lack of data</p>
          </div>
        }
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-400 text-sm mt-10">
        © {new Date().getFullYear()} Growo. All rights reserved.
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value, trend }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-semibold text-gray-900 mt-1">{value}</h3>
        <p className="text-xs text-emerald-600 font-medium">{trend}</p>
      </div>
      <div className="text-emerald-600">{icon}</div>
    </div>
  );
}
