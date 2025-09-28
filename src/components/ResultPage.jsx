'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import resultsData from '../data/results.json';

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const [plan, setPlan] = useState('standard'); // default
  const [activeTab, setActiveTab] = useState('result'); // for premium tabs
  const router = useRouter();

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    if (!savedResults.length) {
      router.push('/'); // redirect if no results
      return;
    }

    const latestResult = savedResults[savedResults.length - 1];
    const mbtiType = typeof latestResult === 'string' ? latestResult : latestResult.type;
    setResult(resultsData.find(r => r.type === mbtiType) || null);

    // Fetch plan from backend
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
  }, [router]);

  if (!result) return null;

  // Standard result content (used in both standard and premium -> result tab)
  const renderResultContent = () => (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold mb-2">Meaning</h3>
        <ul className="list-disc list-inside">
          {Object.entries(result.meaning || {}).map(([k, v], idx) => (
            <li key={idx}><strong>{k}</strong>: {v}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
        <ul className="list-disc list-inside">
          {(result.lifestyle || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Strengths</h3>
        <ul className="list-disc list-inside">
          {(result.strengths || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Weaknesses</h3>
        <ul className="list-disc list-inside">
          {(result.weaknesses || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Success Meaning</h3>
        <ul className="list-disc list-inside">
          {(result.successMeaning || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Strategies</h3>
        <ul className="list-disc list-inside">
          {(result.strategies || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Problems</h3>
        <ul className="list-disc list-inside">
          {(result.problems || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Rules</h3>
        <ul className="list-disc list-inside">
          {(result.rules || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Careers</h3>
        <ul className="list-disc list-inside">
          {(result.careers || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      {/* Premium Insights (still inside result tab for premium users) */}
      {plan === 'premium' && result.premiumInsights?.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-2">Premium Insights</h3>
          <ul className="list-disc list-inside">
            {result.premiumInsights.map((p, idx) => <li key={idx}>{p}</li>)}
          </ul>
        </section>
      )}

      {/* ✅ Extra Premium Message at the End */}
      {plan === 'premium' && (
        <div className="bg-gray-200 border-l-4 border-gray-500 p-5 rounded-md mt-6">
          <h3 className="text-lg font-semibold mb-2">NOTE:</h3>
          <p className="text-md text-gray-700 mb-1">
            For custom roadmap please send your [ RESULT TYPE ] and [ TID number ] on our whatsapp.
          </p>
        </div>
      )}
    </div>
  );

  // Scholarships content (premium only)
  const renderScholarships = () => (
    <div className="space-y-6">
      {/* Added Policy Note at the top */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-5 rounded-md text-left">
        <h3 className="text-lg font-semibold mb-2">Our Policy Note for Scholarships</h3>
        <p className="text-sm text-gray-700 mb-2">
          Dear Students and Parents,
        </p>
        <p className="text-sm text-gray-700 mb-2">
          At Aptitude Counsel, we deeply care for your future and your trust in us. We share information about funded, partially funded, and talent-based scholarships only to guide you toward opportunities that may support your studies.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          Please be aware that these scholarships are not sponsored or provided by us. The final decision, process, and regulations are always under the jurisdiction of the pertinent universities or organizations. We recommend that you carefully read the official details and confirm all requirements with the scholarship giver immediately before submitting an application.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          We want to give you access to opportunities and awareness while advising you to use caution and knowledge. We hope your journey is prosperous, secure, and full of hope.
        </p>
        <p className="text-sm text-gray-700 font-semibold">
          With care and guidance,<br />
          Team Aptitude Counsel
        </p>
      </div>

      {result.scholarships && (
        <>
          {/* Fully Funded */}
          {result.scholarships.fullyFunded?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Fully Funded</h4>
              <ul className="list-disc list-inside">
                {result.scholarships.fullyFunded.map((s, i) => (
                  <li key={i}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {s.title}
                    </a>
                    {s.level ? ` (${s.level})` : ''} {s.coverage ? ` – ${s.coverage}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Partially Funded */}
          {result.scholarships.partiallyFunded?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Partially Funded</h4>
              <ul className="list-disc list-inside">
                {result.scholarships.partiallyFunded.map((s, i) => (
                  <li key={i}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {s.title}
                    </a>
                    {s.level ? ` (${s.level})` : ''} {s.award ? ` – ${s.award}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Talent Based */}
          {result.scholarships.talentBased?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Talent Based</h4>
              <ul className="list-disc list-inside">
                {result.scholarships.talentBased.map((s, i) => (
                  <li key={i}>
                    <a href={s.link || s.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {s.title}
                    </a>
                    {s.category ? ` (${s.category})` : ''} {s.award ? ` – ${s.award}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="pt-10 p-8 bg-gray-100 text-black shadow-md">
      <div className="max-w-4xl mx-auto">
        {/* Premium users: show tabs at the very top */}
        {plan === 'premium' && (
          <div className="flex space-x-4 border-b mb-6">
            <button
              onClick={() => setActiveTab('result')}
              className={`pb-2 ${activeTab === 'result' ? 'border-b-2 border-[#14442E] font-semibold' : 'text-gray-600'}`}
            >
              Result
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`pb-2 ${activeTab === 'scholarships' ? 'border-b-2 border-[#14442E] font-semibold' : 'text-gray-600'}`}
            >
              Scholarships
            </button>
          </div>
        )}

        {/* Title + Welcome */}
        <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
        <p className="text-lg mb-6">{result.welcomeMessage}</p>

        {/* Standard users: show only results */}
        {plan === 'standard' && renderResultContent()}

        {/* Premium users: switch between tabs */}
        {plan === 'premium' && (
          <>
            {activeTab === 'result' && renderResultContent()}
            {activeTab === 'scholarships' && renderScholarships()}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
