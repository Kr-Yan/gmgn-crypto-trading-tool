// Updated TrenchesPage.tsx
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Filter,
  Search,
  Zap,
  Users,
  Clock,
  Crown,
  Copy,
  Globe,
  RefreshCw,
} from "lucide-react";
import { Token, TokenStatusFilter } from "../types";
import { mockAPI } from "../services/mockAPI";
import MarketAnalysisPage from "../MarketAnalysis";

interface TrenchesPageProps {
  tokens: Token[];
}

const TrenchesPage: React.FC<TrenchesPageProps> = ({
  tokens: initialTokens,
}) => {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [statusFilter, setStatusFilter] = useState<TokenStatusFilter>("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      setIsLoading(true);
      try {
        const filteredTokens = await mockAPI.getMarketData(statusFilter);
        setTokens(filteredTokens);
      } catch (error) {
        console.error("Failed to load tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, [statusFilter]);

  const handleStatusFilterChange = (newFilter: TokenStatusFilter) => {
    setStatusFilter(newFilter);
    setShowStatusDropdown(false);
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
  };

  const handleBackFromAnalysis = () => {
    setSelectedToken(null);
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusDisplayText = () => {
    switch (statusFilter) {
      case "completing":
        return "Completing";
      case "completed":
        return "Completed";
      default:
        return "New Creations";
    }
  };

  const getStatusCount = (status: TokenStatusFilter) => {
    if (status === "all") return tokens.length;
    return tokens.filter((token) => token.status === status).length;
  };

  // Show market analysis page if a token is selected
  if (selectedToken) {
    return (
      <MarketAnalysisPage
        tokenData={{
          symbol: selectedToken.symbol,
          name: selectedToken.name,
          price: selectedToken.price,
          change24h: selectedToken.change24h,
          contract: selectedToken.contract,
          avatar: selectedToken.avatar,
        }}
        onBack={handleBackFromAnalysis}
      />
    );
  }

  return (
    <div>
      {/* Trenches Header */}
      <div className="flex items-center gap-3 mb-4 px-4">
        <span className="text-2xl">🏔️</span>
        <span className="text-white font-bold text-xl">Trenches</span>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mb-6 px-4">
        {/* Left controls */}
        <div className="flex items-center gap-3">
          {/* Grid icon */}
          <div className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* Users icon */}
          <div className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>

          {/* Filter lines icon */}
          <div className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center">
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-0.5 bg-white rounded"></div>
              <div className="w-3 h-0.5 bg-white rounded"></div>
              <div className="w-3 h-0.5 bg-white rounded"></div>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Lightning section with colored bars */}
          <div className="bg-gray-800 rounded-lg px-3 py-1.5 flex items-center gap-2 border border-gray-600">
            <Zap className="h-4 w-4 text-green-400" />
            <div className="flex gap-1">
              <div className="w-4 h-0.5 bg-purple-500 rounded"></div>
              <div className="w-4 h-0.5 bg-blue-500 rounded"></div>
              <div className="w-4 h-0.5 bg-green-500 rounded"></div>
            </div>
            <span className="text-white text-sm font-medium">0</span>
          </div>

          {/* P1 dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-white text-sm font-medium">P1</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>

          {/* Settings circle */}
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* New Creations Header with Dropdown */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/30">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌱</span>
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 text-white font-bold text-lg"
            >
              {getStatusDisplayText()}
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  showStatusDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded-lg border border-gray-600 shadow-lg z-10 min-w-48">
                <button
                  onClick={() => handleStatusFilterChange("all")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 rounded-t-lg ${
                    statusFilter === "all"
                      ? "bg-gray-700 text-green-400"
                      : "text-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>All New Creations</span>
                    <span className="text-gray-400 text-sm">
                      ({getStatusCount("all")})
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => handleStatusFilterChange("completing")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 ${
                    statusFilter === "completing"
                      ? "bg-gray-700 text-green-400"
                      : "text-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>Completing</span>
                    <span className="text-gray-400 text-sm">
                      ({getStatusCount("completing")})
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Tokens in progress
                  </div>
                </button>
                <button
                  onClick={() => handleStatusFilterChange("completed")}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-700 rounded-b-lg ${
                    statusFilter === "completed"
                      ? "bg-gray-700 text-green-400"
                      : "text-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>Completed</span>
                    <span className="text-gray-400 text-sm">
                      ({getStatusCount("completed")})
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Fully launched tokens
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 w-28 focus:outline-none focus:border-gray-500"
            />
          </div>

          <button className="flex items-center gap-2 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      )}

      {/* Token List - Now clickable */}
      <div className="pb-20">
        {filteredTokens.length === 0 && !isLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-lg mb-2">No tokens found</div>
            <div className="text-gray-500 text-sm">
              {searchTerm
                ? "Try a different search term"
                : "No tokens match the current filter"}
            </div>
          </div>
        ) : (
          filteredTokens.map((token) => (
            <div
              key={token.id}
              onClick={() => handleTokenClick(token)}
              className="bg-gray-900/70 rounded-lg p-3 mx-4 mb-3 border border-gray-700/50 cursor-pointer hover:bg-gray-800/70 transition-colors"
            >
              {/* Rest of the token card JSX remains the same as in your original TrenchesPage */}
              <div className="flex items-start gap-3">
                {/* Avatar section */}
                <div className="relative flex-shrink-0">
                  {token.avatar === "trump" ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500">
                      <div className="w-full h-full bg-gradient-to-b from-orange-300 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
                        DT
                      </div>
                    </div>
                  ) : token.avatar === "military" ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500">
                      <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white">
                        WZ
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 ${
                        token.symbol === "PEOPL..."
                          ? "bg-gradient-to-br from-red-500 to-yellow-500"
                          : "bg-gray-700"
                      } rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-green-500`}
                    >
                      {token.symbol === "WWI50..."
                        ? "WW"
                        : token.symbol === "PEOPL..."
                        ? "PEOPLE"
                        : token.symbol === "WZ"
                        ? "WZ"
                        : token.avatar}
                    </div>
                  )}

                  {/* Green check indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Content section */}
                <div className="flex-1 min-w-0">
                  {/* Header row with token name and lightning */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold text-base">
                          {token.symbol}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {token.name}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-full p-1.5 flex-shrink-0">
                      <Zap className="h-4 w-4 text-green-400" />
                    </div>
                  </div>

                  {/* Time and contract row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-400 text-sm">
                      {token.timeAgo}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-sm font-mono">
                        {token.contract}
                      </span>
                      <Copy className="h-3 w-3 text-gray-500" />
                    </div>
                    <Search className="h-3 w-3 text-gray-500" />

                    {/* Icons section */}
                    <div className="flex items-center gap-2 ml-auto">
                      {token.symbol === "WWI50..." && (
                        <>
                          <div className="flex items-center gap-1">
                            <Crown className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-yellow-500 text-xs font-medium">
                              4
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-300 text-sm">2</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-xs">TX</span>
                            <span className="text-gray-300 text-sm">3</span>
                          </div>
                        </>
                      )}
                      {token.symbol === "$TRUM..." && (
                        <>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-300 text-sm">4</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-xs">TX</span>
                            <span className="text-gray-300 text-sm">3</span>
                          </div>
                        </>
                      )}
                      {token.symbol === "PEOPL..." && (
                        <>
                          <div className="flex items-center gap-1">
                            <Crown className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-yellow-500 text-xs font-medium">
                              3
                            </span>
                          </div>
                          <RefreshCw className="h-3 w-3 text-gray-500" />
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-300 text-sm">5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-xs">TX</span>
                            <span className="text-gray-300 text-sm">10</span>
                          </div>
                        </>
                      )}
                      {token.symbol === "WZ" && (
                        <>
                          <Globe className="h-3 w-3 text-gray-500" />
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-300 text-sm">4</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-xs">TX</span>
                            <span className="text-gray-300 text-sm">3</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Progress indicators row */}
                  <div className="flex items-center gap-4 mb-3">
                    {/* Progress percentages and indicators */}
                    {token.symbol === "WWI50..." && (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="text-pink-400 text-sm font-medium">
                            9.5%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-green-500" />
                          <span className="text-green-400 text-sm font-medium">
                            3%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                          <span className="text-green-400 text-sm font-medium">
                            3%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-red-500" />
                          <span className="text-red-400 text-sm font-medium">
                            1
                          </span>
                        </div>
                      </>
                    )}
                    {token.symbol === "$TRUM..." && (
                      <>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-pink-500" />
                          <span className="text-pink-400 text-sm font-medium">
                            100%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-red-500" />
                          <span className="text-red-400 text-sm font-medium">
                            3
                          </span>
                        </div>
                      </>
                    )}
                    {token.symbol === "PEOPL..." && (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="text-pink-400 text-sm font-medium">
                            15.2%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-green-500" />
                          <span className="text-green-400 text-sm font-medium">
                            8%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                          <span className="text-green-400 text-sm font-medium">
                            8%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-red-500" />
                          <span className="text-red-400 text-sm font-medium">
                            4
                          </span>
                        </div>
                      </>
                    )}
                    {token.symbol === "WZ" && (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="text-pink-400 text-sm font-medium">
                            10.2%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-green-500" />
                          <span className="text-green-400 text-sm font-medium">
                            8%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                          <span className="text-green-400 text-sm font-medium">
                            8%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-red-500" />
                          <span className="text-red-400 text-sm font-medium">
                            3
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Volume and Market Cap row */}
                  <div className="flex items-center justify-end gap-4">
                    <div className="text-right">
                      <div className="text-gray-400 text-xs">V</div>
                      <div className="text-white text-sm font-medium">
                        ${token.volume.toFixed(1)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-gray-400 text-xs">MC</div>
                      <div className="text-white text-sm font-medium">
                        $
                        {token.marketCap > 1000
                          ? `${(token.marketCap / 1000).toFixed(1)}K`
                          : token.marketCap.toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrenchesPage;
