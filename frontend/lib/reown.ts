import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { http } from "wagmi";

// Hedera Testnet network config
const HEDERA_TESTNET = {
  id: 296, // Hedera Testnet chain ID
  name: "Hedera Testnet",
  nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 8 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || "https://testnet.hashio.io/api"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || "https://testnet.hashio.io/api"],
    },
  },
  blockExplorers: {
    default: { name: "HashScan", url: "https://hashscan.io/testnet" },
  },
  testnet: true,
} as any;

// Hedera Mainnet network config (optional)
const HEDERA_MAINNET = {
  id: 295, // Hedera Mainnet chain ID
  name: "Hedera Mainnet",
  nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 8 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || "https://mainnet.hashio.io/api"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || "https://mainnet.hashio.io/api"],
    },
  },
  blockExplorers: {
    default: { name: "HashScan", url: "https://hashscan.io/mainnet" },
  },
  testnet: false,
} as any;

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";
const appUrl = typeof window !== "undefined" ? window.location.origin : "https://hajoo.app";

// Build Wagmi adapter with Hedera networks
export const wagmiAdapter = new WagmiAdapter({
  networks: [HEDERA_TESTNET, HEDERA_MAINNET],
  projectId,
  transports: {
    [HEDERA_TESTNET.id]: http(),
    [HEDERA_MAINNET.id]: http(),
  },
});

// Export wagmi config if needed elsewhere
export const wagmiConfig = wagmiAdapter.wagmiConfig;

// Initialize AppKit for Hedera
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [HEDERA_TESTNET, HEDERA_MAINNET],
  projectId,
  features: {
    email: true,
    socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
    emailShowWallets: true,
  },
  allWallets: "SHOW",
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#4F46E5",
    "--w3m-color-mix": "#4F46E5",
    "--w3m-color-mix-strength": 40,
    "--w3m-border-radius-master": "12px",
    "--w3m-font-family": "Inter, system-ui, sans-serif",
  },
  metadata: {
    name: "Hajoo",
    description: "Decentralized savings pools on Hedera",
    url: appUrl,
    icons: [`${appUrl}/favicon.ico`],
  },
});
