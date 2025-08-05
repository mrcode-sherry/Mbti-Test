import React from 'react';
import PageBanner from './PageBanner';

const LoginPage = () => {
  return (
    <div>
      <PageBanner title="Login" backgroundImage="/Banners/about-banner.jpg" />

      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-[#14442E] mb-6">Login to Your Account</h2>
          
          <form className="space-y-5">
            {/* Gmail Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Gmail Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-md hover:shadow-lg duration-500 hover:scale-105 cursor-pointer hover:bg-green-800 transition font-medium"
              >
                Login
              </button>
            </div>
          </form>

          {/* Optional Links */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account? <a href="/registration" className="text-green-700 hover:underline">Register here</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
