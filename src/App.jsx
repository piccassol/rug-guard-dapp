import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TokenAnalysis from './components/TokenAnalysis';
import Watchlist from './components/Watchlist';
import Alerts from './components/Alerts';
import SearchBar from './components/SearchBar';
import './index.css'; // Import CSS

const wallets = [new PhantomWalletAdapter()];
const network = clusterApiUrl('devnet'); // Change to 'mainnet-beta' for prod

function App() {
  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="container">
              <header>
                <h1 className="high-risk">🛡️ RugGuard</h1>
                <p>Advanced memecoin risk analysis for Solana. Powered by AI.</p>
                <SearchBar />
                <WalletMultiButton />
              </header>
              <nav>
                <button>Dashboard</button>
                <button>Analysis</button>
                <button>Watchlist</button>
                <button>Alerts</button>
              </nav>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analysis/:tokenAddress" element={<TokenAnalysis />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/alerts" element={<Alerts />} />
              </Routes>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
