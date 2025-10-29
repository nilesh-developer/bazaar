import React from "react";
import { CheckCircle, Globe, FileText, CreditCard, Truck, Package, Settings, LayoutDashboard } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Name your store",
    icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    url: "/seller/customize-store",
    completed: true,
  },
  {
    id: 2,
    title: "Add your first category",
    icon: <LayoutDashboard className="w-5 h-5 text-emerald-600" />,
    url: "/seller/add-category",
    completed: true,
  },
  {
    id: 3,
    title: "Add your first product",
    icon: <Package className="w-5 h-5 text-emerald-600" />,
    url: "/seller/add-product",
    completed: true,
  },
  {
    id: 4,
    title: "Customize your online store",
    icon: <Settings className="w-5 h-5 text-emerald-600" />,
    url: "/seller/customize-banner",
    completed: true,
  },
  {
    id: 5,
    title: "Set up store policies",
    icon: <FileText className="w-5 h-5 text-gray-400" />,
    url: "/seller/store-policies",
    completed: false,
  },
  {
    id: 6,
    title: "Set up Payments",
    icon: <CreditCard className="w-5 h-5 text-gray-400" />,
    url: "/seller/payments",
    completed: false,
  },
  {
    id: 7,
    title: "Configure shipping settings",
    icon: <Truck className="w-5 h-5 text-gray-400" />,
    url: "/seller/set-delivery-charges",
    completed: false,
  },
  {
    id: 8,
    title: "Add a custom domain",
    icon: <Globe className="w-5 h-5 text-gray-400" />,
    url: "/seller/domain-settings",
    completed: false,
  },
];

export default function SellerSetupChecklist() {
  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <section className="bg-white rounded-2xl p-6 mx-auto mt-10 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Get ready to sell</h2>
          <p className="text-gray-500 text-sm">
            Use this guide to get your store up and running.
          </p>
        </div>
        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          {completedCount} / {steps.length} Completed
        </span>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition shadow-sm ${step.completed
                ? "border-emerald-200 bg-emerald-50/40"
                : "border-gray-100 bg-white"
              }`}
          >
            <div className="flex items-start gap-3">
              <div>{step.icon}</div>
              <div>
                <h3
                  className={`text-base font-semibold ${step.completed ? "text-emerald-700" : "text-gray-800"
                    }`}
                >
                  {step.title}
                </h3>
                {step.subtitle && (
                  <p className="text-sm text-gray-500">{step.subtitle}</p>
                )}
              </div>
            </div>

            <a
              href={step.url}
              className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              Open{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
