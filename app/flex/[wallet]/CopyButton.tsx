'use client';
import { useState } from 'react';

export default function CopyButton({ url, wallet }: { url: string; wallet: string }) {
  const [copied, setCopied] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(wallet);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  return (
    <>
      <button onClick={handleCopy} className="w-full bg-white text-black font-bold rounded-xl p-4 hover:bg-gray-200 transition">
        {copied ? '✅ Copied!' : '🔗 Copy My Rank Link'}
      </button>
      <button onClick={handleCopyWallet} className="block w-full mt-3 bg-purple-600 text-white font-bold rounded-xl p-4 hover:bg-purple-700 transition">
        {copiedWallet ? '✅ Address Copied! Open Phantom to send' : '💸 Send NEXUS'}
      </button>
    </>
  );
}