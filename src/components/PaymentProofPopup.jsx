"use client";

import { useEffect, useRef, useState } from "react";

const PaymentProofPopup = ({ isOpen, onClose, userEmail, onProofSubmitted }) => {
  const [tid, setTid] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  // ✅ Submit TID proof
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      alert("No user. Please login again.");
      return;
    }

    if (!tid.trim()) {
      alert("Please enter a TID number.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/proofsend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          method: "tid",
          tid: tid.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        // ✅ Reset state
        setTid("");
        
        // ✅ Call parent callback to open form popup
        if (onProofSubmitted) {
          onProofSubmitted();
        }

        return;
      }

      if (res.status === 409) {
        alert("⏳ Proof already submitted. Please wait for admin approval.");
        onClose();
        return;
      }

      throw new Error(data?.message || "Failed to submit proof");
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Main proof popup */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 cursor-pointer duration-300 text-gray-500 hover:text-gray-800 text-lg"
          >
            ✕
          </button>

          {/* TID Entry Form */}
          <form onSubmit={handleSubmit} className="text-gray-800 space-y-4">
            <h2 className="text-xl font-bold text-[#14442E] mb-4 text-center">
              Enter TID Number
            </h2>
            
            {/* ✅ Payment Details Section */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
              <h2 className="border-b text-[14px] font-semibold pb-2 mb-2 tracking-wide">
                Through Jazzcash, Easy Paisa and Bank Account
              </h2>
              <h3 className="font-semibold text-gray-800 mb-2 tracking-wide">
                Payment Details
              </h3>
              <p>
                <span className="font-medium">Bank Name:</span> MCB Bank <br />
                <span className="font-medium">Account Title:</span> APTITUDE COUUNSEL <br />
                <span className="font-medium">Account Number:</span> 1643710941010912
              </p>
            </div>

            <input
              type="text"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              placeholder="Enter TID number"
              className="w-full border rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-[#14442E] focus:border-[#14442E] transition-colors"
              required
            />
            
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#14442E] cursor-pointer duration-300 text-white px-6 py-3 rounded-lg hover:bg-[#0f3a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : "Submit Proof"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentProofPopup;
