const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
let users = [
  {
    id: "1",
    email: "demo@gmgn.ai",
    walletAddress: "5HNeh...rzq2",
    balance: 84.54,
  },
];

let transactions = [
  {
    id: "1",
    type: "buy",
    token: "o5JSY...xTy",
    amount: 0.418,
    price: 25.7,
    timestamp: new Date(Date.now() - 3600000),
    status: "completed",
  },
];

let copyTraders = [
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
  },
];

let tokens = [
  {
    id: "1",
    symbol: "o5JSY...xTy",
    name: "Alpha Token",
    price: 0.418,
    change24h: 25.7,
    volume: 7585.4,
    marketCap: 125000,
    holders: 418,
    timeAgo: "1h",
    contract: "o5JSY...xTy",
    avatar: "🔥",
    isVerified: true,
    status: "completed",
  },
  {
    id: "2",
    symbol: "6cSx5...UK8",
    name: "Beta Coin",
    price: 0,
    change24h: 24.8,
    volume: 13300,
    marketCap: 0,
    holders: 0,
    timeAgo: "2h",
    contract: "6cSx5...UK8",
    avatar: "⚡",
    isVerified: true,
    status: "completing",
    progress: 65,
  },
];

// Authentication endpoints
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Simulate delay
  setTimeout(() => {
    const user = users.find((u) => u.email === email);
    if (user && password === "demo123") {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  }, 1000);
});

app.post("/api/auth/register", (req, res) => {
  const { email, inviteCode } = req.body;

  setTimeout(() => {
    if (inviteCode === "FKNvP6Qi") {
      const newUser = {
        id: (users.length + 1).toString(),
        email,
        walletAddress: `${Math.random()
          .toString(36)
          .substring(2, 8)}...${Math.random().toString(36).substring(2, 5)}`,
        balance: Math.random() * 10,
        inviteCode,
      };
      users.push(newUser);
      res.json({ success: true, user: newUser });
    } else {
      res.status(400).json({ success: false, message: "Invalid invite code" });
    }
  }, 1000);
});

// Trading endpoints
app.get("/api/transactions/:userId", (req, res) => {
  setTimeout(() => {
    res.json({ success: true, transactions });
  }, 500);
});

app.get("/api/copy-traders", (req, res) => {
  setTimeout(() => {
    res.json({ success: true, traders: copyTraders });
  }, 500);
});

app.post("/api/copy-trade", (req, res) => {
  const { traderId, amount } = req.body;

  setTimeout(() => {
    const trader = copyTraders.find((t) => t.id === traderId);
    if (!trader) {
      return res
        .status(404)
        .json({ success: false, message: "Trader not found" });
    }

    const newTransaction = {
      id: (transactions.length + 1).toString(),
      type: "copy",
      token: trader.name,
      amount,
      price: Math.random() * 20 - 10,
      timestamp: new Date(),
      status: "completed",
      traderId,
    };

    transactions.push(newTransaction);

    res.json({
      success: true,
      message: `Successfully copied ${trader.name} with ${amount} SOL`,
      transaction: newTransaction,
    });
  }, 1500);
});

app.post("/api/follow-trader/:traderId", (req, res) => {
  const { traderId } = req.params;

  setTimeout(() => {
    const traderIndex = copyTraders.findIndex((t) => t.id === traderId);
    if (traderIndex !== -1) {
      copyTraders[traderIndex].isFollowing =
        !copyTraders[traderIndex].isFollowing;
      if (copyTraders[traderIndex].isFollowing) {
        copyTraders[traderIndex].followers += 1;
      } else {
        copyTraders[traderIndex].followers -= 1;
      }
      res.json({ success: true, trader: copyTraders[traderIndex] });
    } else {
      res.status(404).json({ success: false, message: "Trader not found" });
    }
  }, 500);
});

// Market data endpoints
app.get("/api/tokens", (req, res) => {
  const { status } = req.query;

  setTimeout(() => {
    let filteredTokens = [...tokens];

    if (status && status !== "all") {
      filteredTokens = tokens.filter((token) => token.status === status);
    }

    res.json({ success: true, tokens: filteredTokens });
  }, 500);
});

// WebSocket simulation for real-time updates
app.get("/api/trader-updates/:traderId", (req, res) => {
  const { traderId } = req.params;

  // Set headers for Server-Sent Events
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  // Send periodic updates
  const interval = setInterval(() => {
    const trader = copyTraders.find((t) => t.id === traderId);
    if (trader) {
      trader.pnl += (Math.random() - 0.5) * 100;
      trader.pnlPercentage = (trader.pnl / 10000) * 100;

      res.write(`data: ${JSON.stringify(trader)}\n\n`);
    }
  }, 5000);

  // Clean up on connection close
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 GMGN Backend server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🔐 Demo login: demo@gmgn.ai / demo123`);
  console.log(`🎫 Demo invite code: FKNvP6Qi`);
});

module.exports = app;
