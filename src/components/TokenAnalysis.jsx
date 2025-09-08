import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTokenData, fetchSocialData } from '../services/api.js';
import { calculateRiskScore, historicalSimulation } from '../services/riskScorer.js';
import BubbleMap from './BubbleMap';

const TokenAnalysis = () => {
  const { tokenAddress } = useParams();
  const [data, setData] = useState(null);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const tokenData = await fetchTokenData(tokenAddress);
      const socialData = await fetchSocialData(tokenData.symbol);
      setData({ ...tokenData, ...socialData });

      const riskScore = await calculateRiskScore(tokenData, socialData);
      setRisk(riskScore);
      setLoading(false);
    };
    loadData();
  }, [tokenAddress]);

  if (loading) return <p>Loading analysis...</p>;

  const riskClass = risk?.category === 'high' ? 'high-risk' : risk?.category === 'medium' ? 'medium-risk' : 'low-risk';

  return (
    <div className="token-analysis">
      <h2>Token Risk Analysis: {data?.name} ({data?.symbol})</h2>
      <div className="risk-score-container">
        <p className={`risk-score ${riskClass}`}>Risk Score: {risk?.score}/100</p>
        <p>{risk?.explanation}</p>
        <p>{historicalSimulation(data)}</p>
      </div>
      <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="card">
          <h3>On-Chain Metrics</h3>
          <p>Insider %: {data.insiderPercentage}% {data.insiderPercentage > 20 ? '(High)' : ''}</p>
          <p>Sniper %: {data.sniperPercentage}% {data.sniperPercentage > 50 ? '(High)' : ''}</p>
          <p>Liquidity Locked: {data.liquidityLocked ? 'Yes' : 'No'} ({data.lockDuration})</p>
          <p>Liquidity/MC Ratio: {(data.liquidity / data.mc * 100).toFixed(2)}% { (data.liquidity / data.mc * 100) < 20 ? '(Low - Risky)' : ''}</p>
          <p>Buy/Sell Tax: {data.buyTax}% / {data.sellTax}% {data.buyTax > 10 ? '(High)' : ''}</p>
          <p>Honeypot: {data.honeypot ? 'Yes (Trap!)' : 'No'}</p>
          <p>Ownership Renounced: {data.ownershipRenounced ? 'Yes' : 'No'}</p>
          <p>Dev Holding: {data.devHolding}% {data.devHolding > 5 ? '(Risky)' : ''}</p>
        </div>
        <div className="card">
          <h3>Social & Off-Chain</h3>
          <p>X Followers: {data.xFollowers} (Engagement: {data.xEngagement}%)</p>
          <p>Telegram Members: {data.telegramMembers}</p>
          <p>Sentiment: {data.sentiment}</p>
          <p>Name Changes: {data.nameChanges} (Suspicious if >1)</p>
          <p>Influencer Shills: {data.influencerShills}</p>
        </div>
        <div className="card">
          <h3>Distribution Map</h3>
          <BubbleMap data={data} />
        </div>
      </div>
    </div>
  );
};

export default TokenAnalysis;
