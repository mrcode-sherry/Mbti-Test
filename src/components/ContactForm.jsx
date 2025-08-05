'use client';

import React from 'react';
import Image from 'next/image';
import PageBanner from './PageBanner';

const ContactForm = () => {
  return (
    <>
    <PageBanner title="Contact Us" backgroundImage="/Banners/about-banner.jpg" />
    <section className="py-16 px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">

        {/* Left Side: Form */}
        <div className="flex-1">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Contact Us</h3>
          <h2 className="text-3xl font-bold text-[#14442E] mb-6">
            We're Here To Provide <span className="underline text-[#14442E]">24X7 Support</span>
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First & Last Name */}
            <input
              type="text"
              placeholder="First Name*"
              className="border-b border-gray-300 p-2 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Last Name*"
              className="border-b border-gray-300 p-2 focus:outline-none"
              required
            />

            {/* Email & Phone */}
            <input
              type="email"
              placeholder="Your Email*"
              className="border-b border-gray-300 p-2 focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number*"
              className="border-b border-gray-300 p-2 focus:outline-none"
              required
            />

            {/* Subject */}
            <select className="border-b border-gray-300 p-2 focus:outline-none md:col-span-1">
              <option>How we can help you?</option>
              <option>Test Issues</option>
              <option>Payment Issue</option>
              <option>General Inquiry</option>
            </select>

            {/* Marital Status */}
            <select className="border-b border-gray-300 p-2 focus:outline-none md:col-span-1">
              <option>Select Marital Status</option>
              <option>Single</option>
              <option>Married</option>
            </select>

            {/* Message Box */}
            <textarea
              placeholder="Tell us about you"
              className="border-b border-gray-300 p-2 focus:outline-none md:col-span-2"
              rows="4"
            />

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#14442E] cursor-pointer hover:shadow-lg duration-500 hover:scale-105 text-white py-2 px-6 rounded w-fit md:col-span-2 hover:bg-[#0c2f1e] transition"
            >
              Submit A Query
            </button>
          </form>
        </div>

        {/* Right Side: Contact Support Box */}
        <div className="bg-[#14442E] text-white p-6 rounded-lg flex-1 max-w-md">
          <h3 className="text-xl font-semibold mb-3">Say Hello!</h3>
          <p className="text-sm text-gray-200 mb-6">
            Aliquam lectus urna, tempus ac lectus et, gravida bibendum nisl. Nulla consequat
            ham ultricies metus et purus laoreet aliquam.
          </p>

          <Image
            src="/contact/support-image.jpg" // Replace with your image
            alt="Support Agent"
            width={400}
            height={300}
            className="rounded-md mb-4"
          />

          <div>
            <p className="text-sm font-medium">24/7 Contact Support</p>
            <p className="text-sm text-gray-300">info@example.com</p>
          </div>
        </div>

      </div>
    </section>
    </>
  );
};

export default ContactForm;
