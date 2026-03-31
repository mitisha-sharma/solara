import { useState } from 'react';
import { mockAnalysisResults } from '../data/mockData';

export function useImageAnalysis() {
  const [status, setStatus]   = useState('idle'); // idle | uploading | analyzing | done | error
  const [result, setResult]   = useState(null);
  const [preview, setPreview] = useState(null);

  const analyze = (file) => {
    if (!file) return;

    // Generate preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
    setStatus('uploading');
    setResult(null);

    // Simulate upload delay
    setTimeout(() => {
      setStatus('analyzing');

      // Simulate AI analysis delay
      setTimeout(() => {
        // Randomly pick a mock result for demo purposes
        const results = Object.values(mockAnalysisResults);
        const random  = results[Math.floor(Math.random() * results.length)];
        setResult(random);
        setStatus('done');
      }, 2200);
    }, 1000);
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  return { status, result, preview, analyze, reset };
}