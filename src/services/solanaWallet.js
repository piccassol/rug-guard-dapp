// Wallet utils (basic, extend as needed)
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export function useSolanaWallet() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const analyzeWallet = async (walletAddress) => {
    // Example: Fetch wallet token balance or history
    if (!publicKey) return null;
    // Use connection.getTokenAccountsByOwner for holdings
    return { connected, publicKey: publicKey.toString() };
  };

  return { analyzeWallet };
}
