"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Modal with outside click + hover cross
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") onClose();
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-4 sm:p-8 relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer duration-300 text-gray-600 hover:text-red-600 transition text-xl"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("test"); // ✅ Default to "test" instead of "welcome"
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [tests, setTests] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // ✅ Manage User states
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [filterField, setFilterField] = useState("fullName");
  const [filterValue, setFilterValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ NEW: States for Category tabs
  const [futureFitUsers, setFutureFitUsers] = useState([]);
  const [medicalUsers, setMedicalUsers] = useState([]);
  const [itCareerUsers, setItCareerUsers] = useState([]);
  const [entrepreneurshipUsers, setEntrepreneurshipUsers] = useState([]);
  const [ngoUsers, setNgoUsers] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  // ✅ Handle tab persistence with URL
  useEffect(() => {
    // Get tab from URL hash or default to "test"
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['test', 'contact', 'manage', 'future-fit', 'medical', 'it-career', 'entrepreneurship', 'ngo-community'];
    
    if (hash && validTabs.includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('test'); // Default to test tab
      window.location.hash = 'test';
    }
  }, []);

  // ✅ Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  // Protect admin route
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/admin");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") router.push("/admin");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/admin");
  };
  // Fetch contacts - CONNECTED TO REAL API
  useEffect(() => {
    if (activeTab === "contact") {
      setLoadingContacts(true);
      fetch('/api/showcontact')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setContacts(data.data);
          } else {
            console.error('Failed to fetch contacts:', data.message);
            setContacts([]);
          }
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
          setContacts([]);
        })
        .finally(() => {
          setLoadingContacts(false);
        });
    }
  }, [activeTab]);

  // Fetch tests + proof - CONNECTED TO REAL API
  useEffect(() => {
    if (activeTab === "test") {
      setLoadingTests(true);
      
      // Fetch both tests and proofs data
      Promise.all([
        fetch('/api/showtest').then(res => res.json()),
        fetch('/api/proof').then(res => res.json()).catch(() => ({ success: false, data: [] }))
      ])
        .then(([testsResponse, proofsResponse]) => {
          if (testsResponse.success) {
            const testsData = testsResponse.data;
            const proofsData = proofsResponse.success ? proofsResponse.data : [];
            
            // Merge test data with proof data
            const mergedData = testsData.map(test => {
              const proof = proofsData.find(p => p.email === test.email);
              return {
                ...test,
                _id: test.id, // Map id to _id for compatibility
                screenshotUrl: proof?.screenshotUrl || null,
                tid: proof?.tid || null,
                status: proof?.status || "pending",
                paid: proof?.status === "approved"
              };
            });
            
            setTests(mergedData);
          } else {
            console.error('Failed to fetch tests:', testsResponse.message);
            setTests([]);
          }
        })
        .catch(error => {
          console.error('Error fetching test data:', error);
          setTests([]);
        })
        .finally(() => {
          setLoadingTests(false);
        });
    }
  }, [activeTab]);
  // ✅ Fetch all users when Manage User tab opens - CONNECTED TO REAL API
  useEffect(() => {
    if (activeTab === "manage") {
      setLoadingUsers(true);
      fetch('/api/showtest')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsers(data.data);
            setFilteredUsers(data.data);
          } else {
            console.error('Failed to fetch users:', data.message);
            setUsers([]);
            setFilteredUsers([]);
          }
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          setUsers([]);
          setFilteredUsers([]);
        })
        .finally(() => {
          setLoadingUsers(false);
        });
    }
  }, [activeTab]);

  // ✅ NEW: Fetch filtered users for Category tabs - CONNECTED TO REAL API
  useEffect(() => {
    if (activeTab === "future-fit" || activeTab === "medical" || activeTab === "it-career" || activeTab === "entrepreneurship" || activeTab === "ngo-community") {
      setLoadingCategories(true);
      fetch('/api/showtest')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const allUsers = data.data;
            setFutureFitUsers(allUsers.filter(u => u.fieldsOfInterest?.includes("Career Guidance") || u.fieldsOfInterest?.includes("Future")));
            setMedicalUsers(allUsers.filter(u => u.fieldsOfInterest?.includes("Medicine") || u.fieldsOfInterest?.includes("Healthcare")));
            setItCareerUsers(allUsers.filter(u => u.fieldsOfInterest?.includes("Technology") || u.fieldsOfInterest?.includes("Software Development") || u.fieldsOfInterest?.includes("AI")));
            setEntrepreneurshipUsers(allUsers.filter(u => u.fieldsOfInterest?.includes("Business") || u.fieldsOfInterest?.includes("Engineering")));
            setNgoUsers(allUsers.filter(u => u.fieldsOfInterest?.includes("Community") || u.fieldsOfInterest?.includes("Social")));
          } else {
            console.error('Failed to fetch category users:', data.message);
            setFutureFitUsers([]);
            setMedicalUsers([]);
            setItCareerUsers([]);
            setEntrepreneurshipUsers([]);
            setNgoUsers([]);
          }
        })
        .catch(error => {
          console.error('Error fetching category users:', error);
          setFutureFitUsers([]);
          setMedicalUsers([]);
          setItCareerUsers([]);
          setEntrepreneurshipUsers([]);
          setNgoUsers([]);
        })
        .finally(() => {
          setLoadingCategories(false);
        });
    }
  }, [activeTab]);
  // ✅ Handle search
  const handleSearch = () => {
    if (!filterValue.trim()) {
      setFilteredUsers(users);
      setErrorMsg("");
      return;
    }

    const results = users.filter((u) => {
      const fieldVal =
        filterField === "fullName"
          ? u.fullName
          : filterField === "email"
          ? u.email
          : filterField === "gender"
          ? u.gender
          : filterField === "maritalStatus"
          ? u.maritalStatus
          : filterField === "countryCode"
          ? u.countryCode
          : filterField === "phoneNumber"
          ? u.phoneNumber
          : filterField === "city"
          ? u.city
          : filterField === "province"
          ? u.province
          : filterField === "educationType"
          ? u.educationType
          : filterField === "schoolClass"
          ? u.schoolClass
          : filterField === "favouriteSubjects"
          ? u.favouriteSubjects?.join(", ")
          : filterField === "weakSubjects"
          ? u.weakSubjects?.join(", ")
          : filterField === "hobbies"
          ? u.hobbies?.join(", ")
          : filterField === "fieldsOfInterest"
          ? u.fieldsOfInterest?.join(", ")
          : filterField === "parentalExpectation"
          ? u.parentalExpectation
          : filterField === "budgetRange"
          ? u.budgetRange
          : "";

      return fieldVal?.toLowerCase().includes(filterValue.toLowerCase());
    });

    if (results.length > 0) {
      setFilteredUsers(results);
      setErrorMsg("");
    } else {
      setFilteredUsers([]);
      setErrorMsg("No users found for this search.");
    }
  };
  // ✅ Approve proof - CONNECTED TO REAL API
  const handleApprove = async (email) => {
    try {
      const response = await fetch('/api/proofsend/approve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("✅ Proof approved. User can now start the test.");
        // Update local state
        setTests((prev) =>
          prev.map((t) =>
            t.email === email ? { ...t, status: "approved", paid: true } : t
          )
        );
        setSelectedTest(null);
      } else {
        alert("❌ Failed to approve proof: " + data.message);
      }
    } catch (error) {
      console.error('Error approving proof:', error);
      alert("❌ Error approving proof. Please try again.");
    }
  };

  // ❌ Reject proof - CONNECTED TO REAL API
  const handleReject = async (email) => {
    try {
      const response = await fetch('/api/proofsend/reject', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("❌ Proof rejected.");
        // Update local state
        setTests((prev) =>
          prev.map((t) =>
            t.email === email ? { ...t, status: "rejected", paid: false } : t
          )
        );
        setSelectedTest(null);
      } else {
        alert("❌ Failed to reject proof: " + data.message);
      }
    } catch (error) {
      console.error('Error rejecting proof:', error);
      alert("❌ Error rejecting proof. Please try again.");
    }
  };
  // ✅ Render user list (reusable for Category tabs)
  const renderCategoryList = (userList, title, categoryColor) => (
    <div>
      {/* ✅ Category Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${categoryColor}`}>
          <h3 className="text-sm font-medium text-gray-500">Total {title}</h3>
          <p className="text-2xl font-bold text-gray-900">{userList.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Male Students</h3>
          <p className="text-2xl font-bold text-green-600">{userList.filter(u => u.gender === "Male").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-pink-500">
          <h3 className="text-sm font-medium text-gray-500">Female Students</h3>
          <p className="text-2xl font-bold text-pink-600">{userList.filter(u => u.gender === "Female").length}</p>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
        {title} Users
      </h2>
      
      {loadingCategories ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : userList.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favourite Subjects</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interests</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expectation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userList.map((u, i) => (
                <tr key={u.id || u._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{title.charAt(0).toUpperCase()}-{2000 + i}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {u.fullName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {u.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {u.countryCode} {u.phoneNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {u.city}, {u.province}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {u.educationType} {u.schoolClass || u.collegeYear || u.universitySemester || ""}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      u.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                    }`}>
                      {u.gender}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {u.maritalStatus}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate">
                      {u.favouriteSubjects ? u.favouriteSubjects.join(", ") : "Not specified"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate">
                      {u.fieldsOfInterest ? u.fieldsOfInterest.join(", ") : "Not specified"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate">
                      {u.parentalExpectation || "Not specified"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {title.toLowerCase()} users yet.</p>
        </div>
      )}
    </div>
  );
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-[#1B5A3D] to-[#0f3a26] text-white shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#1B5A3D] font-bold text-xl">A</span>
            </div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-2"></div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {/* Data Management Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Data Management
              </p>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "test" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("test")}
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300"></span>
                <span className="font-medium">Test Form Data</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "contact" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("contact")}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300"></span>
                <span className="font-medium">Contact Form Data</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "manage" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("manage")}
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-purple-300"></span>
                <span className="font-medium">Manage Users</span>
              </button>
            </div>
            {/* Categories Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Categories
              </p>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "future-fit" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("future-fit")}
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-emerald-300"></span>
                <span className="font-medium">Future Fit</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "medical" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("medical")}
              >
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-red-300"></span>
                <span className="font-medium">Medical Admissions</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "it-career" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("it-career")}
              >
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300"></span>
                <span className="font-medium">IT Career</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "entrepreneurship" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("entrepreneurship")}
              >
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:bg-indigo-300"></span>
                <span className="font-medium">Entrepreneurship</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "ngo-community" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => handleTabChange("ngo-community")}
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:bg-orange-300"></span>
                <span className="font-medium">NGO Community</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 mt-auto">
          <button
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
            onClick={handleLogout}
          >
            <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">🚪</span>
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-x-auto bg-white">
        {/* Test Data */}
        {activeTab === "test" && (
          <div>
            {/* ✅ Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-500">Approved Today</h3>
                <p className="text-2xl font-bold text-green-600">{tests.filter(t => t.status === "approved").length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-sm font-medium text-gray-500">Rejected Users</h3>
                <p className="text-2xl font-bold text-red-600">{tests.filter(t => t.status === "rejected").length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
                <p className="text-2xl font-bold text-yellow-600">{tests.filter(t => t.status === "pending").length}</p>
              </div>
            </div>

            {/* ✅ Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">Top Category</h3>
                <p className="text-xl font-bold text-blue-600">Medical Admissions</p>
                <p className="text-xs text-gray-400">Most popular choice</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">School Students</h3>
                <p className="text-xl font-bold text-purple-600">{tests.filter(t => t.educationType === "school").length}</p>
                <p className="text-xs text-gray-400">Classes 8-10</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-sm font-medium text-gray-500">University Students</h3>
                <p className="text-xl font-bold text-indigo-600">{tests.filter(t => t.educationType === "university").length}</p>
                <p className="text-xs text-gray-400">Higher education</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
              Test Form Submissions
            </h2>
            
            {loadingTests ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : tests.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Proof</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tests.map((t, i) => (
                      <tr key={t.id || t._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{t.fullName}</div>
                          <div className="text-sm text-gray-500">{t.email}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {t.educationType}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            t.status === "approved" ? "bg-green-100 text-green-800" :
                            t.status === "rejected" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {t.status === "approved" ? "Approved" : 
                             t.status === "rejected" ? "Rejected" : "Needs review"}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {t.screenshotUrl ? (
                            <span className="text-green-600">📷 Screenshot</span>
                          ) : t.tid ? (
                            <span className="text-blue-600">🧾 TID: {t.tid}</span>
                          ) : (
                            <span className="text-gray-400">❌ No proof</span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedTest(t)}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer duration-300"
                              title="View Details"
                            >
                              👁️
                            </button>
                            {t.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(t.email)}
                                  className="text-green-600 hover:text-green-900 cursor-pointer duration-300"
                                  title="Approve"
                                >
                                  ✅
                                </button>
                                <button
                                  onClick={() => handleReject(t.email)}
                                  className="text-red-600 hover:text-red-900 cursor-pointer duration-300"
                                  title="Reject"
                                >
                                  ❌
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No test submissions yet.</p>
              </div>
            )}
          </div>
        )}
        {/* Contact Data */}
        {activeTab === "contact" && (
          <div>
            {/* ✅ Contact Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500">Total Contacts</h3>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-500">This Month</h3>
                <p className="text-2xl font-bold text-green-600">{contacts.filter(c => {
                  const contactDate = new Date(c.createdAt);
                  const currentDate = new Date();
                  return contactDate.getMonth() === currentDate.getMonth() && contactDate.getFullYear() === currentDate.getFullYear();
                }).length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-sm font-medium text-gray-500">Recent (7 days)</h3>
                <p className="text-2xl font-bold text-purple-600">{contacts.filter(c => {
                  const contactDate = new Date(c.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return contactDate >= weekAgo;
                }).length}</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
              Contact Form Submissions
            </h2>
            
            {loadingContacts ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : contacts.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((c, i) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {c.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {c.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={c.message}>
                            {c.message}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedContact(c)}
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer duration-300"
                            title="View Full Message"
                          >
                            👁️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No contact submissions yet.</p>
              </div>
            )}
          </div>
        )}
        {/* ✅ Manage User */}
        {activeTab === "manage" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
              Manage Users
            </h2>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={filterField}
                  onChange={(e) => setFilterField(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="fullName">Name</option>
                  <option value="email">Email</option>
                  <option value="city">City</option>
                  <option value="educationType">Education</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter search value..."
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border rounded-lg px-3 py-2 flex-1 text-black focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

                <button
                  onClick={handleSearch}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer duration-300"
                >
                  Search
                </button>
              </div>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : errorMsg ? (
              <div className="text-center py-8 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600">{errorMsg}</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interests</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((u, i) => (
                      <tr key={u.id || u._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {u.fullName}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {u.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {u.city}, {u.province}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {u.educationType}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate">
                            {u.fieldsOfInterest ? u.fieldsOfInterest.join(", ") : "Not specified"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No users found.</p>
              </div>
            )}
          </div>
        )}

        {/* ✅ NEW: Category Tabs */}
        {activeTab === "future-fit" && renderCategoryList(futureFitUsers, "Future Fit", "border-green-500")}
        {activeTab === "medical" && renderCategoryList(medicalUsers, "Medical", "border-red-500")}
        {activeTab === "it-career" && renderCategoryList(itCareerUsers, "IT Career", "border-blue-500")}
        {activeTab === "entrepreneurship" && renderCategoryList(entrepreneurshipUsers, "Entrepreneurship", "border-purple-500")}
        {activeTab === "ngo-community" && renderCategoryList(ngoUsers, "NGO Community", "border-orange-500")}
      </main>
      {/* Test Modal */}
      <Modal isOpen={!!selectedTest} onClose={() => setSelectedTest(null)}>
        {selectedTest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Details */}
            <div className="space-y-1 text-sm sm:text-base">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">
                Test Details
              </h3>
              <p className="text-black">
                <b>Name:</b> {selectedTest.fullName}
              </p>
              <p className="text-black">
                <b>Email:</b> {selectedTest.email}
              </p>
              <p className="text-black">
                <b>Gender:</b> {selectedTest.gender}
              </p>
              <p className="text-black">
                <b>Marital Status:</b> {selectedTest.maritalStatus}
              </p>
              <p className="text-black">
                <b>Phone:</b> {selectedTest.countryCode} {selectedTest.phoneNumber}
              </p>
              <p className="text-black">
                <b>Location:</b> {selectedTest.city}, {selectedTest.province}
              </p>
              <p className="text-black">
                <b>Education:</b> {selectedTest.educationType}
              </p>
              {selectedTest.schoolClass && (
                <p className="text-black">
                  <b>School Class:</b> {selectedTest.schoolClass}
                </p>
              )}
              {selectedTest.collegeYear && (
                <p className="text-black">
                  <b>College Year:</b> {selectedTest.collegeYear}
                </p>
              )}
              {selectedTest.universitySemester && (
                <p className="text-black">
                  <b>University Semester:</b> {selectedTest.universitySemester}
                </p>
              )}
              {selectedTest.favouriteSubjects && selectedTest.favouriteSubjects.length > 0 && (
                <p className="text-black">
                  <b>Favourite Subjects:</b> {selectedTest.favouriteSubjects.join(", ")}
                </p>
              )}
              {selectedTest.weakSubjects && selectedTest.weakSubjects.length > 0 && (
                <p className="text-black">
                  <b>Weak Subjects:</b> {selectedTest.weakSubjects.join(", ")}
                </p>
              )}
              {selectedTest.hobbies && selectedTest.hobbies.length > 0 && (
                <p className="text-black">
                  <b>Hobbies:</b> {selectedTest.hobbies.join(", ")}
                </p>
              )}
              {selectedTest.fieldsOfInterest && selectedTest.fieldsOfInterest.length > 0 && (
                <p className="text-black">
                  <b>Interests:</b> {selectedTest.fieldsOfInterest.join(", ")}
                </p>
              )}
              {selectedTest.parentalExpectation && (
                <p className="text-black">
                  <b>Parental Expectation:</b> {selectedTest.parentalExpectation}
                </p>
              )}
              {selectedTest.budgetRange && (
                <p className="text-black">
                  <b>Budget Range:</b> {selectedTest.budgetRange}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Submitted {new Date(selectedTest.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Payment Proof */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">
                Payment Proof
              </h3>
              {selectedTest.screenshotUrl ? (
                <img
                  src={selectedTest.screenshotUrl}
                  alt="Payment Proof"
                  className="w-full max-h-[350px] object-contain rounded border"
                />
              ) : selectedTest.tid ? (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-black">
                    <b>Transaction ID:</b> {selectedTest.tid}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-500">No payment proof submitted</p>
                </div>
              )}

              {/* Status Display Only */}
              <div className="mt-4">
                <p className="text-black mb-2">
                  <b>Current Status:</b>
                </p>
                {selectedTest.status === "approved" && (
                  <p className="text-green-700 font-semibold">
                    ✅ Approved — User can now start the test
                  </p>
                )}
                {selectedTest.status === "rejected" && (
                  <p className="text-red-700 font-semibold">
                    ❌ Rejected — User cannot take the test
                  </p>
                )}
                {selectedTest.status === "pending" && (
                  <p className="text-yellow-700 font-semibold">
                    ⏳ Pending Review — Awaiting admin approval
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={!!selectedContact} onClose={() => setSelectedContact(null)}>
        {selectedContact && (
          <div className="space-y-1 text-sm sm:text-base">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">
              Contact Details
            </h3>
            <p className="text-black">
              <b>Name:</b> {selectedContact.name}
            </p>
            <p className="text-black">
              <b>Email:</b> {selectedContact.email}
            </p>
            <p className="text-black">
              <b>Message:</b> {selectedContact.message}
            </p>
            <p className="text-xs text-gray-500">
              Submitted {new Date(selectedContact.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;