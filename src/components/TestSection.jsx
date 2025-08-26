'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TestSection = ({ userEmail }) => {
  const [status, setStatus] = useState("idle"); 
  // idle = no proof
  // pending = proof submitted, waiting
  // approved = proof approved, test not started
  // completed = test finished
  const router = useRouter();

  // ✅ Fetch status from backend
  useEffect(() => {
    if (!userEmail) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `/api/screenshotfetch?email=${encodeURIComponent(userEmail)}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const proofData = await res.json();

        if (proofData.success && proofData.data) {
          const proof = proofData.data;

          if (proof.status === "pending") {
            setStatus("pending");
            return;
          }

          if (proof.status === "approved") {
            const testRes = await fetch(
              `/api/testSubmission/check?email=${encodeURIComponent(userEmail)}`,
              { cache: "no-store" }
            );
            const testData = await testRes.json();
            if (testData.completed) {
              setStatus("completed");
            } else {
              setStatus("approved");
            }
            return;
          }

          if (proof.status === "rejected") {
            setStatus("idle"); // allow resubmit
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching status:", err);
      }
    };

    fetchStatus();
  }, [userEmail]);

  // ✅ Handle proof submission
  const handleProofSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) return;

    const formData = new FormData(e.target);
    formData.append("email", userEmail);

    try {
      await fetch("/api/screenshot", {
        method: "POST",
        body: formData,
      });

      // ✅ Immediately show pending state
      setStatus("pending");

      // ✅ Auto-refresh proof status every 2 seconds until it's approved or rejected
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/screenshotfetch?email=${encodeURIComponent(userEmail)}`, { cache: "no-store" });
          if (!res.ok) return;
          const proofData = await res.json();
          if (proofData.success && proofData.data) {
            const proof = proofData.data;
            if (proof.status !== "pending") {
              setStatus(proof.status);
              clearInterval(interval); // stop polling once status changes
            }
          }
        } catch (err) {
          console.error(err);
        }
      }, 2000);

    } catch (err) {
      console.error("Error submitting proof:", err);
    }
  };

  const handleStartTest = () => {
    router.push("/start_test");
  };

  const handleViewResult = () => {
    router.push("/result");
  };

  return (
    <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto">
      {/* Upload Proof */}
      {status === "idle" && (
        <form onSubmit={handleProofSubmit} className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Submit Payment Proof
          </h2>
          <input
            type="file"
            name="screenshot"
            required
            className="block w-full border p-2 rounded"
          />
          <input
            type="text"
            name="tid"
            placeholder="Enter Transaction ID"
            required
            className="block w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-[#14442E] text-white px-4 py-2 rounded-lg hover:bg-[#0f3a26]"
          >
            Submit Proof
          </button>
        </form>
      )}

      {/* Waiting for approval */}
      {status === "pending" && (
        <div className="text-center text-yellow-600 font-medium">
          ⏳ Proof submitted. Waiting for admin approval…
        </div>
      )}

      {/* Approved → Start Test */}
      {status === "approved" && (
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Start Test
          </button>
        </div>
      )}

      {/* Completed → View Result */}
      {status === "completed" && (
        <div className="text-center">
          <button
            onClick={handleViewResult}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            View Result
          </button>
        </div>
      )}
    </div>
  );
};

export default TestSection;
