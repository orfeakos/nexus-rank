'use client';
import { useState } from 'react';

export default function Home() {
  const [wallet, setWallet] = useState('');

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
            className="w-full bg-white/10 text-white rounded-xl p-4 mb-4 outline-none border border-white/20"
          />
          <a href={`/flex/${wallet}`}>
            <button className="w-full bg-white text-black font-bold rounded-xl p-4">
              Check My Rank 🚀
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}