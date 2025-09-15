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
      router.push('/result');
    } else {
      const latestResult = savedResults[savedResults.length - 1];

      // type and plan dono save karo localStorage me
      const mbtiType = typeof latestResult === 'string' ? latestResult : latestResult.type;
      const userPlan = latestResult.plan || 'standard';

      setPlan(userPlan);
      setResult(resultsData.find(r => r.type === mbtiType));
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="max-w-4xl mx-auto pt-10 p-8 bg-gray-100 text-black shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
      <p className="text-lg mb-6">{result.welcomeMessage}</p>

      {/* Meaning */}
      <h3 className="text-xl font-semibold mb-2">Meaning</h3>
      <ul className="list-disc ml-5 mb-6">
        {Object.entries(result.meaning).map(([key, value]) => (
          key !== 'summary' && <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <p className="mb-6"><strong>Summary:</strong> {result.meaning.summary}</p>

      {/* Lifestyle */}
      <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.lifestyle.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Strengths */}
      <h3 className="text-xl font-semibold mb-2">Strengths</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.strengths.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Weaknesses */}
      <h3 className="text-xl font-semibold mb-2">Weaknesses</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Success Meaning */}
      <h3 className="text-xl font-semibold mb-2">Success Meaning</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.successMeaning.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Strategies */}
      <h3 className="text-xl font-semibold mb-2">Strategies</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.strategies.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Problems */}
      <h3 className="text-xl font-semibold mb-2">Problems</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.problems.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Rules */}
      <h3 className="text-xl font-semibold mb-2">Rules</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.rules.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Careers */}
      <h3 className="text-xl font-semibold mb-2">Careers</h3>
      <ul className="list-disc ml-5 mb-6">
        {result.careers.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Premium Only Section */}
      {plan === 'premium' && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-2xl font-bold mb-6 text-blue-700">Premium Benefits</h3>

          {/* Scholarships */}
          {result.scholarships && (
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-2">Scholarships</h4>

              {/* Fully Funded */}
              {result.scholarships.fullyFunded?.length > 0 && (
                <>
                  <h5 className="font-semibold mt-2 mb-1">Fully Funded</h5>
                  <ul className="list-disc ml-5 mb-4">
                    {result.scholarships.fullyFunded.map((s, i) => (
                      <li key={i}>
                        <a href={s.link} target="_blank" className="text-blue-600 underline">{s.title}</a>  
                        {" "}({s.level}) – {s.coverage}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Partially Funded */}
              {result.scholarships.partiallyFunded?.length > 0 && (
                <>
                  <h5 className="font-semibold mt-2 mb-1">Partially Funded</h5>
                  <ul className="list-disc ml-5 mb-4">
                    {result.scholarships.partiallyFunded.map((s, i) => (
                      <li key={i}>
                        <a href={s.link} target="_blank" className="text-blue-600 underline">{s.title}</a>  
                        {" "}({s.level}) – {s.award}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Talent Based */}
              {result.scholarships.talentBased?.length > 0 && (
                <>
                  <h5 className="font-semibold mt-2 mb-1">Talent Based</h5>
                  <ul className="list-disc ml-5">
                    {result.scholarships.talentBased.map((s, i) => (
                      <li key={i}>
                        <a href={s.link || s.pdf} target="_blank" className="text-blue-600 underline">{s.title}</a>  
                        {" "}({s.category}) {s.award ? `– ${s.award}` : ""}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Career Road Maps */}
          {result.careerRoadMaps && result.careerRoadMaps.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold mb-2">Career Road Maps</h4>
              {result.careerRoadMaps.map((c, i) => (
                <div key={i} className="mb-4">
                  <h5 className="font-semibold">{c.field}</h5>
                  <ol className="list-decimal ml-5">
                    {c.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
