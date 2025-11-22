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
  const [activeTab, setActiveTab] = useState("welcome");
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

  // ✅ NEW: States for School, College, University tabs
  const [schoolUsers, setSchoolUsers] = useState([]);
  const [collegeUsers, setCollegeUsers] = useState([]);
  const [universityUsers, setUniversityUsers] = useState([]);
  const [loadingEducation, setLoadingEducation] = useState(false);

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

  // Fetch contacts
  useEffect(() => {
    if (activeTab === "contact") {
      setLoadingContacts(true);
      fetch("/api/showcontact")
        .then((res) => res.json())
        .then((data) => data.success && setContacts(data.data))
        .finally(() => setLoadingContacts(false));
    }
  }, [activeTab]);

  // Fetch tests + proof
  useEffect(() => {
    if (activeTab === "test") {
      setLoadingTests(true);
      fetch("/api/showtest")
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            const enriched = await Promise.all(
              data.data.map(async (t) => {
                try {
                  const res = await fetch(
                    `/api/screenshotfetch?email=${t.email}`
                  );
                  if (res.ok) {
                    const proofData = await res.json();
                    return {
                      ...t,
                      screenshotUrl: proofData.data?.screenshotUrl || null,
                      tid: proofData.data?.tid || null,
                      status: proofData.data?.status || "pending",
                      paid: proofData.data?.status === "approved",
                    };
                  }
                } catch {}
                return {
                  ...t,
                  screenshotUrl: null,
                  tid: null,
                  status: "pending",
                  paid: false,
                };
              })
            );
            setTests(enriched);
          }
        })
        .finally(() => setLoadingTests(false));
    }
  }, [activeTab]);

  // ✅ Fetch all users when Manage User tab opens
  useEffect(() => {
    if (activeTab === "manage") {
      setLoadingUsers(true);
      fetch("/api/showtest")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUsers(data.data);
            setFilteredUsers(data.data);
          }
        })
        .finally(() => setLoadingUsers(false));
    }
  }, [activeTab]);

  // ✅ NEW: Fetch filtered users for School, College, University tabs
  useEffect(() => {
    if (activeTab === "school" || activeTab === "college" || activeTab === "university") {
      setLoadingEducation(true);
      fetch("/api/showtest")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const allUsers = data.data;
            setSchoolUsers(allUsers.filter(u => u.educationType === "school"));
            setCollegeUsers(allUsers.filter(u => u.educationType === "college"));
            setUniversityUsers(allUsers.filter(u => u.educationType === "university"));
          }
        })
        .finally(() => setLoadingEducation(false));
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

  // ✅ Approve proof API call
  const handleApprove = async (email) => {
    try {
      const res = await fetch("/api/proofsend/approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Proof approved. User can now start the test.");
        setTests((prev) =>
          prev.map((t) =>
            t.email === email ? { ...t, status: "approved", paid: true } : t
          )
        );
        setSelectedTest(null);
      } else {
        alert(data.message || "Failed to approve proof.");
      }
    } catch (err) {
      alert("Error approving proof: " + err.message);
    }
  };

  // ❌ Reject proof API call
  const handleReject = async (email) => {
    try {
      const res = await fetch("/api/proofsend/reject", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("❌ Proof rejected.");
        setTests((prev) =>
          prev.map((t) =>
            t.email === email ? { ...t, status: "rejected", paid: false } : t
          )
        );
        setSelectedTest(null);
      } else {
        alert(data.message || "Failed to reject proof.");
      }
    } catch (err) {
      alert("Error rejecting proof: " + err.message);
    }
  };

  // ✅ Render user list (reusable for School/College/University tabs)
  const renderUserList = (userList, title) => (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
        {title}
      </h2>
      {loadingEducation ? (
        <p className="text-black">Loading...</p>
      ) : userList.length > 0 ? (
        <ul className="space-y-2">
          {userList.map((u, i) => (
            <li
              key={u._id}
              className="p-3 border rounded bg-gray-50 shadow-sm text-black text-sm"
            >
              <span className="font-bold">{i + 1}.</span>{" "}
              <span className="font-semibold">{u.fullName}</span> | {u.email} | {u.gender} | {u.maritalStatus} | {u.countryCode} {u.phoneNumber} | {u.city}, {u.province}
              {u.schoolClass && <> | Class: {u.schoolClass}</>}
              {u.favouriteSubjects && <> | Favourite: {u.favouriteSubjects.join(", ")}</>}
              {u.weakSubjects && <> | Weak: {u.weakSubjects.join(", ")}</>}
              {u.hobbies && <> | Hobbies: {u.hobbies.join(", ")}</>}
              {u.fieldsOfInterest && <> | Interests: {u.fieldsOfInterest.join(", ")}</>}
              {u.parentalExpectation && <> | Expectation: {u.parentalExpectation}</>}
              {u.budgetRange && <> | Budget: {u.budgetRange}</>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600">No {title.toLowerCase()} yet.</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1B5A3D] text-white p-4 sm:p-6 space-y-2">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
          Admin Panel
        </h2>
        <button
          className={`block w-full text-left cursor-pointer duration-300 px-3 py-2 rounded ${
            activeTab === "test" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("test")}
        >
          Test Form Data
        </button>
        <button
          className={`block w-full text-left px-3 py-2 rounded cursor-pointer duration-300 ${
            activeTab === "contact" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Form Data
        </button>
        <button
          className={`block w-full text-left px-3 py-2 rounded cursor-pointer duration-300 ${
            activeTab === "manage" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage User
        </button>
        {/* ✅ NEW: School, College, University tabs */}
        <button
          className={`block w-full text-left px-3 py-2 rounded cursor-pointer duration-300 ${
            activeTab === "school" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("school")}
        >
          School
        </button>
        <button
          className={`block w-full text-left px-3 py-2 rounded cursor-pointer duration-300 ${
            activeTab === "college" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("college")}
        >
          College
        </button>
        <button
          className={`block w-full text-left px-3 py-2 rounded cursor-pointer duration-300 ${
            activeTab === "university" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("university")}
        >
          University
        </button>
        <button
          className="block w-full text-center px-3 py-2 mt-4 rounded bg-red-600 cursor-pointer duration-300 hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-x-auto bg-white">
        {activeTab === "welcome" && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-black">
              Admin Dashboard
            </h1>
            <p className="text-gray-900">Welcome, Admin! 🎉</p>
          </div>
        )}

        {/* Test Data */}
        {activeTab === "test" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
              Test Form Data
            </h2>
            {loadingTests ? (
              <p className="text-black">Loading...</p>
            ) : tests.length > 0 ? (
              <ul className="space-y-2">
                {tests.map((t, i) => (
                  <li
                    key={t._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded bg-gray-50 shadow-sm"
                  >
                    <span className="w-full sm:w-8 font-bold text-gray-600">
                      {i + 1}.
                    </span>
                    <span className="flex-1 text-sm sm:text-base text-black">
                      <span className="font-semibold">{t.fullName}</span> |{" "}
                      {t.email} | {t.gender} | {t.maritalStatus} |{" "}
                      {t.countryCode} {t.phoneNumber} | {t.city}, {t.province} |{" "}
                      {t.educationType}
                      {/* ✅ Show school class inline */}
                      {t.schoolClass && <> | Class: {t.schoolClass}</>}
                      {" "}| Status: {t.status}
                      {t.favouriteSubjects && (
                        <> | Favourite Subjects: {t.favouriteSubjects.join(", ")}</>
                      )}
                      {t.weakSubjects && (
                        <> | Weak Subjects: {t.weakSubjects.join(", ")}</>
                      )}
                      {t.hobbies && <> | Hobbies: {t.hobbies.join(", ")}</>}
                      {t.fieldsOfInterest && (
                        <> | Fields of Interest: {t.fieldsOfInterest.join(", ")}</>
                      )}
                      {t.parentalExpectation && (
                        <> | Parental Expectation: {t.parentalExpectation}</>
                      )}
                      {t.budgetRange && <> | Budget: {t.budgetRange}</>}
                    </span>
                    <button
                      onClick={() => setSelectedTest(t)}
                      className="text-sm text-blue-600 hover:underline cursor-pointer duration-300"
                    >
                      See More Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">No test form data yet.</p>
            )}
          </div>
        )}

        {/* Contact Data */}
        {activeTab === "contact" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
              Contact Form Data
            </h2>
            {loadingContacts ? (
              <p className="text-black">Loading...</p>
            ) : contacts.length > 0 ? (
              <ul className="space-y-2">
                {contacts.map((c, i) => (
                  <li
                    key={c._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded bg-gray-50 shadow-sm"
                  >
                    <span className="w-full sm:w-8 font-bold text-gray-600">
                      {i + 1}.
                    </span>
                    <span className="flex-1 text-sm sm:text-base text-black">
                      <span className="font-semibold">
                        {c.firstName} {c.lastName}
                      </span>{" "}
                      | {c.email}
                    </span>
                    <button
                      onClick={() => setSelectedContact(c)}
                      className="text-sm text-blue-600 hover:underline cursor-pointer duration-300"
                    >
                      See More Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">No contacts yet.</p>
            )}
          </div>
        )}

        {/* ✅ Manage User */}
        {activeTab === "manage" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
              Manage Users
            </h2>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <select
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
                className="border rounded px-3 py-2 text-black"
              >
                <option value="fullName">Name</option>
                <option value="email">Email</option>
                <option value="gender">Gender</option>
                <option value="maritalStatus">Marital Status</option>
                <option value="countryCode">Country Code</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="city">City</option>
                <option value="province">Province</option>
                <option value="educationType">Education</option>
                <option value="schoolClass">School Class</option>
                <option value="favouriteSubjects">Favourite Subjects</option>
                <option value="weakSubjects">Weak Subjects</option>
                <option value="hobbies">Hobbies</option>
                <option value="fieldsOfInterest">Fields of Interest</option>
                <option value="parentalExpectation">Parental Expectation</option>
                <option value="budgetRange">Budget Range</option>
              </select>

              <input
                type="text"
                placeholder="Enter value..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="border rounded px-3 py-2 flex-1 text-black"
              />

              <button
                onClick={handleSearch}
                className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-4 py-2 rounded cursor-pointer duration-300"
              >
                Search
              </button>
            </div>

            {loadingUsers ? (
              <p className="text-black">Loading...</p>
            ) : errorMsg ? (
              <p className="text-red-600">{errorMsg}</p>
            ) : filteredUsers.length > 0 ? (
              <ul className="space-y-2">
                {filteredUsers.map((u, i) => (
                  <li
                    key={u._id}
                    className="p-3 border rounded bg-gray-50 shadow-sm text-black text-sm"
                  >
                    <span className="font-bold">{i + 1}.</span>{" "}
                    <span className="font-semibold">{u.fullName}</span> |{" "}
                    {u.email} | {u.gender} | {u.maritalStatus} | {u.countryCode}{" "}
                    {u.phoneNumber} | {u.city}, {u.province} | {u.educationType}
                    {u.schoolClass && <> | Class: {u.schoolClass}</>}
                    {u.favouriteSubjects && (
                      <> | Favourite: {u.favouriteSubjects.join(", ")}</>
                    )}
                    {u.weakSubjects && (
                      <> | Weak: {u.weakSubjects.join(", ")}</>
                    )}
                    {u.hobbies && <> | Hobbies: {u.hobbies.join(", ")}</>}
                    {u.fieldsOfInterest && (
                      <> | Interests: {u.fieldsOfInterest.join(", ")}</>
                    )}
                    {u.parentalExpectation && (
                      <> | Expectation: {u.parentalExpectation}</>
                    )}
                    {u.budgetRange && <> | Budget: {u.budgetRange}</>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">No users available.</p>
            )}
          </div>
        )}

        {/* ✅ NEW: School Tab */}
        {activeTab === "school" && renderUserList(schoolUsers, "School Users")}

        {/* ✅ NEW: College Tab */}
        {activeTab === "college" && renderUserList(collegeUsers, "College Users")}

        {/* ✅ NEW: University Tab */}
        {activeTab === "university" && renderUserList(universityUsers, "University Users")}
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
                <b>Phone:</b> {selectedTest.countryCode}{" "}
                {selectedTest.phoneNumber}
              </p>
              <p className="text-black">
                <b>City:</b> {selectedTest.city}, {selectedTest.province}
              </p>
              <p className="text-black">
                <b>Education:</b> {selectedTest.educationType}
              </p>
              {/* ✅ School Class field */}
              {selectedTest.schoolClass && (
                <p className="text-black">
                  <b>School Class:</b> {selectedTest.schoolClass}
                </p>
              )}
              {/* ✅ New fields */}
              {selectedTest.favouriteSubjects && (
                <p className="text-black">
                  <b>Favourite Subjects:</b>{" "}
                  {selectedTest.favouriteSubjects.join(", ")}
                </p>
              )}
              {selectedTest.weakSubjects && (
                <p className="text-black">
                  <b>Weak Subjects:</b>{" "}
                  {selectedTest.weakSubjects.join(", ")}
                </p>
              )}
              {selectedTest.hobbies && (
                <p className="text-black">
                  <b>Hobbies:</b> {selectedTest.hobbies.join(", ")}
                </p>
              )}
              {selectedTest.fieldsOfInterest && (
                <p className="text-black">
                  <b>Fields of Interest:</b>{" "}
                  {selectedTest.fieldsOfInterest.join(", ")}
                </p>
              )}
              {selectedTest.parentalExpectation && (
                <p className="text-black">
                  <b>Parental Expectation:</b>{" "}
                  {selectedTest.parentalExpectation}
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

            {/* Proof + Approve / Reject */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">
                Payment Proof
              </h3>
              {selectedTest.screenshotUrl ? (
                <img
                  src={selectedTest.screenshotUrl}
                  alt="Proof"
                  className="w-full max-h-[350px] sm:h-[450px] object-contain rounded border"
                />
              ) : selectedTest.tid ? (
                <p className="text-black">
                  <b>TID:</b> {selectedTest.tid}
                </p>
              ) : (
                <p className="text-red-600">Not uploaded yet</p>
              )}

              {/* ✅ Approve/Reject buttons */}
              {selectedTest.status === "pending" && (
                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:space-x-3">
                  <button
                    onClick={() => handleApprove(selectedTest.email)}
                    className="bg-green-600 text-white px-4 py-2 cursor-pointer duration-300 rounded-lg hover:bg-green-700"
                  >
                    Approve & Start Test
                  </button>
                  <button
                    onClick={() => handleReject(selectedTest.email)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer duration-300 hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
              {selectedTest.status === "approved" && (
                <p className="mt-4 text-green-700 font-semibold">
                  ✅ Approved — User can now start the test
                </p>
              )}
              {selectedTest.status === "rejected" && (
                <p className="mt-4 text-red-700 font-semibold">
                  ❌ Rejected — User cannot take the test
                </p>
              )}
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
              <b>Name:</b> {selectedContact.firstName} {selectedContact.lastName}
            </p>
            <p className="text-black">
              <b>Email:</b> {selectedContact.email}
            </p>
            <p className="text-black">
              <b>Phone:</b> {selectedContact.phoneNumber}
            </p>
            <p className="text-black">
              <b>Marital Status:</b> {selectedContact.maritalStatus}
            </p>
            <p className="text-black">
              <b>Subject:</b> {selectedContact.subject}
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
