"use client";

import React, { useState } from 'react';
import PageBanner from './PageBanner';

const RegisterPage = () => {
    const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);
    const classOptions = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
    const semesterOptions = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

    const [educationType, setEducationType] = useState('');
    const [schoolStatus, setSchoolStatus] = useState('');
    const [collegeYear, setCollegeYear] = useState('');
    const [universityStatus, setUniversityStatus] = useState('');

    return (
        <div>
            <PageBanner title="Registration" backgroundImage="/Banners/about-banner.jpg" />
            <section className="py-16 px-6 bg-gray-100">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-[#14442E] mb-6">Create Your Account</h2>

                    <form className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" required placeholder="John Doe" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        {/* Gmail Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gmail Address</label>
                            <input type="email" required placeholder="example@gmail.com" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        {/* Phone Number with Country Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                            <div className="flex gap-2">
                                <select required className="w-1/3 px-2 py-2 border rounded-md">
                                    <option value="+92">+92 (Pakistan)</option>
                                    <option value="+91">+91 (India)</option>
                                    <option value="+1">+1 (United States)</option>
                                    <option value="+44">+44 (United Kingdom)</option>
                                    <option value="+61">+61 (Australia)</option>
                                    <option value="+971">+971 (United Arab Emirates)</option>
                                    <option value="+880">+880 (Bangladesh)</option>
                                    <option value="+81">+81 (Japan)</option>
                                    <option value="+86">+86 (China)</option>
                                    <option value="+49">+49 (Germany)</option>
                                    <option value="+33">+33 (France)</option>
                                    <option value="+39">+39 (Italy)</option>
                                    <option value="+7">+7 (Russia)</option>
                                    <option value="+55">+55 (Brazil)</option>
                                    <option value="+34">+34 (Spain)</option>
                                    <option value="+966">+966 (Saudi Arabia)</option>
                                    <option value="+20">+20 (Egypt)</option>
                                    <option value="+27">+27 (South Africa)</option>
                                    <option value="+63">+63 (Philippines)</option>
                                    <option value="+62">+62 (Indonesia)</option>
                                    <option value="+60">+60 (Malaysia)</option>
                                    <option value="+82">+82 (South Korea)</option>
                                    <option value="+98">+98 (Iran)</option>
                                    <option value="+964">+964 (Iraq)</option>
                                    <option value="+90">+90 (Turkey)</option>
                                    <option value="+234">+234 (Nigeria)</option>
                                    <option value="+254">+254 (Kenya)</option>

                                </select>
                                <input type="tel" required placeholder="3XXXXXXXXX" className="w-2/2 px-4 py-2 border rounded-md" />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" required placeholder="********" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        {/* Marital Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                            <select required className="w-full px-4 py-2 border rounded-md">
                                <option value="">Select</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select required className="w-full px-4 py-2 border rounded-md">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input type="text" required placeholder="Your city" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        {/* Province */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Province/State</label>
                            <input type="text" required placeholder="Province or State" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        {/* Age Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <select required className="w-full px-4 py-2 border rounded-md">
                                <option value="">Select</option>
                                {ageOptions.map(age => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>

                        {/* Education Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                            <select
                                required
                                value={educationType}
                                onChange={(e) => {
                                    setEducationType(e.target.value);
                                    setSchoolStatus('');
                                    setCollegeYear('');
                                    setUniversityStatus('');
                                }}
                                className="w-full px-4 py-2 border rounded-md"
                            >
                                <option value="">Select</option>
                                <option value="school">School</option>
                                <option value="college">College</option>
                                <option value="university">University</option>
                            </select>
                        </div>

                        {/* School Fields */}
                        {educationType === 'school' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={schoolStatus}
                                        onChange={(e) => setSchoolStatus(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="completed">Completed</option>
                                        <option value="continue">Continue</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                                    <input type="text" required placeholder="Your Institute" className="w-full px-4 py-2 border rounded-md" />
                                </div>
                            </>
                        )}

                        {/* College Fields */}
                        {educationType === 'college' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                    <select
                                        value={collegeYear}
                                        onChange={(e) => setCollegeYear(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. FSC, ICS, ICOM"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                                    <input type="text" required placeholder="Your Institute" className="w-full px-4 py-2 border rounded-md" />
                                </div>
                            </>
                        )}

                        {/* University Fields */}
                        {educationType === 'university' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                                    <select
                                        value={universityStatus}
                                        onChange={(e) => setUniversityStatus(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    >
                                        <option value="">Select</option>
                                        {semesterOptions.map((sem, index) => (
                                            <option key={index} value={sem}>{sem}</option>
                                        ))}
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. BSCS, BBA"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                                    <input type="text" required placeholder="Your Institute" className="w-full px-4 py-2 border rounded-md" />
                                </div>
                            </>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button type="submit" className="w-full bg-green-700 hover:shadow-lg duration-500 hover:scale-105 cursor-pointer text-white py-2 rounded-md hover:bg-green-800 transition font-medium">
                                Register
                            </button>
                        </div>

                        {/* Redirect to Login */}
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Already have an account? <a href="/login" className="text-green-700 hover:underline">Login here</a>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;
