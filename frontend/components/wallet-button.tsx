"use client";

import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";

export function WalletButton() {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 rounded-lg bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
          <span className="text-sm font-medium text-primary">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button onClick={disconnectWallet} variant="outline" className="transition-all duration-200 hover:border-destructive/50 hover:text-destructive">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={connectWallet} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
      Connect wallet
    </Button>
  );
}
