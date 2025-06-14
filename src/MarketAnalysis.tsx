import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Target,
  Share,
  MoreHorizontal,
  TrendingUp,
  Users,
  Activity,
  Clock,
  Filter,
  AlertTriangle,
  X,
} from "lucide-react";

interface MarketAnalysisPageProps {
  tokenData?: {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    contract: string;
    avatar: string;
  };
  onBack: () => void;
}

const MarketAnalysisPage: React.FC<MarketAnalysisPageProps> = ({
  tokenData = {
    symbol: "AIRBALL",
    name: "kafuJ...ump",
    price: 0.080439,
    change24h: 32.5,
    contract: "kafuJ...ump",
    avatar: "🎯",
  },
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<
    "activity" | "liquidity" | "traders" | "holders" | "following"
  >("activity");
  const [activityFilter, setActivityFilter] = useState<
    "all" | "smart" | "kol" | "following" | "remarks" | "dev" | "whale"
  >("all");
  const [chartTimeframe, setChartTimeframe] = useState("1h");

  // Mock activity data
  const activityData = [
    { id: 1, age: "0s", type: "Buy", amount: 84.52, usd: 10, token: "AIRBALL" },
    {
      id: 2,
      age: "1s",
      type: "Sell",
      amount: 68.97,
      usd: 8.5,
      token: "AIRBALL",
      isProfit: true,
    },
    { id: 3, age: "1s", type: "Buy", amount: 10.2, usd: 1.2, token: "AIRBALL" },
    {
      id: 4,
      age: "2s",
      type: "Buy",
      amount: 11.82,
      usd: 1.4,
      token: "AIRBALL",
    },
    { id: 5, age: "3s", type: "Buy", amount: 6.39, usd: 8.1, token: "AIRBALL" },
    {
      id: 6,
      age: "3s",
      type: "Buy",
      amount: 14.49,
      usd: 1.7,
      token: "AIRBALL",
      hasAlert: true,
    },
  ];

  const timeframes = ["1s", "15s", "30s", "1m", "5m", "15m", "1h"];
  const priceButtons = [
    "1m +56.18%",
    "5m +56.18%",
    "1h +56.18%",
    "24h +56.18%",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-400">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{tokenData.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{tokenData.symbol}</span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              </div>
              <div className="text-gray-400 text-sm">{tokenData.name}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-green-400 font-bold text-lg">
              ${tokenData.price.toFixed(5)}
            </div>
            <div className="text-green-400 text-sm">
              {tokenData.change24h > 0 ? "+" : ""}
              {tokenData.change24h}%
            </div>
          </div>
          <Share className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Token Info Bar */}
      <div className="px-4 py-3 bg-gray-900/50">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">Name</span>
            <span className="text-gray-400">CA</span>
            <span className="text-gray-400">X</span>
            <div className="w-4 h-4 bg-gray-600 rounded-full border border-gray-500"></div>
            <span className="text-gray-400">0%</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <X className="h-4 w-4 text-red-500" />
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Price Buttons */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        {priceButtons.map((button, index) => (
          <button
            key={index}
            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap"
          >
            {button}
          </button>
        ))}
        <ChevronDown className="h-5 w-5 text-gray-400 ml-2" />
      </div>

      {/* Chart Timeframe */}
      <div className="px-4 py-2 flex items-center gap-4 text-sm border-b border-gray-800">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setChartTimeframe(timeframe)}
            className={`${
              chartTimeframe === timeframe ? "text-white" : "text-gray-400"
            }`}
          >
            {timeframe}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Activity className="h-4 w-4 text-gray-400" />
          <span className="text-gray-400">Price/Volume</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="px-4 py-4 bg-gray-900/30 relative">
        <div className="h-64 relative">
          {/* Chart background */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="text-gray-700 text-6xl font-bold opacity-20">
              GMGN
            </div>
          </div>

          {/* Price levels */}
          <div className="absolute right-4 top-4 text-green-400 text-sm">
            0.080439
          </div>
          <div className="absolute right-4 top-16 text-gray-400 text-sm">
            0.070000
          </div>
          <div className="absolute right-4 bottom-16 text-gray-400 text-sm">
            0.060000
          </div>

          {/* Chart bars representing price action */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-end gap-1">
            <div className="w-12 h-16 bg-green-600 rounded-sm opacity-70"></div>
            <div className="w-12 h-24 bg-green-500 rounded-sm"></div>
          </div>

          {/* Volume indicator */}
          <div className="absolute bottom-2 right-4 bg-green-600 text-white px-2 py-1 rounded text-xs">
            1.83K
          </div>

          {/* Time */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
            18:00
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 flex justify-between bg-gray-900/50">
        <button className="flex-1 bg-green-500 text-black font-bold py-3 rounded-lg mr-2">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Buy</span>
          </div>
        </button>
        <button className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg mx-2">
          <div className="flex items-center justify-center gap-2">
            <Target className="h-4 w-4" />
            <span>Sell</span>
          </div>
        </button>
        <button className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg ml-2">
          <div className="flex items-center justify-center gap-2">
            <MoreHorizontal className="h-4 w-4" />
            <span>Info</span>
          </div>
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 flex gap-6 border-b border-gray-800 overflow-x-auto">
        {[
          { key: "activity", label: "Activity", count: null },
          { key: "liquidity", label: "Liquidity", count: null },
          { key: "traders", label: "Traders", count: null },
          { key: "holders", label: "Holders", count: 66 },
          { key: "following", label: "Following", count: null },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "text-white border-green-500"
                : "text-gray-400 border-transparent"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count && (
              <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">
                {tab.count}
              </span>
            )}
            {tab.key === "following" && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Activity Filter Tabs */}
      {activeTab === "activity" && (
        <div className="px-4 py-3 flex gap-4 overflow-x-auto text-sm border-b border-gray-800">
          {[
            { key: "all", label: "All" },
            { key: "smart", label: "Smart" },
            { key: "kol", label: "KOL/VC" },
            { key: "following", label: "Following" },
            { key: "remarks", label: "Remarks" },
            { key: "dev", label: "DEV" },
            { key: "whale", label: "Whale" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActivityFilter(filter.key as any)}
              className={`pb-2 transition-colors whitespace-nowrap ${
                activityFilter === filter.key ? "text-white" : "text-gray-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* Activity Table Headers */}
      {activeTab === "activity" && (
        <div className="px-4 py-3 bg-gray-900/30">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1 w-12">
              <span>Age</span>
              <Clock className="h-3 w-3" />
              <Filter className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1 w-16">
              <span>Type</span>
              <Filter className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1 flex-1">
              <span>Total USD ($)</span>
              <Filter className="h-3 w-3" />
            </div>
            <div className="w-16 text-right">
              <span>Amount</span>
            </div>
          </div>
        </div>
      )}

      {/* Activity List */}
      {activeTab === "activity" && (
        <div className="pb-20">
          {activityData.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 border-b border-gray-800 flex items-center gap-4"
            >
              <div className="text-gray-400 text-sm w-12">{item.age}</div>
              <div
                className={`text-sm font-medium w-16 ${
                  item.type === "Buy" ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.type}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-white text-sm">
                  ${item.amount.toFixed(2)}
                </span>
                {item.isProfit && (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                )}
                {item.hasAlert && (
                  <AlertTriangle className="h-3 w-3 text-blue-400" />
                )}
              </div>
              <div className="w-16 text-right text-gray-400 text-sm">
                {item.usd}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Other tab content placeholders */}
      {activeTab !== "activity" && (
        <div className="px-4 py-8 text-center text-gray-400 pb-20">
          <div className="text-lg mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} data
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAnalysisPage;
