'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const PaymentProofPopup = ({ isOpen, onClose, userEmail }) => {
  const [step, setStep] = useState(1); // 1=choose, 2=screenshot, 3=tid
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [tid, setTid] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const widgetRef = useRef(null);
  const router = useRouter();

  // ✅ On mount → check if already submitted
  useEffect(() => {
    if (!isOpen || !userEmail) return;

    const checkProofStatus = async () => {
      try {
        const res = await fetch(`/api/proofsend/status?email=${userEmail}`);
        const data = await res.json();

        if (res.ok && data?.submitted) {
          // Already submitted → redirect
          onClose && onClose();
          router.push('/start_test');
        }
      } catch (err) {
        console.error('Failed to check proof status', err);
      }
    };

    checkProofStatus();
  }, [isOpen, userEmail, router, onClose]);

  // ✅ Load Cloudinary widget script once
  useEffect(() => {
    if (!isOpen) return;
    const existing = document.getElementById('cloudinary-widget-js');
    if (existing) return;

    const script = document.createElement('script');
    script.id = 'cloudinary-widget-js';
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, [isOpen]);

  // ✅ Open widget
  const openCloudinaryWidget = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!window.cloudinary) {
      alert('Upload widget not ready yet. Please try again in a moment.');
      return;
    }
    if (!cloudName || !uploadPreset) {
      alert('Cloudinary env vars are missing.');
      return;
    }

    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          multiple: false,
          maxFiles: 1,
          sources: ['local', 'camera', 'url', 'google_drive', 'dropbox'],
          cropping: false,
          folder: 'proofs',
          clientAllowedFormats: ['image', 'jpg', 'jpeg', 'png', 'webp'],
          theme: 'minimal',
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            setScreenshotUrl(result.info.secure_url || '');
          } else if (error) {
            console.error('Cloudinary widget error:', error);
          }
        }
      );
    }
    widgetRef.current && widgetRef.current.open();
  };

  if (!isOpen) return null;

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      alert('No user. Please login again.');
      return;
    }

    if (step === 2 && !screenshotUrl) {
      alert('Please upload a screenshot.');
      return;
    }
    if (step === 3 && !tid.trim()) {
      alert('Please enter a TID number.');
      return;
    }

    setSubmitting(true);

    try {
      const method = step === 2 ? 'screenshot' : 'tid';
      const res = await fetch('/api/proofsend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          method,
          screenshotUrl: method === 'screenshot' ? screenshotUrl : undefined,
          tid: method === 'tid' ? tid.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        handleClose();
        router.push('/start_test');
        return;
      }

      if (res.status === 409) {
        alert('Proof already submitted. Redirecting to test…');
        handleClose();
        router.push('/start_test');
        return;
      }

      throw new Error(data?.message || 'Failed to submit proof');
    } catch (err) {
      alert(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Reset + close
  const handleClose = () => {
    setStep(1);
    setScreenshotUrl('');
    setTid('');
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>

        {/* STEP 1: Choose method */}
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

        {/* STEP 2: Screenshot */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-[#14442E] mb-4 text-center">
              Upload Screenshot
            </h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="bg-[#14442E] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0f3a26] transition cursor-pointer"
              >
                Open Cloudinary Upload Widget
              </button>

              {screenshotUrl ? (
                <div className="text-xs text-green-700 break-all">
                  Selected: <span className="underline">{screenshotUrl}</span>
                </div>
              ) : (
                <div className="text-xs text-gray-500">No file uploaded yet.</div>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:underline text-sm"
                disabled={submitting}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                {submitting ? 'Submitting…' : 'Submit Proof'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: TID */}
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
                disabled={submitting}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                {submitting ? 'Submitting…' : 'Submit Proof'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentProofPopup;
