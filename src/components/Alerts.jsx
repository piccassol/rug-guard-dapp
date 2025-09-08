import React, { useState, useEffect } from 'react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Dev sold 2% of holdings in SafeMoon Clone', severity: 'high' },
    // Mock real-time
  ]);

  useEffect(() => {
    // Simulate real-time: Poll for triggers like dev sells >1%
    const interval = setInterval(() => {
      // Add new alert logic here
    }, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alerts">
      <h2>Alerts ({alerts.length})</h2>
      <ul>
        {alerts.map((alert, i) => (
          <li key={i} className={`card ${alert.severity}-risk`}>
            {alert.message}
            <button>Snooze</button>
          </li>
        ))}
      </ul>
      <p>Customize alerts: Email/SMS for dev sells, liquidity drains.</p>
    </div>
  );
};

export default Alerts;
