"use client";

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppKitProvider } from "@reown/appkit/react";
import {
  wagmiConfig,
  wagmiAdapter,
  HEDERA_TESTNET,
  HEDERA_MAINNET,
  BASE_MAINNET,
  BASE_SEPOLIA,
  CELO_MAINNET,
  CELO_ALFAJORES,
  SOMNIA_MAINNET,
  SOMNIA_SHANNON,
  projectId,
  appKitMetadata,
  appKitFeatures,
  appKitThemeVariables,
} from "@/lib/reown";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
        <AppKitProvider
          adapters={[wagmiAdapter]}
          projectId={projectId}
          networks={[
            HEDERA_TESTNET,
            HEDERA_MAINNET,
            BASE_MAINNET,
            BASE_SEPOLIA,
            CELO_MAINNET,
            CELO_ALFAJORES,
            SOMNIA_MAINNET,
            SOMNIA_SHANNON,
          ]}
          metadata={appKitMetadata}
          features={appKitFeatures}
          allWallets="SHOW"
          themeMode="dark"
          themeVariables={appKitThemeVariables}
        >
            {children}
          </AppKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
