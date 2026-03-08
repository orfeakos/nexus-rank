const TOKEN_MINT = 'HZKh1BVFNapR1cH4PSyyuw9jiCfGyHcfBUjfMTzGpump';
const HELIUS_KEY = '12001b46-fac6-45e4-9152-75160969c9f0';

const TIERS: Record<string, { color: string; emoji: string; label: string }> = {
  Platinum: { color: '#E5E4E2', emoji: '💎', label: 'PLATINUM' },
  Gold: { color: '#FFD700', emoji: '🥇', label: 'GOLD' },
  Silver: { color: '#C0C0C0', emoji: '🥈', label: 'SILVER' },
  Bronze: { color: '#CD7F32', emoji: '🥉', label: 'BRONZE' },
  None: { color: '#888', emoji: '👀', label: 'NO NEXUS' },
};

async function getTokenData(wallet: string) {
  try {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getTokenAccountsByOwner', params: [wallet, { mint: TOKEN_MINT }, { encoding: 'jsonParsed' }] })
    });
    const data = await response.json();
    const accounts = data?.result?.value || [];
    if (accounts.length === 0) return { balance: 0, usdValue: 0, tier: 'None', percentile: 0 };
    const balance = parseFloat(accounts[0].account.data.parsed.info.tokenAmount.uiAmountString);
    let tier = 'Bronze'; let percentile = 50;
    if (balance > 1000000) { tier = 'Platinum'; percentile = 1; }
    else if (balance > 100000) { tier = 'Gold'; percentile = 10; }
    else if (balance > 10000) { tier = 'Silver'; percentile = 25; }
    return { balance, usdValue: 0, tier, percentile };
  } catch { return { balance: 0, usdValue: 0, tier: 'None', percentile: 0 }; }
}

export default async function FlexPage({ params }: { params: Promise<{ wallet: string }> }) {
  const { wallet } = await params;
  const data = await getTokenData(wallet);
  const tier = TIERS[data.tier] || TIERS['None'];

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border-2 p-8 text-center" style={{ borderColor: tier.color, boxShadow: `0 0 40px ${tier.color}44` }}>
        <div className="text-6xl mb-4">{tier.emoji}</div>
        <h1 className="text-white text-4xl font-bold mb-1">NEXUS</h1>
        <div className="text-2xl font-bold mb-6" style={{ color: tier.color }}>{tier.label} HOLDER</div>
        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <div className="text-gray-400 text-sm mb-1">NEXUS Balance</div>
          <div className="text-white text-3xl font-bold">{data.balance?.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <div className="text-gray-400 text-sm mb-1">Top</div>
          <div className="text-white text-3xl font-bold">{data.percentile}% of holders</div>
        </div>
        <div className="text-gray-500 text-xs break-all mt-4">{wallet}</div>
        <a href="/" className="mt-6 block text-gray-400 text-sm hover:text-white">← Check another wallet</a>
      </div>
    </main>
  );
}