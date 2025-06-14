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

interface TrendingPageProps {
  onBack: () => void;
}

const TrendingPage: React.FC<TrendingPageProps> = ({ onBack }) => {
  const [timeFilter, setTimeFilter] = useState("1h");
  const [sortBy, setSortBy] = useState("age");

  // Mock data for trending tokens
  const trendingTokens = [
    {
      id: "1",
      token: "NUKE",
      symbol: "O",
      avatar: "☢️",
      contract: "Hr4FU...ump",
      age: "1h",
      liq: "206.6K",
      mc: "$264.5K",
      bluechip: "🔴 0.6%",
      holders: 175,
      smartKol: "--",
      txs1h: "50,607",
      txs1hSub: "25,302/25,305",
      vol1h: "$23.5M",
      price: "$0.0002",
      change1m: "-8%",
      change5m: "-4.3%",
      change1h: "-23.8%",
      designAudit: {
        noMint: "Yes",
        blacklist: "No",
        burnt: "?",
        top10: "20.7%",
        insiders: "4.6%",
      },
      verified: true,
      isNegative: true,
    },
    {
      id: "2",
      token: "TRUMPEDO",
      symbol: "O",
      avatar: "🚀",
      contract: "Hr4FU...ump",
      age: "54m",
      liq: "147.7K",
      mc: "$101.9K",
      bluechip: "🔴 0.5%",
      holders: 187,
      smartKol: "-/7",
      txs1h: "35,993",
      txs1hSub: "17,994/17,999",
      vol1h: "$19.3M",
      price: "$0.0001",
      change1m: "-8.6%",
      change5m: "-43.5%",
      change1h: "+243.9%",
      designAudit: {
        noMint: "Yes",
        blacklist: "No",
        burnt: "?",
        top10: "7.7%",
        insiders: "8.6%",
      },
      verified: true,
      isMixed: true,
    },
    {
      id: "3",
      token: "TaxDollars",
      symbol: "O",
      avatar: "💰",
      contract: "EAr7X...NiG",
      age: "53m",
      liq: "55.7K",
      mc: "$1.1M",
      bluechip: "🔴 0%",
      holders: 234,
      smartKol: "--",
      txs1h: "33,504",
      txs1hSub: "16,459/17,045",
      vol1h: "$9.6M",
      price: "$0.0011",
      change1m: "-18.9%",
      change5m: "+16.8%",
      change1h: "+681.1%",
      designAudit: {
        noMint: "Yes",
        blacklist: "No",
        burnt: "?",
        top10: "10%",
        insiders: "27.3%",
      },
      verified: true,
      isMixed: true,
    },
    {
      id: "4",
      token: "BELLA",
      symbol: "O",
      avatar: "👸",
      contract: "27tUH...ump",
      age: "1h",
      liq: "150.3K",
      mc: "$97.2K",
      bluechip: "🔴 0.6%",
      holders: 178,
      smartKol: "--",
      txs1h: "33,380",
      txs1hSub: "16,692/16,688",
      vol1h: "$15.2M",
      price: "$0.09728",
      change1m: "-3.7%",
      change5m: "+2.7%",
      change1h: "+20.2%",
      designAudit: {
        noMint: "Yes",
        blacklist: "No",
        burnt: "?",
        top10: "10%",
        insiders: "13.5%",
      },
      verified: true,
      isPositive: true,
    },
    {
      id: "5",
      token: "PEPEMAN",
      symbol: "O",
      avatar: "🐸",
      contract: "wnJPe...ump",
      age: "8h",
      liq: "274.7K",
      mc: "$1.8M",
      bluechip: "🔴 0%",
      holders: "13.8K",
      smartKol: "--",
      txs1h: "32,265",
      txs1hSub: "16,278/15,987",
      vol1h: "$5.7M",
      price: "$0.0019",
      change1m: "+0.8%",
      change5m: "+0.9%",
      change1h: "+3.2%",
      designAudit: {
        noMint: "Yes",
        blacklist: "No",
        burnt: "?",
        top10: "13.9%",
        insiders: "0%",
      },
      verified: true,
      isPositive: true,
    },
  ];

  const timeFilters = ["1m", "5m", "1h", "6h", "24h"];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Warning Banner */}
      <div className="bg-yellow-600 text-black p-2 text-center text-sm flex items-center justify-center gap-2">
        <span>
          ⚠️ SnipeX & X Tracker are unavailable for upgrades. Will resume soon.
        </span>
        <button className="text-black hover:text-gray-800 ml-auto">✕</button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Trending</h1>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">🔗 NextBC</span>
          </div>
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
      <div className="px-4 py-3 bg-gray-900/50 border-b border-gray-800 overflow-x-auto">
        <div className="flex gap-6 text-sm text-gray-400 min-w-max">
          <div className="w-40 flex items-center gap-1">
            <span>Token</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="w-16 flex items-center gap-1">
            <span>Age</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="w-20 flex items-center gap-1">
            <span>Liq 💰</span>
            <Filter className="h-3 w-3" />
          </div>
          <div className="w-20 flex items-center gap-1">
            <span>MC 💰</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="w-24 text-center">
            <span>BlueChip 💰</span>
          </div>
          <div className="w-20 flex items-center gap-1">
            <span>Holders 👥</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="w-24 text-center">
            <span>Smart / KOL 💰</span>
          </div>
          <div className="w-24 flex items-center gap-1">
            <span>1h TXs 💰</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="w-20 flex items-center gap-1">
            <span>1h Vol 💰</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="w-20 text-center">
            <span>Price 💰</span>
          </div>
          <div className="w-16 text-center">
            <span>1m% 📈</span>
          </div>
          <div className="w-16 text-center">
            <span>5m% 📈</span>
          </div>
          <div className="w-16 text-center">
            <span>1h% 📈</span>
          </div>
          <div className="w-32 text-center">
            <span>Degen Audit 🔍</span>
          </div>
        </div>
      </div>

      {/* Token List */}
      <div className="pb-20 overflow-x-auto">
        {trendingTokens.map((token) => (
          <div
            key={token.id}
            className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
          >
            <div className="flex gap-6 items-center text-sm min-w-max">
              {/* Token */}
              <div className="w-40 flex items-center gap-3">
                <button className="text-gray-400 hover:text-yellow-400">
                  <Star className="h-4 w-4" />
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg border-2 border-orange-500">
                  {token.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{token.token}</span>
                    <span className="text-gray-400">{token.symbol}</span>
                    {token.verified && <span className="text-blue-400">✓</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-gray-400 text-xs font-mono">
                      {token.contract}
                    </span>
                    <Copy className="h-3 w-3 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className="w-16 text-white">{token.age}</div>

              {/* Liquidity */}
              <div className="w-20 text-white">{token.liq}</div>

              {/* Market Cap */}
              <div className="w-20 text-white">{token.mc}</div>

              {/* BlueChip */}
              <div className="w-24 text-center">
                <span className="text-red-400">{token.bluechip}</span>
              </div>

              {/* Holders */}
              <div className="w-20 text-white">{token.holders}</div>

              {/* Smart/KOL */}
              <div className="w-24 text-center text-white">
                {token.smartKol}
              </div>

              {/* 1h TXs */}
              <div className="w-24">
                <div className="text-white">{token.txs1h}</div>
                <div className="text-xs text-gray-400">{token.txs1hSub}</div>
              </div>

              {/* 1h Vol */}
              <div className="w-20 text-white">{token.vol1h}</div>

              {/* Price */}
              <div className="w-20 text-center text-white">{token.price}</div>

              {/* 1m% */}
              <div
                className={`w-16 text-center ${
                  token.change1m.includes("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {token.change1m}
              </div>

              {/* 5m% */}
              <div
                className={`w-16 text-center ${
                  token.change5m.includes("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {token.change5m}
              </div>

              {/* 1h% */}
              <div
                className={`w-16 text-center ${
                  token.change1h.includes("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {token.change1h}
              </div>

              {/* Degen Audit */}
              <div className="w-32">
                <div className="text-xs grid grid-cols-5 gap-1 text-center">
                  <div className="flex flex-col">
                    <span className="text-gray-400">NoMint</span>
                    <span className="text-green-400">
                      {token.designAudit.noMint}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Blacklist</span>
                    <span className="text-red-400">
                      {token.designAudit.blacklist}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Burnt</span>
                    <span className="text-yellow-400">
                      {token.designAudit.burnt}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Top 10</span>
                    <span className="text-blue-400">
                      {token.designAudit.top10}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Insiders</span>
                    <span className="text-purple-400">
                      {token.designAudit.insiders}
                    </span>
                  </div>
                </div>
                <button className="bg-green-500 text-black px-3 py-1 rounded text-xs font-bold mt-2 hover:bg-green-400 transition-colors w-full">
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

export default TrendingPage;
