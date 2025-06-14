import React, { useState } from "react";
import {
  Filter,
  Copy,
  Users,
  Zap,
  ChevronDown,
  Pause,
  Edit,
  Square,
} from "lucide-react";
import { CopyTrader, User } from "../types";
import LoginModal from "../components/LoginModal";
import CopyTradeCreationPage from "./CopyTradeCreationPage";

interface CopyTradePageProps {
  traders: CopyTrader[];
  onFollow: (traderId: string) => void;
  onCopyTrade: (traderId: string, amount: number) => void;
  onLogin?: (userData: User) => void;
  user: User | null;
}

const CopyTradePage: React.FC<CopyTradePageProps> = ({
  traders,
  onFollow,
  onCopyTrade,
  onLogin,
  user,
}) => {
  const [activeView, setActiveView] = useState<"rank" | "copytrade">(
    "rank" as const
  );
  const [showCopyCreation, setShowCopyCreation] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<CopyTrader | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [copyTrades, setCopyTrades] = useState([
    {
      id: "1",
      wallet: "W1 Wallet",
      task: "o5JSY...xTy",
      avatar: "🔥",
      status: "Running",
      bought: "--",
      sold: "--",
      buySell: "0/0",
      realized: "--",
      lastActive: "--",
    },
  ]);

  // Mock data for the rank view
  const rankTraders = [
    {
      id: "1",
      name: "o5JSY...xTy",
      avatar: "🔥",
      rank: 1,
      pnl: 7585.4,
      pnlPercentage: 25.7,
      balance: 0.418,
      isVerified: true,
      data1d: "--",
      usd: "+25.7%",
      pnl7d: "+$7,585.4",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
    {
      id: "2",
      name: "6cSx5...UK8",
      avatar: "⚡",
      rank: 2,
      pnl: 13300,
      pnlPercentage: 24.8,
      balance: 0,
      isVerified: true,
      data1d: "--",
      usd: "+24.8%",
      pnl7d: "+$13.3K",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
    {
      id: "3",
      name: "2oJMe...BRZ",
      avatar: "💎",
      rank: 3,
      pnl: 947.9,
      pnlPercentage: 10.4,
      balance: 0.028,
      isVerified: true,
      data1d: "--",
      usd: "+10.4%",
      pnl7d: "+$947.9",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
    {
      id: "4",
      name: "4qP1j...dk9",
      avatar: "🚀",
      rank: 4,
      pnl: 1930.4,
      pnlPercentage: 10.0,
      balance: 0.03,
      isVerified: true,
      data1d: "--",
      usd: "+10%",
      pnl7d: "+$1,930.4",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
    {
      id: "5",
      name: "HscRE...rwr",
      avatar: "🦄",
      rank: 5,
      pnl: 1291.8,
      pnlPercentage: 9.8,
      balance: 0.039,
      isVerified: true,
      data1d: "--",
      usd: "+9.8%",
      pnl7d: "+$1,291.8",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
    {
      id: "6",
      name: "5HNeh...rzq",
      avatar: "⭐",
      rank: 6,
      pnl: 12700,
      pnlPercentage: 9.2,
      balance: 84.54,
      isVerified: true,
      data1d: "+10.5%",
      usd: "+9.2%",
      pnl7d: "+$12.7K",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
    {
      id: "7",
      name: "7GMZy...upZ",
      avatar: "💯",
      rank: 7,
      pnl: 3235.7,
      pnlPercentage: 9.1,
      balance: 0.013,
      isVerified: true,
      data1d: "--",
      usd: "+9.1%",
      pnl7d: "+$3,235.7",
      pnl30d: "--",
      winRate: "--",
      txs: "--",
      distribution: "--",
      profit: "--",
    },
  ];

  const handleCopyClick = (trader: any) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Convert rank trader to CopyTrader format
    const copyTrader: CopyTrader = {
      id: trader.id,
      name: trader.name,
      avatar: trader.avatar,
      rank: trader.rank,
      pnl: trader.pnl,
      pnlPercentage: trader.pnlPercentage,
      followers: 0,
      winRate: 0,
      isFollowing: false,
      balance: trader.balance,
      totalTrades: 0,
      avgTradeSize: 0,
      recentTrades: [],
    };

    setSelectedTrader(copyTrader);
    setShowCopyCreation(true);
  };

  const handleCreateCopyTrade = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedTrader(null); // No specific trader selected
    setShowCopyCreation(true);
  };

  const handleCopyCreationSuccess = () => {
    setShowCopyCreation(false);
    setSelectedTrader(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBackFromCopyCreation = () => {
    setShowCopyCreation(false);
    setSelectedTrader(null);
  };

  // Show copy creation page
  if (showCopyCreation && user) {
    return (
      <CopyTradeCreationPage
        selectedTrader={selectedTrader}
        user={user}
        onBack={handleBackFromCopyCreation}
        onSuccess={handleCopyCreationSuccess}
      />
    );
  }

  if (activeView === "copytrade") {
    if (!user) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-white text-lg mb-8">
              Connect your MGN private key account to use copy trading
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Log in
            </button>
          </div>

          {/* Login Modal */}
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={(userData) => {
              if (onLogin) onLogin(userData);
              setShowLoginModal(false);
            }}
            onSwitchToSignup={() => {
              // Handle switch to signup if needed
            }}
          />
        </div>
      );
    }

    // Logged in CopyTrade view - showing active copy trades
    return (
      <div>
        {/* Success message */}
        {showSuccess && (
          <div className="bg-green-600 text-white p-3 text-center mx-4 mb-4 rounded-lg">
            ✅ Copy trade created successfully!
          </div>
        )}

        {/* Copy Trade Header */}
        <div className="px-4 py-3 bg-gray-900/30">
          <div className="flex items-center justify-between mb-4">
            {/* Left side - Rank/CopyTrade toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveView("rank")}
                className={`text-lg font-bold ${
                  (activeView as "rank" | "copytrade") === "rank"
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                Rank
              </button>
              <button
                onClick={() => setActiveView("copytrade")}
                className={`bg-gray-700 text-white text-sm font-medium px-3 py-1.5 rounded ${
                  (activeView as "rank" | "copytrade") === "copytrade"
                    ? "bg-gray-600"
                    : ""
                }`}
              >
                CopyTrade
              </button>
            </div>

            {/* Right side - 0-Latency Alert and Create button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-600 rounded-lg px-3 py-1.5">
                <span className="text-white text-sm">📱</span>
                <span className="text-white text-sm font-medium">
                  0-Latency Alert
                </span>
              </div>
              <button
                onClick={handleCreateCopyTrade}
                className="bg-white text-black font-bold px-4 py-1.5 rounded-lg flex items-center gap-2"
              >
                <span className="text-lg">📋</span>
                <span>Create Copy Trade</span>
              </button>
            </div>
          </div>
        </div>

        {/* Column Headers */}
        <div className="px-4 py-2 bg-gray-800/50">
          <div className="flex gap-4">
            {/* Fixed columns */}
            <div
              className="flex gap-8 flex-shrink-0"
              style={{ width: "300px" }}
            >
              <span className="text-gray-400 text-sm">Wallet</span>
              <span className="text-gray-400 text-sm">Task</span>
            </div>

            {/* Scrollable columns */}
            <div className="flex gap-8 overflow-x-auto scrollbar-thin">
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Bought
              </span>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Sold
              </span>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Buy/Sell
              </span>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Realized
              </span>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Last Active
              </span>
            </div>
          </div>
        </div>

        {/* Copy Trade List */}
        <div className="pb-20">
          {copyTrades.map((trade) => (
            <div
              key={trade.id}
              className="bg-gray-900/70 rounded-lg p-3 mx-4 mb-3 border border-gray-700/50"
            >
              <div className="flex gap-4 items-center">
                {/* Fixed columns */}
                <div
                  className="flex gap-8 flex-shrink-0"
                  style={{ width: "300px" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                    <span className="text-white text-sm">{trade.wallet}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span>{trade.avatar}</span>
                    </div>
                    <span className="text-white text-sm">{trade.task}</span>
                    <Copy className="h-3 w-3 text-gray-500" />
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-xs">
                      {trade.status}
                    </span>
                  </div>
                </div>

                {/* Scrollable data */}
                <div className="flex gap-8 overflow-x-auto scrollbar-thin">
                  <span className="text-gray-400 text-sm whitespace-nowrap">
                    {trade.bought}
                  </span>
                  <span className="text-gray-400 text-sm whitespace-nowrap">
                    {trade.sold}
                  </span>
                  <span className="text-white text-sm whitespace-nowrap">
                    {trade.buySell}
                  </span>
                  <span className="text-gray-400 text-sm whitespace-nowrap">
                    {trade.realized}
                  </span>
                  <span className="text-gray-400 text-sm whitespace-nowrap">
                    {trade.lastActive}
                  </span>
                </div>

                {/* Action buttons - fixed on the right */}
                <div className="flex gap-2 ml-auto flex-shrink-0">
                  <button className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded text-xs">
                    <Pause className="h-3 w-3" />
                    Pause
                  </button>
                  <button className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded text-xs">
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded text-xs">
                    <Square className="h-3 w-3" />
                    Stop
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Rank view (default)
  return (
    <div>
      {/* Success message */}
      {showSuccess && (
        <div className="bg-green-600 text-white p-3 text-center mx-4 mb-4 rounded-lg">
          ✅ Copy trade created successfully!
        </div>
      )}

      {/* Copy Trade Header */}
      <div className="px-4 py-3 bg-gray-900/30">
        <div className="flex items-center justify-between mb-4">
          {/* Left side - Rank/CopyTrade toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView("rank")}
              className={`text-lg font-bold ${
                (activeView as "rank" | "copytrade") === "rank"
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              Rank
            </button>
            <button
              onClick={() => setActiveView("copytrade")}
              className={`bg-gray-700 text-white text-sm font-medium px-3 py-1.5 rounded ${
                (activeView as "rank" | "copytrade") === "copytrade"
                  ? "bg-gray-600"
                  : ""
              }`}
            >
              CopyTrade
            </button>
          </div>

          {/* Right side - 0-Latency Alert */}
          <div className="flex items-center gap-2 bg-blue-600 rounded-lg px-3 py-1.5">
            <span className="text-white text-sm">📱</span>
            <span className="text-white text-sm font-medium">
              0-Latency Alert
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4 overflow-x-auto">
          <button className="bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap">
            All
          </button>
          <button className="text-gray-400 px-3 py-1.5 rounded text-sm whitespace-nowrap">
            Smart Money
          </button>
          <button className="text-gray-400 px-3 py-1.5 rounded text-sm whitespace-nowrap">
            KOL/VC
          </button>
          <button className="text-gray-400 px-3 py-1.5 rounded text-sm whitespace-nowrap">
            Fresh Wallet
          </button>
          <button className="text-gray-400 px-3 py-1.5 rounded text-sm whitespace-nowrap">
            Sniper
          </button>
        </div>

        {/* Column Headers */}
        <div className="flex gap-4 mb-4">
          {/* Fixed column */}
          <div className="flex-shrink-0" style={{ width: "200px" }}>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm">Wallet / SOL Bal</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Horizontally scrollable column headers */}
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-thin">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-gray-400 text-sm">1D PnL</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-gray-400 text-sm">USD</span>
              <span className="text-gray-400 text-sm">💲</span>
              <Filter className="h-3 w-3 text-gray-400 ml-1" />
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-green-400 text-sm font-medium">7D PnL</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
              <Filter className="h-3 w-3 text-gray-400 ml-1" />
            </div>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              30D PnL
            </span>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              7D Win Rate
            </span>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              7D TXs
            </span>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              7D Token Distribution
            </span>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              7D Profit
            </span>
          </div>
        </div>
      </div>

      {/* Traders List */}
      <div className="pb-20">
        {rankTraders.map((trader) => (
          <div
            key={trader.id}
            className="bg-gray-900/70 rounded-lg p-3 mx-4 mb-3 border border-gray-700/50"
          >
            <div className="flex items-center gap-4">
              {/* Left side - Trader info (fixed width) */}
              <div
                className="flex items-center gap-3 flex-shrink-0"
                style={{ width: "200px" }}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center border-2 border-green-500">
                    <span className="text-lg">{trader.avatar}</span>
                  </div>
                  <div className="absolute -top-1 -left-1 bg-yellow-500 rounded-full px-1.5 py-0.5 text-xs text-black font-bold min-w-6 text-center">
                    {trader.rank}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                    <Zap className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">
                      {trader.name}
                    </span>
                    <Copy className="h-3 w-3 text-gray-500" />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-gray-400" />
                      <span className="text-white text-xs">
                        {trader.balance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable data values matching headers */}
              <div className="flex items-center gap-8 overflow-x-auto scrollbar-thin">
                <div className="text-gray-400 text-sm whitespace-nowrap">
                  {trader.data1d}
                </div>
                <div
                  className={`text-sm whitespace-nowrap ${
                    trader.pnlPercentage > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trader.usd}
                </div>
                <div className="text-white text-sm whitespace-nowrap">
                  {trader.pnl7d}
                </div>
                <div className="text-gray-400 text-sm whitespace-nowrap">
                  {trader.pnl30d}
                </div>
                <div className="text-gray-400 text-sm whitespace-nowrap">
                  {trader.winRate}
                </div>
                <div className="text-gray-400 text-sm whitespace-nowrap">
                  {trader.txs}
                </div>
                <div className="text-gray-400 text-sm whitespace-nowrap">
                  {trader.distribution}
                </div>
                <div className="text-gray-400 text-sm whitespace-nowrap">
                  {trader.profit}
                </div>
              </div>

              {/* Copy button - fixed on the right, outside scrollable area */}
              <button
                onClick={() => handleCopyClick(trader)}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded text-sm font-bold transition-colors flex-shrink-0 ml-auto"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(userData) => {
          if (onLogin) onLogin(userData);
          setShowLoginModal(false);
        }}
        onSwitchToSignup={() => {
          // Handle switch to signup if needed
        }}
      />
    </div>
  );
};

export default CopyTradePage;
