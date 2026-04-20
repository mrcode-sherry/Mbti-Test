'use client';

import { useState } from 'react';

const TestPopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    // Section 1: Student Profile
    fullName: '',
    fatherName: '',
    age: '',
    gender: '',

    // Section 2: Education Details
    currentEducationLevel: '',
    boardInstitution: '',
    mediumOfInstruction: '',
    expectedResult: '',

    // Section 3: Academic Self-Report
    favouriteSubjects: [''],
    weakSubjects: [''],

    // Section 4: Activities & Interests
    extraCurricularActivities: [''],

    // Section 5: Family Background (Optional)
    fatherOccupation: '',
    motherOccupation: '',
    socioeconomicBracket: '',

    // Section 6: Career Preference
    careerPreferences: '',

    // Section 7: Test Category Selection
    testCategory: 'Future Fit', // Default selected

    // Keep existing fields for backward compatibility
    countryCode: '+92',
    phoneNumber: '',
    maritalStatus: 'single',
    city: '',
    province: '',
    educationType: 'school',
    schoolStatus: 'continue',
    schoolClass: '10',
    schoolInstitute: '',
    collegeYear: '',
    collegeDegree: '',
    collegeInstitute: '',
    universitySemester: '',
    universityDegree: '',
    hobbies: [''],
    fieldsOfInterest: ['Career Guidance'],
    parentalExpectation: '',
    budgetRange: 'Local education',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tabErrors, setTabErrors] = useState({});

  const tabs = [
    'Student Profile',
    'Education Details', 
    'Academic Self-Report',
    'Activities & Interests',
    'Family Background',
    'Career Preference',
    'Test Category'
  ];

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    // ✅ Clear frontend validation errors when user starts typing
    if (tabErrors[currentTab] && tabErrors[currentTab].length > 0) {
      setTabErrors(prev => ({ ...prev, [currentTab]: [] }));
    }
    // Clear general error message
    if (error) {
      setError('');
    }
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

  // ✅ Frontend Validation - For immediate user feedback only
  const validateCurrentTab = () => {
    switch (currentTab) {
      case 0: // Student Profile
        return (
          formData.fullName.trim().length >= 2 &&
          formData.fatherName.trim().length >= 2 &&
          formData.age &&
          parseInt(formData.age) >= 15 &&
          parseInt(formData.age) <= 100 &&
          formData.gender &&
          ['Male', 'Female', 'Other'].includes(formData.gender)
        );
      case 1: // Education Details
        return (
          formData.currentEducationLevel.trim().length >= 5 &&
          formData.boardInstitution.trim().length >= 3 &&
          formData.mediumOfInstruction.trim().length >= 3 &&
          formData.expectedResult.trim().length >= 3
        );
      case 2: // Academic Self-Report
        return (
          formData.favouriteSubjects.filter(s => s.trim().length > 0).length >= 1 &&
          formData.weakSubjects.filter(s => s.trim().length > 0).length >= 1
        );
      case 3: // Activities & Interests
        return formData.extraCurricularActivities.filter(a => a.trim().length > 0).length >= 1;
      case 4: // Family Background (Optional)
        return true; // Optional section - no validation required
      case 5: // Career Preference
        return true; // Made optional - no validation required
      case 6: // Test Category
        return formData.testCategory && formData.testCategory.trim().length >= 3;
      default:
        return true;
    }
  };

  // ✅ Get validation error messages for current tab
  const getTabValidationErrors = () => {
    const errors = [];
    
    switch (currentTab) {
      case 0: // Student Profile
        if (formData.fullName.trim().length < 2) errors.push("Full name must be at least 2 characters");
        if (formData.fatherName.trim().length < 2) errors.push("Father's name must be at least 2 characters");
        if (!formData.age || parseInt(formData.age) < 15) errors.push("Age must be 15 or older");
        if (parseInt(formData.age) > 100) errors.push("Please enter a valid age");
        if (!formData.gender) errors.push("Please select your gender");
        break;
      case 1: // Education Details
        if (formData.currentEducationLevel.trim().length < 5) errors.push("Please select your current education level");
        if (formData.boardInstitution.trim().length < 3) errors.push("Board/Institution name is required");
        if (formData.mediumOfInstruction.trim().length < 3) errors.push("Please select medium of instruction");
        if (formData.expectedResult.trim().length < 3) errors.push("Please select your expected result/status");
        break;
      case 2: // Academic Self-Report
        if (formData.favouriteSubjects.filter(s => s.trim().length > 0).length < 1) errors.push("Please add at least one favourite subject");
        if (formData.weakSubjects.filter(s => s.trim().length > 0).length < 1) errors.push("Please add at least one weak subject");
        break;
      case 3: // Activities & Interests
        if (formData.extraCurricularActivities.filter(a => a.trim().length > 0).length < 1) errors.push("Please add at least one extra-curricular activity");
        break;
      case 5: // Career Preference - Now optional
        // No validation required since it's optional
        break;
      case 6: // Test Category
        if (!formData.testCategory) errors.push("Please select a test category");
        break;
    }
    
    return errors;
  };

  const handleNext = () => {
    const errors = getTabValidationErrors();
    if (errors.length > 0) {
      setTabErrors(prev => ({ ...prev, [currentTab]: errors }));
      return;
    }
    
    setTabErrors(prev => ({ ...prev, [currentTab]: [] }));
    if (currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleTabClick = (tabIndex) => {
    // Allow going to previous tabs or current tab
    if (tabIndex <= currentTab) {
      setCurrentTab(tabIndex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Frontend validation before submission
    const errors = getTabValidationErrors();
    if (errors.length > 0) {
      setTabErrors(prev => ({ ...prev, [currentTab]: errors }));
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Map new fields to existing API structure for backward compatibility
      const apiData = {
        // New fields
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        age: formData.age,
        gender: formData.gender,
        currentEducationLevel: formData.currentEducationLevel,
        boardInstitution: formData.boardInstitution,
        mediumOfInstruction: formData.mediumOfInstruction,
        expectedResult: formData.expectedResult,
        favouriteSubjects: formData.favouriteSubjects.filter(s => s.trim()),
        weakSubjects: formData.weakSubjects.filter(s => s.trim()),
        extraCurricularActivities: formData.extraCurricularActivities.filter(a => a.trim()),
        fatherOccupation: formData.fatherOccupation,
        motherOccupation: formData.motherOccupation,
        socioeconomicBracket: formData.socioeconomicBracket,
        careerPreferences: formData.careerPreferences,
        testCategory: formData.testCategory,

        // Existing fields for backward compatibility
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber || '0000000000', // Default phone
        maritalStatus: formData.maritalStatus,
        city: formData.city || 'Not specified',
        province: formData.province || 'Not specified',
        educationType: formData.educationType,
        schoolStatus: formData.schoolStatus,
        schoolClass: formData.schoolClass,
        schoolInstitute: formData.schoolInstitute || formData.boardInstitution,
        collegeYear: formData.collegeYear,
        collegeDegree: formData.collegeDegree,
        collegeInstitute: formData.collegeInstitute,
        universitySemester: formData.universitySemester,
        universityDegree: formData.universityDegree,
        hobbies: formData.hobbies.filter(h => h.trim()),
        fieldsOfInterest: formData.fieldsOfInterest,
        parentalExpectation: formData.parentalExpectation || formData.careerPreferences,
        budgetRange: formData.budgetRange,
      };

      // ✅ Submit to backend - backend will do its own validation
      const ok = await onSubmit?.(apiData);
      if (ok) {
        onClose();
      }
    } catch (err) {
      // ✅ Display backend validation errors to user
      setError(err?.message || 'Something went wrong. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // Student Profile
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 1: Student Profile</h3>
            </div>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Student Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Age * (must be 15 or older)</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                min="15"
                value={formData.age}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              />
              {formData.age && parseInt(formData.age) < 15 && (
                <p className="text-red-500 text-sm mt-1">Age must be 15 or older</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );

      case 1: // Education Details
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 2: Education Details</h3>
            </div>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Current Education Level *</label>
              <select
                name="currentEducationLevel"
                value={formData.currentEducationLevel}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              >
                <option value="">Select Education Level</option>
                <option value="Matriculation (Science) — Class 10">Matriculation (Science) — Class 10</option>
                <option value="Matriculation (Arts) — Class 10">Matriculation (Arts) — Class 10</option>
                <option value="Intermediate (Pre-Medical) — Class 12">Intermediate (Pre-Medical) — Class 12</option>
                <option value="Intermediate (Pre-Engineering) — Class 12">Intermediate (Pre-Engineering) — Class 12</option>
                <option value="Intermediate (Commerce) — Class 12">Intermediate (Commerce) — Class 12</option>
                <option value="A-Levels">A-Levels</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Board / Institution *</label>
              <input
                type="text"
                name="boardInstitution"
                placeholder="e.g., BISE Lahore / Govt. Pilot Secondary School, Wahdat Road, Lahore"
                value={formData.boardInstitution}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Medium of Instruction *</label>
              <select
                name="mediumOfInstruction"
                value={formData.mediumOfInstruction}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              >
                <option value="">Select Medium</option>
                <option value="Urdu Medium (English as second language)">Urdu Medium (English as second language)</option>
                <option value="English Medium">English Medium</option>
                <option value="Mixed (Urdu & English)">Mixed (Urdu & English)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Expected Result / Status *</label>
              <select
                name="expectedResult"
                value={formData.expectedResult}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                required
              >
                <option value="">Select Status</option>
                <option value="Awaiting (Board Exams completed)">Awaiting (Board Exams completed)</option>
                <option value="Currently Studying">Currently Studying</option>
                <option value="Completed with A+ Grade">Completed with A+ Grade</option>
                <option value="Completed with A Grade">Completed with A Grade</option>
                <option value="Completed with B Grade">Completed with B Grade</option>
                <option value="Completed with C Grade">Completed with C Grade</option>
              </select>
            </div>
          </div>
        );

      case 2: // Academic Self-Report
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 3: Academic Self‑Report</h3>
            </div>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Favourite Subjects (Self‑reported) *</label>
              <p className="text-sm text-gray-500 mb-3">Add subjects you enjoy and perform well in</p>
              {formData.favouriteSubjects.map((subject, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder={`e.g., ${idx === 0 ? 'Mathematics' : idx === 1 ? 'Computer Science' : 'Physics'}`}
                    value={subject}
                    onChange={(e) => handleArrayChange('favouriteSubjects', idx, e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                    required={idx === 0}
                  />
                  {idx > 0 && (
                    <button 
                      type="button" 
                      onClick={() => removeArrayField('favouriteSubjects', idx)} 
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayField('favouriteSubjects')} 
                className="text-sm text-[#14442E] hover:text-[#0f3a26] font-medium"
              >
                + Add Another Subject
              </button>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Weak Subjects (Self‑reported) *</label>
              <p className="text-sm text-gray-500 mb-3">Add subjects you find challenging</p>
              {formData.weakSubjects.map((subject, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder={`e.g., ${idx === 0 ? 'Islamiat (Essay-type)' : idx === 1 ? 'Urdu (Creative Writing)' : 'Chemistry'}`}
                    value={subject}
                    onChange={(e) => handleArrayChange('weakSubjects', idx, e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                    required={idx === 0}
                  />
                  {idx > 0 && (
                    <button 
                      type="button" 
                      onClick={() => removeArrayField('weakSubjects', idx)} 
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayField('weakSubjects')} 
                className="text-sm text-[#14442E] hover:text-[#0f3a26] font-medium"
              >
                + Add Another Subject
              </button>
            </div>
          </div>
        );

      case 3: // Activities & Interests
        return (
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 4: Activities & Interests</h3>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Extra‑Curricular Activities *</label>
              <p className="text-sm text-gray-500 mb-3">List your activities, clubs, competitions, etc.</p>
              {formData.extraCurricularActivities.map((activity, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder={`e.g., ${idx === 0 ? 'School Science Fair participant' : idx === 1 ? 'Chess Club' : 'Debate Society'}`}
                    value={activity}
                    onChange={(e) => handleArrayChange('extraCurricularActivities', idx, e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
                    required={idx === 0}
                  />
                  {idx > 0 && (
                    <button 
                      type="button" 
                      onClick={() => removeArrayField('extraCurricularActivities', idx)} 
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayField('extraCurricularActivities')} 
                className="text-sm text-[#14442E] hover:text-[#0f3a26] font-medium"
              >
                + Add Another Activity
              </button>
            </div>
          </div>
        );

      case 4: // Family Background (Optional)
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 5: Family Background (Optional)</h3>
              <p className="text-sm text-gray-500 mb-6">This information helps us provide better career guidance</p>
            </div>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Father's Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                placeholder="e.g., Government School Teacher (BPS‑16)"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Mother's Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                placeholder="e.g., Homemaker, Teacher, Doctor, etc."
                value={formData.motherOccupation}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-2 text-gray-700">Socioeconomic Bracket</label>
              <select
                name="socioeconomicBracket"
                value={formData.socioeconomicBracket}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full max-w-md focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
              >
                <option value="">Select Bracket</option>
                <option value="Lower Class">Lower Class</option>
                <option value="Lower Middle Class">Lower Middle Class</option>
                <option value="Middle Class">Middle Class</option>
                <option value="Upper Middle Class">Upper Middle Class</option>
                <option value="Upper Class">Upper Class</option>
              </select>
            </div>
          </div>
        );

      case 5: // Career Preference
        return (
          <div className="max-w-3xl">
            <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 6: Career Preference (Self‑Reported)</h3>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Career Preferences / Current Thinking (Optional)</label>
              <p className="text-sm text-gray-500 mb-3">What career paths are you currently considering?</p>
              <textarea
                name="careerPreferences"
                placeholder='e.g., "Doctor ya Engineer" (as suggested by family), or your own career interests'
                value={formData.careerPreferences}
                onChange={handleChange}
                rows={6}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors resize-none"
              />
            </div>
          </div>
        );

      case 6: // Test Category Selection
        return (
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-[#14442E] mb-6">Section 7: Test Category Selection</h3>
            
            <div>
              <label className="block font-medium mb-2 text-gray-700">Which guidance test do you want to take? *</label>
              <div className="mt-4">
                <div className="flex items-center p-6 border-2 border-[#14442E] bg-[#14442E]/5 rounded-lg">
                  <input
                    type="radio"
                    id="future-fit"
                    name="testCategory"
                    value="Future Fit"
                    checked={formData.testCategory === 'Future Fit'}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#14442E] border-gray-300 focus:ring-[#14442E]"
                  />
                  <label htmlFor="future-fit" className="ml-4 text-gray-700 font-medium text-lg">
                    ☑️ Future Fit (Career Guidance — All Fields)
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-3 ml-9">
                  Comprehensive career assessment covering all fields and industries
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-2">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#14442E] to-[#0f3a26] text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Start Your Test</h2>
              <p className="text-green-100 mt-1">Complete all sections to proceed</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="grid grid-cols-7 gap-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                disabled={index > currentTab}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center ${
                  index === currentTab
                    ? 'bg-[#14442E] text-white shadow-md'
                    : index < currentTab
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } ${tabErrors[index] && tabErrors[index].length > 0 ? 'ring-2 ring-red-500' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">
                    {index < currentTab ? '✓' : index + 1}
                  </span>
                  <span className="leading-tight">{tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {tabErrors[currentTab] && tabErrors[currentTab].length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium mb-2">Please fix the following issues:</p>
              <ul className="list-disc list-inside space-y-1">
                {tabErrors[currentTab].map((err, idx) => (
                  <li key={idx} className="text-sm">{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {renderTabContent()}
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentTab === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentTab === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer'
            }`}
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentTab + 1} of {tabs.length}
          </div>

          {currentTab === tabs.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !validateCurrentTab()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                loading || !validateCurrentTab()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#14442E] text-white hover:bg-[#0f3a26] cursor-pointer'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit & Proceed'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-[#14442E] text-white rounded-lg font-medium hover:bg-[#0f3a26] transition-colors cursor-pointer"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPopupForm;
