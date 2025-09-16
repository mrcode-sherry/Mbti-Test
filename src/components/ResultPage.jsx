'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import resultsData from '../data/results.json';
import jsPDF from 'jspdf';

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const [plan, setPlan] = useState('standard'); // default
  const router = useRouter();

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    if (!savedResults.length) {
      router.push('/'); // redirect if no results
    } else {
      const latestResult = savedResults[savedResults.length - 1];
      const mbtiType =
        typeof latestResult === 'string' ? latestResult : latestResult.type;
      setResult(resultsData.find(r => r.type === mbtiType));

      // 🔑 Fetch actual plan from backend
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser?.email) {
        fetch(`/api/getplan?email=${encodeURIComponent(storedUser.email)}`)
          .then(res => {
            if (!res.ok) throw new Error(`API error: ${res.status}`);
            return res.json();
          })
          .then(data => {
            if (data.plan) {
              setPlan(data.plan);
            }
          })
          .catch(err => console.error('Error fetching plan:', err));
      }
    }
  }, [router]);

  if (!result) return null;

  // ✅ Download handler (only standard sections)
  const handleDownload = () => {
    const doc = new jsPDF();
    let y = 10;

    const addText = (title, textArray) => {
      doc.setFontSize(14);
      doc.text(title, 10, y);
      y += 8;
      doc.setFontSize(12);
      textArray.forEach(item => {
        doc.text(`- ${item}`, 12, y);
        y += 7;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });
      y += 5;
    };

    doc.setFontSize(18);
    doc.text(result.title, 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(result.welcomeMessage, 10, y);
    y += 10;

    // Standard sections only
    addText("Meaning", Object.entries(result.meaning).map(([k,v]) => `${k}: ${v}`));
    addText("Lifestyle", result.lifestyle);
    addText("Strengths", result.strengths);
    addText("Weaknesses", result.weaknesses);
    addText("Success Meaning", result.successMeaning);
    addText("Strategies", result.strategies);
    addText("Problems", result.problems);
    addText("Rules", result.rules);
    addText("Careers", result.careers);

    doc.save(`${result.title}_Standard_Result.pdf`);
  };

  return (
    <div className="pt-10 p-8 bg-gray-100 text-black shadow-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
        <p className="text-lg mb-6">{result.welcomeMessage}</p>

        {/* Standard Sections (same as before) */}
        {/* ... tumhara sara existing code ... */}

        {/* Premium Only Section */}
        {plan === 'premium' && (
          <div className="mt-10 border-t pt-6">
            {/* ... tumhara existing premium code ... */}
          </div>
        )}

        {/* ✅ Download Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Download Standard Result (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
