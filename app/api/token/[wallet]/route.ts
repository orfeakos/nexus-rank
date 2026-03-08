import { NextResponse } from 'next/server';

const TOKEN_MINT = 'HZKh1BVFNapR1cH4PSyyuw9jiCfGyHcfBUjfMTzGpump';
const HELIUS_KEY = '12001b46-fac6-45e4-9152-75160969c9f0';

export async function GET(
  request: Request,
  context: { params: Promise<{ wallet: string }> }
) {
  try {
    const { wallet } = await context.params;

    const response = await fetch(
      `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            wallet,
            { mint: TOKEN_MINT },
            { encoding: 'jsonParsed' }
          ]
        })
      }
    );

    const data = await response.json();
    const accounts = data?.result?.value || [];

    if (accounts.length === 0) {
      return NextResponse.json({ balance: 0, usdValue: 0, tier: 'None', percentile: 0 });
    }

    const amount = accounts[0].account.data.parsed.info.tokenAmount;
    const balance = parseFloat(amount.uiAmountString);

    let tier = 'Bronze';
    let percentile = 50;
    if (balance > 1000000) { tier = 'Platinum'; percentile = 1; }
    else if (balance > 100000) { tier = 'Gold'; percentile = 10; }
    else if (balance > 10000) { tier = 'Silver'; percentile = 25; }

    return NextResponse.json({ balance, usdValue: 0, tier, percentile });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}