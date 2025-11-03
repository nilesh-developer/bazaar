import React from "react";
import { Link, useOutletContext } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin } from "lucide-react"
import { useEffect } from "react";
import dateFormat from "dateformat";

const ContactUs = () => {
  const { store } = useOutletContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-3 lg:py-6 bg-white rounded-lg lg:mt-10 mb-20 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-black">
        Contact Us
      </h1>
      <p className="text-sm text-gray-500 text-center mb-8">
        Last updated: {dateFormat(store?.policy?.lastUpdated, "dd mmmm yyyy")}
      </p>

      <section className="space-y-6">
        {/* Introduction */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            We're here to help!
          </h2>
          <p>
            Reach out to us through any of the following channels. Our team will
            be happy to assist you with inquiries, orders, or support requests.
          </p>
        </div>

        {/* Business Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Business Information
          </h2>
          <p className="text-lg font-medium">{store?.name}</p>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Contact Details
          </h2>

          <div className="mt-3">
            <h3 className="flex items-center gap-2 font-medium text-gray-800 mb-1"><Mail className="h-5 text-emerald-900" />Email</h3>
            <ul className="list-disc list-inside space-y-1 ml-1">
              {/* <li>
                <strong>General Inquiries:</strong>{" "}
                <a href={`mailto:${store?.policy?.contactEmail}`} className="text-emerald-600 underline">{store?.policy?.contactEmail}</a>
              </li>
              <li>
                <strong>Support:</strong>{" "}
                <a href={`mailto:${store?.policy?.contactEmail}`} className="text-emerald-600 underline">{store?.policy?.contactEmail}</a>
              </li>
              <li>
                <strong>Order Related:</strong>{" "}
                <a href={`mailto:${store?.policy?.contactEmail}`} className="text-emerald-600 underline">{store?.policy?.contactEmail}</a>
              </li> */}
              <li>
                <strong>Customer Support:</strong>{" "}
                {store?.policy?.contactEmail ? <a href={`mailto:${store?.policy?.contactEmail}`} className="text-emerald-600 underline">{store?.policy?.contactEmail}</a>
                  :
                  <a href={`mailto:${store?.email}`} className="text-emerald-600 underline">{store?.email}</a>
                }
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="flex items-center gap-2 font-medium text-gray-800 mb-1"><Phone className="h-5 text-emerald-900" /> Phone</h3>
            <p className="ml-2 font-semibold">Customer Support: <span className="font-medium">{store?.policy?.contactPhone ? store?.policy?.contactPhone : "Contact number will be updated soon"}</span></p>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-2">
            <Clock className="h-5 text-emerald-900" /> Business Hours
          </h2>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>{store?.policy?.businessHours}</li>
            <li>Response Time: 24-48 hours</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-2">
            <MapPin className="h-5 text-emerald-900" /> Registered Address
          </h2>
          {store?.policy?.streetAddress &&
            store?.policy?.city &&
            store?.policy?.state &&
            store?.policy?.pinCode
            ?
            <p className="mx-3">
              {store?.policy?.streetAddress}<br />
              {store?.policy?.city}<br />
              {store?.policy?.state}, 
              {store?.policy?.pinCode}<br />
              India
            </p>
            :
            <p className="text-gray-600 mt-1 italic">
              Address details will be updated soon.
            </p>
          }
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
