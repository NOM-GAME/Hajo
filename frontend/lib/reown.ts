import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { http } from "wagmi";
import type { SocialProvider } from "@reown/appkit";

// Hedera Testnet network config
export const HEDERA_TESTNET = {
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

// Hedera Mainnet network config
export const HEDERA_MAINNET = {
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

// Base Mainnet network config
export const BASE_MAINNET = {
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org"],
    },
  },
  blockExplorers: {
    default: { name: "BaseScan", url: "https://basescan.org" },
  },
  testnet: false,
} as any;

// Base Sepolia Testnet network config
export const BASE_SEPOLIA = {
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org"],
    },
  },
  blockExplorers: {
    default: { name: "BaseScan", url: "https://sepolia.basescan.org" },
  },
  testnet: true,
} as any;

// Celo Mainnet network config
export const CELO_MAINNET = {
  id: 42220,
  name: "Celo Mainnet",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_CELO_RPC_URL || "https://forno.celo.org"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_CELO_RPC_URL || "https://forno.celo.org"],
    },
  },
  blockExplorers: {
    default: { name: "CeloScan", url: "https://celoscan.io" },
  },
  testnet: false,
} as any;

// Celo Alfajores Testnet network config
export const CELO_ALFAJORES = {
  id: 44787,
  name: "Celo Alfajores",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_CELO_ALFAJORES_RPC_URL || "https://alfajores-forno.celo-testnet.org"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_CELO_ALFAJORES_RPC_URL || "https://alfajores-forno.celo-testnet.org"],
    },
  },
  blockExplorers: {
    default: { name: "CeloScan", url: "https://alfajores.celoscan.io" },
  },
  testnet: true,
} as any;

// Somnia Mainnet network config
export const SOMNIA_MAINNET = {
  id: 5031,
  name: "Somnia Mainnet",
  nativeCurrency: { name: "SOMI", symbol: "SOMI", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || "https://api.infra.mainnet.somnia.network"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || "https://api.infra.mainnet.somnia.network"],
    },
  },
  blockExplorers: {
    default: { name: "Somnia Explorer", url: "https://explorer.somnia.network" },
  },
  testnet: false,
} as any;

// Somnia Shannon Testnet network config
export const SOMNIA_SHANNON = {
  id: 50312,
  name: "Somnia Shannon",
  nativeCurrency: { name: "STT", symbol: "STT", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_SHANNON_RPC_URL || "https://dream-rpc.somnia.network"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_SHANNON_RPC_URL || "https://dream-rpc.somnia.network"],
    },
  },
  blockExplorers: {
    default: { name: "Somnia Explorer", url: "https://shannon-explorer.somnia.network" },
  },
  testnet: true,
} as any;

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";
export const appUrl = typeof window !== "undefined" ? window.location.origin : "https://hajoo.app";

// Build Wagmi adapter with all supported networks
export const wagmiAdapter = new WagmiAdapter({
  networks: [
    HEDERA_TESTNET,
    HEDERA_MAINNET,
    BASE_MAINNET,
    BASE_SEPOLIA,
    CELO_MAINNET,
    CELO_ALFAJORES,
    SOMNIA_MAINNET,
    SOMNIA_SHANNON,
  ],
  projectId,
  transports: {
    [HEDERA_TESTNET.id]: http(),
    [HEDERA_MAINNET.id]: http(),
    [BASE_MAINNET.id]: http(),
    [BASE_SEPOLIA.id]: http(),
    [CELO_MAINNET.id]: http(),
    [CELO_ALFAJORES.id]: http(),
    [SOMNIA_MAINNET.id]: http(),
    [SOMNIA_SHANNON.id]: http(),
  },
});

// Export wagmi config if needed elsewhere
export const wagmiConfig = wagmiAdapter.wagmiConfig;

export const appKitMetadata = {
  name: "Hajoo",
  description: "Decentralized savings pools on multiple chains",
  url: appUrl,
  icons: [`${appUrl}/favicon.ico`],
};

export const appKitFeatures = {
  email: true,
  socials: ["google", "x", "discord", "farcaster", "github", "apple", "facebook"] as unknown as SocialProvider[],
  emailShowWallets: true,
};

export const appKitThemeVariables = {
  "--w3m-accent": "#4F46E5",
  "--w3m-color-mix": "#4F46E5",
  "--w3m-color-mix-strength": 40,
  "--w3m-border-radius-master": "12px",
  "--w3m-font-family": "Inter, system-ui, sans-serif",
};
