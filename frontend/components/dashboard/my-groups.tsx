"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Calendar, ArrowRight, Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";

interface Pool {
  id: string;
  name: string;
  type: "rotational";
  status: "active" | "completed" | "paused";
  members_count: number;
  total_saved: number;
  progress: number;
  frequency?: string;
  next_payout?: string;
}

interface MyGroupsProps {
  onCreateClick?: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function MyGroups({ onCreateClick }: MyGroupsProps) {
  const { address } = useWallet();
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    fetchPools();
  }, [address]);

  const fetchPools = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/pools?creator=${address?.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pools");
      }

      const data = await response.json();
      setPools(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pools");
      setPools([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPoolType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatEth = (amount: number | null) => {
    if (!amount) return "0 ETH";
    return `${amount.toFixed(2)} ETH`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">My Groups</h2>
            <p className="text-muted-foreground mt-1">
              Manage your savings circles
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">My Groups</h2>
            <p className="text-muted-foreground mt-1">
              Manage your savings circles
            </p>
          </div>
        </div>
        <Card className="p-6 border-red-200 bg-red-50 text-red-700">
          <p>{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {pools.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-16 text-center bg-white/80 backdrop-blur-sm border-2 border-dashed border-muted-foreground/20 shadow-lg">
            <div className="max-w-md mx-auto space-y-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-violet-100/50 mx-auto">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Start Your Savings Journey</h3>
                <p className="text-muted-foreground">
                  No pools yet. Create your first savings pool to begin building wealth with your trusted circle.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                onClick={onCreateClick}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Pool
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pools.map((pool) => (
            <motion.div key={pool.id} variants={item}>
              <Card className="group p-6 bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{pool.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {formatPoolType(pool.type)}
                      </Badge>
                      <Badge className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                        {pool.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        Members
                      </div>
                      <div className="text-lg font-semibold">{pool.members_count}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Total Saved
                      </div>
                      <div className="text-lg font-semibold">
                        {formatEth(pool.total_saved)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground font-medium">Cycle Progress</span>
                      <span className="font-bold text-primary">{pool.progress || 0}%</span>
                    </div>
                    <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pool.progress || 0}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                      />
                    </div>
                  </div>

                  {pool.frequency && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <Calendar className="h-4 w-4" />
                      <span className="capitalize">{pool.frequency} contributions</span>
                    </div>
                  )}
                </div>

                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline" asChild>
                  <Link href={`/dashboard/group/${pool.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
