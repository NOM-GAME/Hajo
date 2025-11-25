"use client";

import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";

export function WalletButton() {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button onClick={disconnectWallet} variant="outline">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
}
