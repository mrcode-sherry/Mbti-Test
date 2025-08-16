'use client';

import { useState } from 'react';

const PaymentProofPopup = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // Step 1 = choose option, Step 2 = form
  const [screenshot, setScreenshot] = useState(null);
  const [tid, setTid] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 2 && !screenshot && !tid) {
      alert('Please upload a screenshot OR enter a TID number.');
      return;
    }

    console.log("Submitted Proof:", { screenshot, tid });
    alert("Proof submitted successfully (not saved to DB yet).");
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setScreenshot(null);
    setTid('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-[#14442E] mb-6 text-center">
              Select Payment Proof Option
            </h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setStep(2)}
                className="bg-[#14442E] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#0f3a26] transition cursor-pointer"
              >
                Upload Screenshot
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-[#14442E] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#0f3a26] transition cursor-pointer"
              >
                Enter TID Number
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-[#14442E] mb-4 text-center">
              Upload Screenshot
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:underline text-sm"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Submit Proof
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-[#14442E] mb-4 text-center">
              Enter TID Number
            </h2>
            <input
              type="text"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              placeholder="Enter TID number"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:underline text-sm"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Submit Proof
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentProofPopup;
