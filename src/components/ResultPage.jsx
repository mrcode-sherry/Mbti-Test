'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import resultsData from '../data/results.json';

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    if (!savedResults.length) {
      router.push('/test');
    } else {
      const latestResult = savedResults[savedResults.length - 1];
      setResult(resultsData.find(r => r.type === latestResult));
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
      <p className="text-lg mb-6">{result.welcomeMessage}</p>

      <h3 className="text-xl font-semibold mb-2">Meaning</h3>
      <ul className="list-disc ml-5 mb-6">
        {Object.entries(result.meaning).map(([key, value]) => (
          key !== 'summary' && <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <p className="mb-6"><strong>Summary:</strong> {result.meaning.summary}</p>

      <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
      <ul className="list-disc ml-5 mb-6">{result.lifestyle.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3 className="text-xl font-semibold mb-2">Strengths</h3>
      <ul className="list-disc ml-5 mb-6">{result.strengths.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3 className="text-xl font-semibold mb-2">Weaknesses</h3>
      <ul className="list-disc ml-5 mb-6">{result.weaknesses.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3 className="text-xl font-semibold mb-2">Careers</h3>
      <ul className="list-disc ml-5 mb-6">{result.careers.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
};

export default ResultPage;
