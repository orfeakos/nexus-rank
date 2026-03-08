use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (wallet.trim()) {
      router.push(`/flex/${wallet.trim()}`);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="text-6xl mb-4">💎</div>
        <h1 className="text-white text-5xl font-bold mb-2">NEXUS</h1>
        <p className="text-gray-400 mb-8">Check your holder rank</p>
        
        <div className="bg-white/5 rounded-2xl p-6">
          <input
            type="text"
            placeholder="Enter your Solana wallet address..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full bg-white/10 text-white rounded-xl p-4 mb-4 outline-none border border-white/20 focus:border-white/50"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black font-bold rounded-xl p-4 hover:bg-gray-200 transition"
          >
            Check My Rank 🚀
          </button>
        </div>
      </div>
    </main>
  );
}