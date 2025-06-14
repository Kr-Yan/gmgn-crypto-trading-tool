// pages/WalletPage.tsx
import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Copy,
  Users,
  Shield,
  RefreshCw,
  Filter,
  ExternalLink,
  X,
} from "lucide-react";
import { User } from "../types";
import CopyTradeCreationPage from "./CopyTradeCreationPage";

interface WalletPageProps {
  user: User;
  onBack: () => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<"7d" | "profit" | "distribution">(
    "7d"
  );
  const [timeFilter, setTimeFilter] = useState<"1d" | "7d" | "30d" | "all">(
    "7d"
  );
  const [activityTab, setActivityTab] = useState<
    "recent" | "holdings" | "activity" | "deployed"
  >("activity");
  const [showCopyCreation, setShowCopyCreation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopyTradeClick = () => {
    setShowCopyCreation(true);
  };

  const handleCopyCreationSuccess = () => {
    setShowCopyCreation(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBackFromCopyCreation = () => {
    setShowCopyCreation(false);
  };

  // Show copy creation page
  if (showCopyCreation) {
    return (
      <CopyTradeCreationPage
        selectedTrader={null} // No specific trader selected from wallet
        user={user}
        onBack={handleBackFromCopyCreation}
        onSuccess={handleCopyCreationSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Success message */}
      {showSuccess && (
        <div className="bg-green-600 text-white p-3 text-center mx-4 mb-4 rounded-lg">
          ✅ Copy trade created successfully!
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>

      {/* User Profile Section */}
      <div className="px-4 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black text-lg font-bold">👑</span>
            </div>
            <div>
              <div className="text-white font-bold">{user.walletAddress}</div>
              <button className="flex items-center gap-1 mt-1">
                <Copy className="h-3 w-3 text-gray-400" />
                <ExternalLink className="h-3 w-3 text-gray-400" />
                <RefreshCw className="h-3 w-3 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyTradeClick}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-600 transition-colors"
            >
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span>Copy trade</span>
            </button>
            <button className="bg-gray-700 text-white p-2 rounded-full">
              <Users className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
          <X className="h-3 w-3" />
          <span>Add Twitter</span>
        </button>
      </div>

      {/* Performance Tabs */}
      <div className="px-4 py-4 border-b border-gray-800">
        <div className="flex gap-6 mb-4">
          <button
            onClick={() => setActiveTab("7d")}
            className={`pb-2 ${
              activeTab === "7d"
                ? "text-white border-b-2 border-green-500"
                : "text-gray-400"
            }`}
          >
            7D PnL
          </button>
          <button
            onClick={() => setActiveTab("profit")}
            className={`pb-2 ${
              activeTab === "profit"
                ? "text-white border-b-2 border-green-500"
                : "text-gray-400"
            }`}
          >
            Profit
          </button>
          <button
            onClick={() => setActiveTab("distribution")}
            className={`pb-2 ${
              activeTab === "distribution"
                ? "text-white border-b-2 border-green-500"
                : "text-gray-400"
            }`}
          >
            Distribution
          </button>
        </div>

        {/* Time Filters */}
        <div className="flex gap-4 mb-6">
          {["1d", "7d", "30d", "all"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter as any)}
              className={`px-3 py-1 rounded text-sm ${
                timeFilter === filter
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              {filter === "all" ? "All" : filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">7D Realized PnL</span>
              <RefreshCw className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400">USD</span>
            </div>
            <div className="text-white text-3xl font-bold mb-1">0%</div>
            <div className="text-gray-400 text-sm">$0</div>
            <div className="text-gray-400 text-sm mt-2">Total PnL</div>
            <div className="text-gray-400 text-sm">Unrealized Profits</div>
            <div className="text-white">$0</div>
          </div>

          <div className="text-right">
            <div className="text-gray-400 mb-2">Win Rate</div>
            <div className="text-white text-3xl font-bold mb-1">0%</div>
            <div className="text-gray-400 text-sm">$0 (--)</div>
          </div>
        </div>
      </div>

      {/* Phishing Check Section */}
      <div className="px-4 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-white" />
          <span className="text-white font-bold">Phishing check</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Blacklist: 0 (0%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Didn't buy: 0 (0%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Sold &gt; Bought: 0 (0%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Buy/Sell within 5 secs: 0 (0%)</span>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="px-4 py-4 border-b border-gray-800">
        <div className="flex gap-6 mb-4">
          {[
            { key: "recent", label: "Recent PnL" },
            { key: "holdings", label: "Holdings" },
            { key: "activity", label: "Activity" },
            { key: "deployed", label: "Deployed Tokens" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActivityTab(tab.key as any)}
              className={`pb-2 whitespace-nowrap ${
                activityTab === tab.key
                  ? "text-white border-b-2 border-green-500"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button className="ml-auto text-gray-400">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {/* Table Headers */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>Type</span>
          <span>Token</span>
          <span>Total USD ($)</span>
          <span>Amount</span>
          <span>Price</span>
          <span>Profit</span>
          <span>Age</span>
        </div>
      </div>

      {/* No Data State */}
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <div className="text-gray-500 text-6xl mb-4">🗂️</div>
        <div className="text-gray-400 text-lg">No Data</div>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>
    </div>
  );
};

export default WalletPage;
