'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import resultsData from '../data/results.json';

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const [plan, setPlan] = useState('standard'); // default
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

  return (
    <div className="pt-10 p-8 bg-gray-100 text-black shadow-md">
      <div className="max-w-4xl mx-auto">
        {/* Title + Welcome */}
        <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
        <p className="text-lg mb-6">{result.welcomeMessage}</p>

        {/* Standard Sections */}
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
        </div>

        {/* Premium-only sections (unchanged) */}
        {plan === 'premium' && (
          <div className="mt-10 border-t pt-6 space-y-6">
            {/* Scholarships */}
            {result.scholarships && (
              <section>
                <h3 className="text-xl font-semibold mb-3">Scholarships</h3>
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
              </section>
            )}
            {/* Career Road Maps */}
            {result.careerRoadMaps?.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-3">Career Road Maps</h3>
                {result.careerRoadMaps.map((c, i) => (
                  <div key={i} className="mb-3">
                    <h4 className="font-semibold">{c.field}</h4>
                    <ol className="list-decimal list-inside ml-4">
                      {(c.steps || []).map((step, j) => <li key={j}>{step}</li>)}
                    </ol>
                  </div>
                ))}
              </section>
            )}
            {/* Premium Insights */}
            {result.premiumInsights?.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-2">Premium Insights</h3>
                <ul className="list-disc list-inside">
                  {result.premiumInsights.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
