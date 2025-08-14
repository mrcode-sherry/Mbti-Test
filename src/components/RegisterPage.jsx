"use client";

import React, { useState } from "react";
import axios from "axios";
import PageBanner from "./PageBanner";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post("/api/auth/register", formData);
    setMessage(res.data.message);

    if (res.data.success) {
      // Redirect to login page
      window.location.href = "/login";
    }
  } catch (err) {
    setMessage(
      err.response?.data?.message || "Something went wrong, please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <PageBanner title="Registration" backgroundImage="/Banners/about-banner.jpg" />
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-[#14442E] mb-6">
            Create Your Account
          </h2>

          {message && (
            <p
              className={`text-center mb-4 ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gmail Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Password with show/hide toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:shadow-lg duration-500 hover:scale-105 cursor-pointer text-white py-2 rounded-md hover:bg-green-800 transition font-medium"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            {/* Redirect to Login */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-700 hover:underline"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
