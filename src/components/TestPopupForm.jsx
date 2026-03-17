'use client';

import { useState } from 'react';

const TestPopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+92',
    phoneNumber: '',
    maritalStatus: '',
    gender: '',
    city: '',
    province: '',
    age: '',
    educationType: '',
    schoolStatus: '',
    schoolInstitute: '',
    schoolClass: '', // ✅ New field for school class
    collegeYear: '',
    collegeDegree: '',
    collegeInstitute: '',
    universitySemester: '',
    universityDegree: '',

    // ✅ New fields
    favouriteSubjects: [''],
    weakSubjects: [''],
    hobbies: [''],
    fieldsOfInterest: [''],
    parentalExpectation: '',
    budgetRange: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData((p) => ({ ...p, [name]: updatedArray }));
  };

  const addArrayField = (name) => {
    setFormData((p) => ({ ...p, [name]: [...p[name], ''] }));
  };

  const removeArrayField = (name, index) => {
    const updatedArray = [...formData[name]];
    updatedArray.splice(index, 1);
    setFormData((p) => ({ ...p, [name]: updatedArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Delegate submission to parent. Expect boolean return.
      const ok = await onSubmit?.(formData);
      if (ok) onClose();
    } catch (err) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl px-10 py-7 overflow-y-auto max-h-[90vh]">
        <h2 className="text-[20px] md:text-2xl font-bold text-[#14442E] mb-4">Start Your Test</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          {/* ---------------- Old Fields ---------------- */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border p-2 rounded w-full sm:w-28"
                required
              >
                <option value="+92">+92 (PK)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (IN)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+971">+971 (UAE)</option>
              </select>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border p-2 rounded w-full flex-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Province</label>
            <input
              type="text"
              name="province"
              placeholder="Province"
              value={formData.province}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Education Type</label>
            <select
              name="educationType"
              value={formData.educationType}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Education Type</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="university">University</option>
            </select>
          </div>

          {formData.educationType === 'school' && (
            <>
              <div>
                <label className="block font-medium mb-1">School Status</label>
                <select
                  name="schoolStatus"
                  value={formData.schoolStatus}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select School Status</option>
                  <option value="completed">Completed</option>
                  <option value="continue">Continue</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Class</label>
                <select
                  name="schoolClass"
                  value={formData.schoolClass}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">School Institute</label>
                <input
                  type="text"
                  name="schoolInstitute"
                  placeholder="School Institute"
                  value={formData.schoolInstitute}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
            </>
          )}

          {formData.educationType === 'college' && (
            <>
              <div>
                <label className="block font-medium mb-1">College Year</label>
                <select
                  name="collegeYear"
                  value={formData.collegeYear}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select College Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">College Degree</label>
                <input
                  type="text"
                  name="collegeDegree"
                  placeholder="College Degree"
                  value={formData.collegeDegree}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">College Institute</label>
                <input
                  type="text"
                  name="collegeInstitute"
                  placeholder="College Institute"
                  value={formData.collegeInstitute}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
            </>
          )}

          {formData.educationType === 'university' && (
            <>
              <div>
                <label className="block font-medium mb-1">University Semester</label>
                <input
                  type="text"
                  name="universitySemester"
                  placeholder="University Semester"
                  value={formData.universitySemester}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">University Degree</label>
                <input
                  type="text"
                  name="universityDegree"
                  placeholder="University Degree"
                  value={formData.universityDegree}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
            </>
          )}

          {/* ---------------- New Fields ---------------- */}
          <div>
            <label className="block font-medium mb-1">Favourite Subjects (min 3)</label>
            {formData.favouriteSubjects.map((subj, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Subject ${idx + 1}`}
                  value={subj}
                  onChange={(e) => handleArrayChange('favouriteSubjects', idx, e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {idx > 0 && (
                  <button type="button" onClick={() => removeArrayField('favouriteSubjects', idx)} className="px-2 bg-red-500 text-white rounded">
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayField('favouriteSubjects')} className="text-sm text-blue-600">
              + Add Subject
            </button>
          </div>

          <div>
            <label className="block font-medium mb-1">Weak Subjects (min 3)</label>
            {formData.weakSubjects.map((subj, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Subject ${idx + 1}`}
                  value={subj}
                  onChange={(e) => handleArrayChange('weakSubjects', idx, e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {idx > 0 && (
                  <button type="button" onClick={() => removeArrayField('weakSubjects', idx)} className="px-2 bg-red-500 text-white rounded">
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayField('weakSubjects')} className="text-sm text-blue-600">
              + Add Subject
            </button>
          </div>

          <div>
            <label className="block font-medium mb-1">Hobbies (1–3)</label>
            {formData.hobbies.map((hobby, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Hobby ${idx + 1}`}
                  value={hobby}
                  onChange={(e) => handleArrayChange('hobbies', idx, e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {idx > 0 && (
                  <button type="button" onClick={() => removeArrayField('hobbies', idx)} className="px-2 bg-red-500 text-white rounded">
                    X
                  </button>
                )}
              </div>
            ))}
            {formData.hobbies.length < 3 && (
              <button type="button" onClick={() => addArrayField('hobbies')} className="text-sm text-blue-600">
                + Add Hobby
              </button>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Fields of Interest (1–3)</label>
            {formData.fieldsOfInterest.map((field, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Field ${idx + 1}`}
                  value={field}
                  onChange={(e) => handleArrayChange('fieldsOfInterest', idx, e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {idx > 0 && (
                  <button type="button" onClick={() => removeArrayField('fieldsOfInterest', idx)} className="px-2 bg-red-500 text-white rounded">
                    X
                  </button>
                )}
              </div>
            ))}
            {formData.fieldsOfInterest.length < 3 && (
              <button type="button" onClick={() => addArrayField('fieldsOfInterest')} className="text-sm text-blue-600">
                + Add Field
              </button>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Parental Expectation</label>
            <input
              type="text"
              name="parentalExpectation"
              placeholder="Parental Expectation"
              value={formData.parentalExpectation}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Budget Range</label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Budget Range</option>
              <option value="Local education">Local education</option>
              <option value="Abroad">Abroad</option>
              <option value="Scholarships">Scholarships</option>
            </select>
          </div>

          {/* ---------------- Buttons ---------------- */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 cursor-pointer duration-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-700 cursor-pointer duration-300 text-white rounded hover:bg-green-800"
            >
              {loading ? 'Submitting...' : 'Submit & Proceed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestPopupForm;
