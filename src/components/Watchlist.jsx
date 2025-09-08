import React, { useState } from 'react';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([
    { address: 'ABC123', name: 'Doge Killer', risk: 45 },
    // Add more
  ]);

  return (
    <div className="watchlist">
      <h2>Watchlist ({watchlist.length} items)</h2>
      <ul>
        {watchlist.map((item, i) => (
          <li key={i} className="card">
            {item.name} - Risk: {item.risk}
            <button>Add Alert</button>
          </li>
        ))}
      </ul>
      <button>Add Token</button>
    </div>
  );
};

export default Watchlist;
