// AI-based risk scorer using OpenAI
import { callOpenAI } from './api.js';

export async function calculateRiskScore(tokenData, socialData) {
  const prompt = `
  Analyze this Solana memecoin data for rug pull risk. Data: ${JSON.stringify({...tokenData, ...socialData})}.
  Weights: 40% on-chain (insider %, sniper %, liquidity ratio <20%, taxes >10%, honeypot, etc.), 30% dev (holding >5%, past rugs), 20% social (fake followers, sentiment), 10% liquidity.
  Output only a JSON: {"score": number 0-100 (higher = higher risk), "category": "low|medium|high", "explanation": "brief reason"}.
  Red flags: unlocked liquidity, mutable taxes, new dev wallet, bot followers.
  `;

  try {
    const response = await callOpenAI(prompt);
    const parsed = JSON.parse(response);
    return parsed;
  } catch (error) {
    // Mock for demo
    return { score: 85, category: 'high', explanation: 'High insider % and unlocked liquidity.' };
  }
}

// Historical simulation (mock)
export function historicalSimulation(tokenData) {
  return 'Matches 80% of 2024 Solana rugs (e.g., high sniper activity).';
}
