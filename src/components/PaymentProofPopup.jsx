"use client";

import { useEffect, useRef, useState } from "react";

const PaymentProofPopup = ({ isOpen, onClose, userEmail }) => {
  const [step, setStep] = useState(1); // 1=choose, 2=screenshot, 3=tid
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [tid, setTid] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false); // ✅ separate popup state
  const widgetRef = useRef(null);

  // ✅ Load Cloudinary widget
  useEffect(() => {
    if (!isOpen) return;
    const existing = document.getElementById("cloudinary-widget-js");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "cloudinary-widget-js";
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, [isOpen]);

  const openCloudinaryWidget = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!window.cloudinary) {
      alert("Upload widget not ready yet. Please try again in a moment.");
      return;
    }
    if (!cloudName || !uploadPreset) {
      alert("Cloudinary env vars are missing.");
      return;
    }

    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          multiple: false,
          maxFiles: 1,
          sources: ["local", "camera", "url", "google_drive", "dropbox"],
          folder: "proofs",
          theme: "minimal",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setScreenshotUrl(result.info.secure_url || "");
          }
        }
      );
    }
    widgetRef.current && widgetRef.current.open();
  };

  if (!isOpen) return null;

  // ✅ Submit proof
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      alert("No user. Please login again.");
      return;
    }

    if (step === 2 && !screenshotUrl) {
      alert("Please upload a screenshot.");
      return;
    }
    if (step === 3 && !tid.trim()) {
      alert("Please enter a TID number.");
      return;
    }

    setSubmitting(true);

    try {
      const method = step === 2 ? "screenshot" : "tid";
      const res = await fetch("/api/proofsend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          method,
          screenshotUrl: method === "screenshot" ? screenshotUrl : undefined,
          tid: method === "tid" ? tid.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        // ✅ Close form popup and open success popup
        setStep(1);
        setScreenshotUrl("");
        setTid("");
        onClose();
        setSuccessPopup(true);
        return;
      }

      if (res.status === 409) {
        alert("⏳ Proof already submitted. Please wait for admin approval.");
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


          {/* STEP 1: Choose method */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-[#14442E] mb-6 text-center">
                Select Payment Proof Option
              </h2>
              {/* ✅ Payment Details Section */}
          <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
            <p>
              <span className="font-medium">Bank Name:</span> MCB Bank <br />
              <span className="font-medium">Account Title:</span> APTITUDE COUUNSEL <br />
              <span className="font-medium">Account Number:</span> 1643710941010912
            </p>
            <div className="mt-3 border-t pt-2">
              <p>
                <span className="font-medium">JazzCash Title:</span> APTITUDE COUUNSEL <br />
                <span className="font-medium">JazzCash Number:</span> 03002116856
              </p>
            </div>
          </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-5 py-3 rounded-lg"
                >
                  Upload Screenshot
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-5 py-3 rounded-lg"
                >
                  Enter TID Number
                </button>
              </div>
            </>
          )}

          {/* STEP 2: Screenshot */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-[#14442E] mb-4 text-center">
                Upload Screenshot
              </h2>
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="bg-[#14442E] cursor-pointer duration-300 text-white px-4 py-2 rounded-lg"
              >
                Select From Gallery
              </button>
              {screenshotUrl && (
                <div className="text-xs text-green-700 break-all">
                  Selected: {screenshotUrl}
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-600 cursor-pointer duration-300 hover:underline text-sm"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-5 py-2 rounded-lg"
                >
                  {submitting ? "Submitting…" : "Submit Proof"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: TID */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="text-gray-800 space-y-4">
              <h2 className="text-xl font-bold text-[#14442E] mb-4 text-center">
                Enter TID Number
              </h2>
              <input
                type="text"
                value={tid}
                onChange={(e) => setTid(e.target.value)}
                placeholder="Enter TID number"
                className="w-full border rounded-lg p-2 text-gray-800"
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-600 cursor-pointer duration-300 hover:underline text-sm"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-5 py-2 rounded-lg"
                >
                  {submitting ? "Submitting…" : "Submit Proof"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ✅ Success Popup */}
      {successPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center relative">
            <button
              onClick={() => setSuccessPopup(false)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer duration-300 hover:text-gray-800 text-lg"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-green-700 mb-4">
              ✅ Proof submitted successfully!
            </h2>
            <p className="text-gray-700 text-sm mb-6">
              Please wait up to 24 hours for admin approval.  
              If not approved in time, please{" "}
              <a href="/contact" className="text-blue-600 underline">
                contact us
              </a>.
            </p>
            <button
              onClick={() => setSuccessPopup(false)}
              className="bg-[#14442E] cursor-pointer duration-300 text-white px-5 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentProofPopup;
