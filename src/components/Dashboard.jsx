import React from 'react';

const Dashboard = () => {
  // Mock stats
  const stats = {
    tokensAnalyzed: 1247,
    highRisk: 89,
    activeAlerts: 12,
    watchlistItems: 1
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card">
          <h3>Tokens Analyzed</h3>
          <p className="low-risk">{stats.tokensAnalyzed}</p>
        </div>
        <div className="card">
          <h3>High Risk Detected</h3>
          <p className="high-risk">{stats.highRisk}</p>
        </div>
        <div className="card">
          <h3>Active Alerts</h3>
          <p className="medium-risk">{stats.activeAlerts}</p>
        </div>
        <div className="card">
          <h3>Watchlist Items</h3>
          <p className="low-risk">{stats.watchlistItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
