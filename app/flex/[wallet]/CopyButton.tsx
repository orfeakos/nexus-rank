'use client';
import { useState } from 'react';

export default function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full bg-white text-black font-bold rounded-xl p-4 hover:bg-gray-200 transition"
    >
      {copied ? '✅ Copied!' : '🔗 Copy My Rank Link'}
    </button>
  );
}