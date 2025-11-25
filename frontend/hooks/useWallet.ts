import { useCallback, useMemo, useEffect, useState } from "react";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { toast } from "sonner";

export const useWallet = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      await open();
    } catch (error) {
      console.error("Failed to open wallet modal", error);
      toast.error("Failed to connect wallet");
    }
  }, [open]);

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet", error);
      toast.error("Failed to disconnect wallet");
    }
  }, [disconnect]);

  return useMemo(
    () => ({
      isConnected: mounted && isConnected,
      address: address || null,
      isConnecting: false,
      connectWallet,
      disconnectWallet,
    }),
    [mounted, isConnected, address, connectWallet, disconnectWallet]
  );
};
