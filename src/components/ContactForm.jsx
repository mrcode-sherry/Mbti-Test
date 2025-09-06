"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageBanner from "./PageBanner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "Other",
    maritalStatus: "Single",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // success/error message

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({ type: "success", message: "✅ Message sent successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "Other",
          maritalStatus: "Single",
          message: "",
        });
      } else {
        setFeedback({ type: "error", message: data.message || "Something went wrong" });
      }
    } catch (error) {
      setFeedback({ type: "error", message: "❌ Failed to send message. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBanner title="Contact Us" backgroundImage="/Banners/about-banner.jpg" />
      <section className="py-16 md:px-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Left Side: Form */}
          <div className="flex-1">
            <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-[#14442E] opacity-40" />
          <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">Contact Us</p>
          <div className="w-12 h-px bg-[#14442E] opacity-40" />
        </div>
            <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-6">
              Support that’s always within your reach
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 text-gray-800 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name*"
                className="border-b border-gray-300 p-2 focus:outline-none"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name*"
                className="border-b border-gray-300 p-2 focus:outline-none"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email*"
                className="border-b border-gray-300 p-2 focus:outline-none"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Mobile Number*"
                className="border-b border-gray-300 p-2 focus:outline-none"
                required
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="border-b border-gray-300 p-2 focus:outline-none md:col-span-1"
                required
              >
                <option value="">How we can help you?</option>
                <option value="Test Issues">Test Issues</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="border-b border-gray-300 p-2 focus:outline-none md:col-span-1"
                required
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about you"
                className="border-b border-gray-300 p-2 focus:outline-none md:col-span-2"
                rows="4"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#14442E] cursor-pointer hover:shadow-lg duration-500 hover:scale-105 text-white py-2 px-6 rounded w-fit md:col-span-2 hover:bg-[#0c2f1e] transition"
              >
                {loading ? "Submitting..." : "Submit A Query"}
              </button>
            </form>

            {/* Feedback Message */}
            {feedback && (
              <p
                className={`mt-4 text-sm font-medium ${
                  feedback.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback.message}
              </p>
            )}
          </div>

          {/* Right Side: Contact Support Box */}
          <div className="bg-[#14442E] text-white p-6 rounded-lg flex-1 max-w-md">
            <h3 className="text-xl font-semibold mb-3">Say Hello!</h3>
            <p className="text-sm text-gray-200 mb-6">
              Aliquam lectus urna, tempus ac lectus et, gravida bibendum nisl. Nulla consequat
              ham ultricies metus et purus laoreet aliquam.
            </p>

            <Image
              src="/contact/support-image.jpg"
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
