import React, { useState } from "react";
import {
  ChevronDown,
  Filter,
  Star,
  Copy,
  ExternalLink,
  TrendingUp,
  Users,
  Shield,
  Zap,
} from "lucide-react";

interface NewPairPageProps {
  onBack: () => void;
}

const NewPairPage: React.FC<NewPairPageProps> = ({ onBack }) => {
  const [timeFilter, setTimeFilter] = useState("1m");
  const [sortBy, setSortBy] = useState("age");

  // Mock data for new pairs
  const newPairs = [
    {
      id: "1",
      token: "ELLIE",
      symbol: "O",
      avatar: "👩",
      contract: "6MY3...ump",
      age: "2s",
      liq: "SOL 0/0",
      mc: "--",
      holders: 1,
      txs5m: "--",
      vol1h: "--",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
    },
    {
      id: "2",
      token: "EGO",
      symbol: "Q",
      avatar: "🦅",
      contract: "HwBbw...CbZ",
      age: "3s",
      liq: "SOL 0/0",
      mc: "--",
      holders: 1,
      txs5m: "--",
      vol1h: "--",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
      hasFlags: true,
    },
    {
      id: "3",
      token: "WBF",
      symbol: "O",
      avatar: "🚀",
      contract: "5JaBn...ump",
      age: "9s",
      liq: "SOL 0/0",
      mc: "--",
      holders: 1,
      txs5m: "--",
      vol1h: "--",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
    },
    {
      id: "4",
      token: "purrito",
      symbol: "Q",
      avatar: "🐱",
      contract: "8CqpL...UW",
      age: "11s",
      liq: "SOL 0/0",
      mc: "--",
      holders: 1,
      txs5m: "--",
      vol1h: "--",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: true,
    },
    {
      id: "5",
      token: "poli",
      symbol: "Q",
      avatar: "🐦",
      contract: "EMwk3...ray",
      age: "13s",
      liq: "SOL 0/0",
      mc: "--",
      holders: 1,
      txs5m: "--",
      vol1h: "--",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: true,
    },
    {
      id: "6",
      token: "BWJW",
      symbol: "O",
      avatar: "🛡️",
      contract: "5QJbw...6FB",
      age: "13s",
      liq: "SOL 88.4/88.4",
      liquidityPercent: "0%",
      mc: "0",
      mcValue: "--/--",
      holders: 110,
      txs5m: "$0",
      vol1h: "$0",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
      hasLiquidity: true,
    },
    {
      id: "7",
      token: "GAP",
      symbol: "Q",
      avatar: "👵",
      contract: "wJBM...6qJ",
      age: "14s",
      liq: "SOL 0/0",
      mc: "--",
      holders: 1,
      txs5m: "--",
      vol1h: "--",
      price: "$0",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
    },
    {
      id: "8",
      token: "GRENAPE",
      symbol: "O",
      avatar: "🍇",
      contract: "D8CGb...ump",
      age: "17s",
      liq: "SOL 2.4/0.015",
      liquidityPercent: "+16.36%",
      mc: "$4.5K",
      mcValue: "5",
      mcSubValue: "5/1",
      holders: 5,
      txs5m: "6",
      vol1h: "$717",
      price: "$0.04563",
      change1m: "+6.4%",
      change5m: "+6.4%",
      change1h: "+6.4%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
      isPositive: true,
    },
    {
      id: "9",
      token: "PEPE USD",
      symbol: "O",
      avatar: "🐸",
      contract: "cJm9...ump",
      age: "19s",
      liq: "SOL 3/3",
      liquidityPercent: "0%",
      mc: "$4.6K",
      mcValue: "2",
      mcSubValue: "1",
      mcFraction: "1/0",
      holders: 2,
      txs5m: "1",
      vol1h: "$445.3",
      price: "$0.04618",
      change1m: "0%",
      change5m: "0%",
      change1h: "0%",
      designAudit: { noMint: "Yes", blacklist: "No" },
      verified: false,
      hasWarning: true,
    },
  ];

  const timeFilters = ["1m", "5m", "1h", "6h", "24h"];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">New pair</h1>
          <div className="flex gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1 rounded text-sm ${
                  timeFilter === filter
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">🏠 Devs</span>
            <span className="text-gray-400 text-sm">🔧 Filter</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
              9
            </span>
            <span className="text-gray-400 text-sm">💰 Buy</span>
            <span className="text-gray-400 text-sm">=</span>
            <span className="text-gray-400 text-sm">0</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-400 text-sm">P1</span>
            <span className="text-gray-400 text-sm">P2</span>
            <span className="text-gray-400 text-sm">P3</span>
            <span className="text-gray-400 text-sm">⚙️</span>
          </div>
        </div>
      </div>

      {/* Table Headers */}
      <div className="px-4 py-3 bg-gray-900/50 border-b border-gray-800">
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-400">
          <div className="col-span-2 flex items-center gap-1">
            <span>Token</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <span>Age</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <span>Liq 💰/Initial</span>
            <Filter className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <span>MC 💰</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <span>Holders 👥</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="text-center">
            <span>1h TXs 💰</span>
          </div>
          <div className="text-center">
            <span>1h Vol 💰</span>
          </div>
          <div className="text-center">
            <span>Price 💰</span>
          </div>
          <div className="text-center">
            <span>1m% 📈</span>
          </div>
          <div className="text-center">
            <span>5m% 📈</span>
          </div>
          <div className="text-center">
            <span>1h% 📈</span>
          </div>
          <div className="text-center">
            <span>Degen Audit 🔍</span>
          </div>
        </div>
      </div>

      {/* Token List */}
      <div className="pb-20">
        {newPairs.map((pair) => (
          <div
            key={pair.id}
            className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
          >
            <div className="grid grid-cols-12 gap-4 items-center text-sm">
              {/* Token */}
              <div className="col-span-2 flex items-center gap-3">
                <button className="text-gray-400 hover:text-yellow-400">
                  <Star className="h-4 w-4" />
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  {pair.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{pair.token}</span>
                    <span className="text-gray-400">{pair.symbol}</span>
                    {pair.verified && <span className="text-blue-400">✓</span>}
                    {pair.hasFlags && (
                      <div className="flex gap-1">
                        <span className="text-red-400">❌</span>
                        <span className="text-yellow-400">⚠️</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-gray-400 text-xs font-mono">
                      {pair.contract}
                    </span>
                    <Copy className="h-3 w-3 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className="text-white">{pair.age}</div>

              {/* Liquidity */}
              <div>
                <div className="text-white">{pair.liq}</div>
                {pair.liquidityPercent && (
                  <div
                    className={`text-xs ${
                      pair.liquidityPercent.includes("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {pair.liquidityPercent}
                  </div>
                )}
              </div>

              {/* Market Cap */}
              <div>
                <div className="text-white">{pair.mc}</div>
                {pair.mcValue && (
                  <div className="text-xs text-gray-400">{pair.mcSubValue}</div>
                )}
              </div>

              {/* Holders */}
              <div className="text-white">{pair.holders}</div>

              {/* 1h TXs */}
              <div className="text-center text-white">{pair.txs5m}</div>

              {/* 1h Vol */}
              <div className="text-center text-white">{pair.vol1h}</div>

              {/* Price */}
              <div className="text-center text-white">{pair.price}</div>

              {/* 1m% */}
              <div
                className={`text-center ${
                  pair.isPositive ? "text-green-400" : "text-white"
                }`}
              >
                {pair.change1m}
              </div>

              {/* 5m% */}
              <div
                className={`text-center ${
                  pair.isPositive ? "text-green-400" : "text-white"
                }`}
              >
                {pair.change5m}
              </div>

              {/* 1h% */}
              <div
                className={`text-center ${
                  pair.isPositive ? "text-green-400" : "text-white"
                }`}
              >
                {pair.change1h}
              </div>

              {/* Degen Audit */}
              <div className="text-center">
                <div className="text-xs">
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-gray-400">NoMint</span>
                    <span className="text-gray-400">Blacklist</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center mt-1">
                    <span className="text-green-400">
                      {pair.designAudit.noMint}
                    </span>
                    <span className="text-red-400">
                      {pair.designAudit.blacklist}
                    </span>
                  </div>
                </div>
                <button className="bg-green-500 text-black px-3 py-1 rounded text-xs font-bold mt-2 hover:bg-green-400 transition-colors">
                  💰 Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPairPage;
