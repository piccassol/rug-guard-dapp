// API service for Birdeye, OpenAI, etc. Use axios for calls.
import axios from 'axios';

const BIRDEYE_BASE = 'https://public-api.birdeye.so';
const OPENAI_BASE = 'https://api.openai.com/v1';

// Birdeye API calls (example for token info)
export async function fetchTokenData(tokenAddress) {
  try {
    const response = await axios.get(`${BIRDEYE_BASE}/defi/token_overview`, {
      params: { address: tokenAddress },
      headers: { 'X-API-KEY': import.meta.env.VITE_BIRDEYE_API_KEY, 'x-chain': 'solana' }
    });
    return response.data.data; // e.g., price, liquidity, holders
  } catch (error) {
    console.error('Birdeye API error:', error);
    return mockTokenData(tokenAddress); // Fallback mock for demo
  }
}

// Mock data for demo
function mockTokenData(address) {
  return {
    address,
    name: 'SafeMoon Clone',
    symbol: 'SAFEC',
    price: 0.000045,
    mc: 25000000,
    liquidity: 500000,
    holders: 1250,
    insiderPercentage: 25, // >20% red flag
    sniperPercentage: 60,
    liquidityLocked: false,
    lockDuration: '1 month',
    buyTax: 15,
    sellTax: 15,
    devHolding: 8,
    burned: 10,
    honeypot: false,
    ownershipRenounced: true
  };
}

// OpenAI for sentiment/risk (call from riskScorer)
export async function callOpenAI(prompt) {
  try {
    const response = await axios.post(OPENAI_BASE + '/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: { 'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` }
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'Mock risk score: 75'; // Demo fallback
  }
}

// Mock social data (replace with real X/Telegram API)
export async function fetchSocialData(tokenSymbol) {
  // For real: Use Twitter API v2 for search, Telegram for channel stats
  return {
    xFollowers: 5000,
    xEngagement: 5, // %
    telegramMembers: 10000,
    sentiment: 'positive', // From NLP
    nameChanges: 2,
    influencerShills: 3
  };
}
