export interface User {
  id: string;
  email: string;
  name: string;
  walletAddress: string;
  balance: number;
  inviteCode?: string;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "copy";
  token: string;
  amount: number;
  price: number;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
  traderId?: string; // For copy trades
}

export interface CopyTrader {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  pnl: number;
  pnlPercentage: number;
  followers: number;
  winRate: number;
  isFollowing: boolean;
  balance: number;
  totalTrades: number;
  avgTradeSize: number;
  recentTrades: TraderPosition[];
}

export interface TraderPosition {
  id: string;
  token: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  pnl: number;
  pnlPercentage: number;
  timestamp: Date;
  status: "completed" | "pending";
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  holders: number;
  timeAgo: string;
  contract: string;
  avatar: string;
  isVerified: boolean;
  status: "completing" | "completed";
  progress?: number; // For completing tokens (0-100)
}

export interface CopyTradeRequest {
  traderId: string;
  amount: number;
  percentage?: number; // Percentage of wallet to copy
  autoMode?: boolean;
}

export interface CopyTradeResult {
  id: string;
  success: boolean;
  message: string;
  transaction?: Transaction;
}

export type TabType =
  | "trenches"
  | "newpair"
  | "trending"
  | "copytrade"
  | "monitor"
  | "follow";
export type TokenStatusFilter = "all" | "completing" | "completed";
