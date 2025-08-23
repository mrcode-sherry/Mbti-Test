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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition duration-200 text-xl"
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
                  const res = await fetch(`/api/screenshotfetch?email=${t.email}`);
                  if (res.ok) {
                    const proofData = await res.json();
                    return {
                      ...t,
                      screenshotUrl: proofData.data?.screenshotUrl || null,
                      tid: proofData.data?.tid || null,
                      status: proofData.data?.status || "pending",
                    };
                  }
                } catch {}
                return { ...t, screenshotUrl: null, tid: null, status: "pending" };
              })
            );
            setTests(enriched);
          }
        })
        .finally(() => setLoadingTests(false));
    }
  }, [activeTab]);

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
            t.email === email ? { ...t, status: "approved" } : t
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
            t.email === email ? { ...t, status: "rejected" } : t
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
            <p>Welcome, Admin! 🎉</p>
          </div>
        )}

        {/* Test Data */}
        {activeTab === "test" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Test Form Data</h2>
            {loadingTests ? (
              <p>Loading...</p>
            ) : tests.length > 0 ? (
              <ul className="space-y-2">
                {tests.map((t, i) => (
                  <li
                    key={t._id}
                    className="flex items-center justify-between p-3 border rounded bg-gray-50 shadow-sm"
                  >
                    <span className="w-8 font-bold text-gray-600">{i + 1}.</span>
                    <span className="flex-1">
                      <span className="font-semibold">{t.fullName}</span> |{" "}
                      <span className="text-gray-700">{t.email}</span> |{" "}
                      {t.screenshotUrl ? (
                        <span className="text-green-600 font-medium">Screenshot uploaded</span>
                      ) : t.tid ? (
                        <span className="text-blue-600 font-medium">TID: {t.tid}</span>
                      ) : (
                        <span className="text-red-600 font-medium">Not uploaded yet</span>
                      )}{" "}
                      | <span>Status: {t.status}</span>
                    </span>
                    <button
                      onClick={() => setSelectedTest(t)}
                      className="ml-4 text-sm text-blue-600 hover:underline"
                    >
                      See More Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No test form data yet.</p>
            )}
          </div>
        )}

        {/* Contact Data */}
        {activeTab === "contact" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Form Data</h2>
            {loadingContacts ? (
              <p>Loading...</p>
            ) : contacts.length > 0 ? (
              <ul className="space-y-2">
                {contacts.map((c, i) => (
                  <li
                    key={c._id}
                    className="flex items-center justify-between p-3 border rounded bg-gray-50 shadow-sm"
                  >
                    <span className="w-8 font-bold text-gray-600">{i + 1}.</span>
                    <span className="flex-1">
                      <span className="font-semibold">
                        {c.firstName} {c.lastName}
                      </span>{" "}
                      | <span className="text-gray-700">{c.email}</span>
                    </span>
                    <button
                      onClick={() => setSelectedContact(c)}
                      className="ml-4 text-sm text-blue-600 hover:underline"
                    >
                      See More Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contacts yet.</p>
            )}
          </div>
        )}
      </main>

      {/* Test Modal */}
      <Modal isOpen={!!selectedTest} onClose={() => setSelectedTest(null)}>
        {selectedTest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Details */}
            <div className="space-y-1">
              <h3 className="text-xl font-semibold mb-2">Test Details</h3>
              <p><b>Name:</b> {selectedTest.fullName}</p>
              <p><b>Email:</b> {selectedTest.email}</p>
              <p><b>Gender:</b> {selectedTest.gender}</p>
              <p><b>Marital Status:</b> {selectedTest.maritalStatus}</p>
              <p><b>Phone:</b> {selectedTest.countryCode} {selectedTest.phoneNumber}</p>
              <p><b>City:</b> {selectedTest.city}, {selectedTest.province}</p>
              <p><b>Education:</b> {selectedTest.educationType}</p>
              <p className="text-xs text-gray-500">
                Submitted {new Date(selectedTest.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Proof + Approve / Reject */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment Proof</h3>
              {selectedTest.screenshotUrl ? (
                <img
                  src={selectedTest.screenshotUrl}
                  alt="Proof"
                  className="max-w-full rounded border h-[450px]"
                />
              ) : selectedTest.tid ? (
                <p><b>TID:</b> {selectedTest.tid}</p>
              ) : (
                <p className="text-red-600">Not uploaded yet</p>
              )}

              {/* ✅ Approve/Reject buttons */}
              {selectedTest.status === "pending" && (
                <div className="mt-4 space-x-3">
                  <button
                    onClick={() => handleApprove(selectedTest.email)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Approve & Start Test
                  </button>
                  <button
                    onClick={() => handleReject(selectedTest.email)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
              {selectedTest.status === "approved" && (
                <p className="mt-4 text-green-700 font-semibold">
                  ✅ Already approved
                </p>
              )}
              {selectedTest.status === "rejected" && (
                <p className="mt-4 text-red-700 font-semibold">
                  ❌ Rejected
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={!!selectedContact} onClose={() => setSelectedContact(null)}>
        {selectedContact && (
          <div className="space-y-1">
            <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
            <p><b>Name:</b> {selectedContact.firstName} {selectedContact.lastName}</p>
            <p><b>Email:</b> {selectedContact.email}</p>
            <p><b>Phone:</b> {selectedContact.phoneNumber}</p>
            <p><b>Marital Status:</b> {selectedContact.maritalStatus}</p>
            <p><b>Subject:</b> {selectedContact.subject}</p>
            <p><b>Message:</b> {selectedContact.message}</p>
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
