import {
  User,
  Transaction,
  CopyTrader,
  Token,
  CopyTradeRequest,
  CopyTradeResult,
  TraderPosition,
} from "../types";

// Simulated delay for realistic API experience
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock database
let mockUsers: User[] = [
  {
    id: "1",
    email: "demo@gmgn.ai",
    name: "Demo User",
    walletAddress: "5HNeh...rzq2",
    balance: 84.54,
  },
];

let mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "buy",
    token: "o5JSY...xTy",
    amount: 0.418,
    price: 25.7,
    timestamp: new Date(Date.now() - 3600000),
    status: "completed",
  },
  {
    id: "2",
    type: "copy",
    token: "6cSx5...UK8",
    amount: 0,
    price: 24.8,
    timestamp: new Date(Date.now() - 7200000),
    status: "completed",
    traderId: "1",
  },
];

const mockCopyTraders: CopyTrader[] = [
  {
    id: "1",
    name: "o5JSY...xTy",
    avatar: "🔥",
    rank: 1,
    pnl: 7585.4,
    pnlPercentage: 25.7,
    followers: 418,
    winRate: 78.5,
    isFollowing: false,
    balance: 84.54,
    totalTrades: 156,
    avgTradeSize: 2.3,
    recentTrades: [
      {
        id: "pos1",
        token: "BONK",
        type: "buy",
        amount: 1.2,
        price: 0.000018,
        pnl: 450.2,
        pnlPercentage: 15.3,
        timestamp: new Date(Date.now() - 1800000),
        status: "completed",
      },
      {
        id: "pos2",
        token: "WIF",
        type: "sell",
        amount: 0.8,
        price: 2.45,
        pnl: -120.5,
        pnlPercentage: -5.2,
        timestamp: new Date(Date.now() - 3600000),
        status: "completed",
      },
    ],
  },
  {
    id: "2",
    name: "6cSx5...UK8",
    avatar: "⚡",
    rank: 2,
    pnl: 13300,
    pnlPercentage: 24.8,
    followers: 0,
    winRate: 82.1,
    isFollowing: false,
    balance: 156.23,
    totalTrades: 89,
    avgTradeSize: 5.7,
    recentTrades: [
      {
        id: "pos3",
        token: "PEPE",
        type: "buy",
        amount: 2.5,
        price: 0.00000845,
        pnl: 1200.8,
        pnlPercentage: 32.1,
        timestamp: new Date(Date.now() - 900000),
        status: "completed",
      },
    ],
  },
  {
    id: "3",
    name: "2oJMe...BRZ",
    avatar: "💎",
    rank: 3,
    pnl: 947.9,
    pnlPercentage: 10.4,
    followers: 28,
    winRate: 65.3,
    isFollowing: true,
    balance: 45.67,
    totalTrades: 234,
    avgTradeSize: 1.8,
    recentTrades: [
      {
        id: "pos4",
        token: "DOGE",
        type: "buy",
        amount: 0.9,
        price: 0.32,
        pnl: 89.4,
        pnlPercentage: 8.7,
        timestamp: new Date(Date.now() - 2700000),
        status: "completed",
      },
    ],
  },
];

const mockTokens: Token[] = [
  {
    id: "1",
    symbol: "WWI50...",
    name: "World War Index 500",
    price: 0.418,
    change24h: 25.7,
    volume: 330.1,
    marketCap: 4700,
    holders: 2,
    timeAgo: "1s",
    contract: "3k3iK...ump",
    avatar: "WW",
    isVerified: true,
    status: "completed",
  },
  {
    id: "2",
    symbol: "$TRUM...",
    name: "Donald J. Trump",
    price: 0,
    change24h: 24.8,
    volume: 0.04,
    marketCap: 73800,
    holders: 4,
    timeAgo: "5s",
    contract: "ZCmGY...ump",
    avatar: "trump",
    isVerified: true,
    status: "completed",
  },
  {
    id: "3",
    symbol: "PEOPL...",
    name: "Bet on this",
    price: 0.028,
    change24h: 10.4,
    volume: 2600,
    marketCap: 5300,
    holders: 5,
    timeAgo: "5s",
    contract: "4x3YX...rvE",
    avatar: "PEOPLE",
    isVerified: true,
    status: "completing",
    progress: 80,
  },
  {
    id: "4",
    symbol: "WZ",
    name: "Where We Dropping",
    price: 0.03,
    change24h: 10.2,
    volume: 359.7,
    marketCap: 4700,
    holders: 4,
    timeAgo: "7s",
    contract: "GJMMP...ump",
    avatar: "military",
    isVerified: true,
    status: "completed",
  },
];

export const mockAPI = {
  // Authentication
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    const user = mockUsers.find((u) => u.email === email);
    if (user && password === "demo123") {
      return user;
    }
    throw new Error("Invalid credentials");
  },

  register: async (email: string, inviteCode: string): Promise<User> => {
    await delay(1000);
    if (inviteCode === "FKNvP6Qi") {
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name: `User ${mockUsers.length + 1}`,
        walletAddress: `${Math.random()
          .toString(36)
          .substring(2, 8)}...${Math.random().toString(36).substring(2, 5)}`,
        balance: Math.random() * 10,
        inviteCode,
      };
      mockUsers.push(newUser);
      return newUser;
    }
    throw new Error("Invalid invite code");
  },

  // Transactions
  getTransactions: async (): Promise<Transaction[]> => {
    await delay(500);
    return [...mockTransactions];
  },

  // Copy Trading
  getCopyTraders: async (): Promise<CopyTrader[]> => {
    await delay(500);
    return [...mockCopyTraders];
  },

  copyTrade: async (
    traderId: string,
    amount: number
  ): Promise<CopyTradeResult> => {
    await delay(1500);

    const trader = mockCopyTraders.find((t) => t.id === traderId);
    if (!trader) {
      return {
        id: "",
        success: false,
        message: "Trader not found",
      };
    }

    // Simulate copy trade
    const newTransaction: Transaction = {
      id: (mockTransactions.length + 1).toString(),
      type: "copy",
      token: trader.name,
      amount,
      price: Math.random() * 20 - 10, // Random PnL
      timestamp: new Date(),
      status: "completed",
      traderId,
    };

    mockTransactions.push(newTransaction);

    return {
      id: newTransaction.id,
      success: true,
      message: `Successfully copied ${trader.name} with ${amount} SOL`,
      transaction: newTransaction,
    };
  },

  followTrader: async (traderId: string): Promise<boolean> => {
    await delay(500);
    const traderIndex = mockCopyTraders.findIndex((t) => t.id === traderId);
    if (traderIndex !== -1) {
      mockCopyTraders[traderIndex].isFollowing =
        !mockCopyTraders[traderIndex].isFollowing;
      if (mockCopyTraders[traderIndex].isFollowing) {
        mockCopyTraders[traderIndex].followers += 1;
      } else {
        mockCopyTraders[traderIndex].followers -= 1;
      }
      return true;
    }
    return false;
  },

  // Market Data
  getMarketData: async (
    statusFilter?: "all" | "completing" | "completed"
  ): Promise<Token[]> => {
    await delay(500);
    let filteredTokens = [...mockTokens];

    if (statusFilter && statusFilter !== "all") {
      filteredTokens = mockTokens.filter(
        (token) => token.status === statusFilter
      );
    }

    return filteredTokens;
  },

  // Real-time updates simulation
  subscribeToTraderUpdates: (
    traderId: string,
    callback: (trader: CopyTrader) => void
  ) => {
    const interval = setInterval(() => {
      const trader = mockCopyTraders.find((t) => t.id === traderId);
      if (trader) {
        // Simulate small PnL changes
        trader.pnl += (Math.random() - 0.5) * 100;
        trader.pnlPercentage = (trader.pnl / 10000) * 100;
        callback(trader);
      }
    }, 5000);

    return () => clearInterval(interval);
  },
};
