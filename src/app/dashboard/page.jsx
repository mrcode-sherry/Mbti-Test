"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("welcome");

  // Contact state
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Test state
  const [tests, setTests] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/admin");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/admin");
  };

  // Fetch contact messages
  useEffect(() => {
    if (activeTab === "contact") {
      setLoadingContacts(true);
      fetch("/api/showcontact")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setContacts(data.data);
          }
        })
        .catch((err) => console.error("Fetch contacts failed:", err))
        .finally(() => setLoadingContacts(false));
    }
  }, [activeTab]);

  // Fetch test form data
  useEffect(() => {
    if (activeTab === "test") {
      setLoadingTests(true);
      fetch("/api/showtest")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTests(data.data);
          }
        })
        .catch((err) => console.error("Fetch tests failed:", err))
        .finally(() => setLoadingTests(false));
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B5A3D] text-white p-6 space-y-2">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <button
          className={`block w-full text-left px-4 py-2 rounded cursor-pointer ${
            activeTab === "test" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("test")}
        >
          Test Form Data
        </button>

        <button
          className={`block w-full text-left px-4 py-2 rounded cursor-pointer ${
            activeTab === "contact" ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Form Data
        </button>

        <button
          className="block w-full text-center px-4 py-2 mt-5 rounded bg-red-600 cursor-pointer hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "welcome" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <p>Welcome, Admin! 🎉 You now have access to the dashboard.</p>
          </div>
        )}

        {activeTab === "test" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Test Form Data</h2>

            {loadingTests ? (
              <p className="text-gray-600">Loading test data...</p>
            ) : tests.length > 0 ? (
              <ul className="space-y-4">
                {tests.map((t) => (
                  <li
                    key={t._id}
                    className="p-4 border rounded bg-gray-50 shadow-sm"
                  >
                    <p className="font-semibold">
                      {t.fullName} ({t.gender}, {t.maritalStatus})
                    </p>
                    <p className="text-gray-700">
                      📞 {t.countryCode} {t.phoneNumber}
                    </p>
                    <p className="text-gray-700">
                      🏙️ {t.city}, {t.province}
                    </p>
                    <p className="text-gray-700">🎓 {t.educationType}</p>

                    {/* Education details */}
                    {t.educationType === "school" && (
                      <p className="text-gray-700">
                        Status: {t.schoolStatus}, Institute: {t.schoolInstitute}
                      </p>
                    )}
                    {t.educationType === "college" && (
                      <p className="text-gray-700">
                        Year: {t.collegeYear}, Degree: {t.collegeDegree}, Institute:{" "}
                        {t.collegeInstitute}
                      </p>
                    )}
                    {t.educationType === "university" && (
                      <p className="text-gray-700">
                        Semester: {t.universitySemester}, Degree:{" "}
                        {t.universityDegree}, Institute: {t.universityInstitute}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-1">
                      Submitted on {new Date(t.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No test form data yet.</p>
            )}
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Form Data</h2>

            {loadingContacts ? (
              <p className="text-gray-600">Loading contacts...</p>
            ) : contacts.length > 0 ? (
              <ul className="space-y-4">
                {contacts.map((c) => (
                  <li
                    key={c._id}
                    className="p-4 border rounded bg-gray-50 shadow-sm"
                  >
                    <p className="font-semibold">
                      {c.firstName} {c.lastName} ({c.maritalStatus})
                    </p>
                    <p className="text-gray-700">📧 {c.email}</p>
                    <p className="text-gray-700">📞 {c.phoneNumber}</p>
                    <p className="text-gray-700">📝 {c.subject}</p>
                    <p className="italic">"{c.message}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted on {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No contact messages yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
