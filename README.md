RugGuard - Solana Memecoin Rug Pull Detector

Advanced dApp for analyzing Solana memecoins for rug pull risks. Features on-chain metrics via Birdeye, AI scoring via OpenAI, social analysis, risk scores, alerts, and visualizations.

Setup
1. Clone repo: `git clone https://github.com/yourusername/rug-guard-dapp.git`
2. Install: `npm install`
3. Add `.env` with API keys (see .env.example)
4. Run: `npm run dev`
5. Open http://localhost:3000

Features
- Search & Analyze tokens
- Risk Score (0-100)
- Bubble Maps for distribution
- Watchlist & Alerts
- Wallet Connection (Phantom)

APIs
- Birdeye: Token data
- OpenAI: AI scoring/sentiment
- Social: Mocked (add Twitter/Telegram)

For production: Add backend for secure calls, real-time WebSockets.

