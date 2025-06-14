// components/Header.tsx (REPLACE YOUR EXISTING FILE)
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { User, TabType } from "../types";
import WalletDropdown from "./WalletDropdown";

interface HeaderProps {
  user: User | null;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onShowWalletPage: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogin,
  onSignup,
  onLogout,
  onShowWalletPage,
}) => {
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const handleWalletClick = () => {
    if (user) {
      setShowWalletDropdown(!showWalletDropdown);
    }
  };

  const handleSelectWallet = () => {
    setShowWalletDropdown(false);
    onShowWalletPage(true);
  };

  const handleLogout = () => {
    setShowWalletDropdown(false);
    onLogout();
  };

  return (
    <div className="bg-black px-4 pt-3 pb-4">
      {/* Top row with logo, SOL, search, settings, auth buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* GMGN Logo - UPDATED SECTION */}
          <div className="relative">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center overflow-hidden">
              <img
                src="/img1.png"
                alt="GMGN"
                className="w-full h-full object-contain"
                style={{
                  imageRendering: "pixelated",
                }}
                onError={(e) => {
                  // Fallback to frog emoji if image fails to load
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.backgroundColor = "#22c55e";
                    parent.innerHTML =
                      '<span class="text-white text-lg">🐸</span>';
                  }
                }}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* SOL with dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-white font-medium text-sm">SOL</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          {/* Search icon */}
          <Search className="h-5 w-5 text-gray-400" />

          {/* Settings icon - circular border */}
          <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
        </div>

        {/* Right side - Auth buttons or Wallet */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-white text-sm font-medium">
                  {user.email}
                </div>
                <div className="text-gray-400 text-xs">
                  {user.balance.toFixed(2)} SOL
                </div>
              </div>

              {/* Wallet Integration */}
              <div className="relative">
                <button
                  onClick={handleWalletClick}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <div className="w-4 h-4 border border-gray-400 rounded"></div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {/* Wallet Dropdown */}
                {showWalletDropdown && (
                  <WalletDropdown
                    user={user}
                    onSelectWallet={handleSelectWallet}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={onSignup}
                className="text-gray-300 text-sm font-medium px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={onLogin}
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-6 text-sm mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("trenches")}
          className={`whitespace-nowrap pb-1 transition-colors ${
            activeTab === "trenches"
              ? "text-white font-medium border-b-2 border-green-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Trenches
        </button>
        <button
          onClick={() => setActiveTab("newpair")}
          className={`whitespace-nowrap pb-1 transition-colors ${
            activeTab === "newpair"
              ? "text-white font-medium border-b-2 border-green-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          New pair
        </button>
        <button
          onClick={() => setActiveTab("trending")}
          className={`whitespace-nowrap pb-1 transition-colors ${
            activeTab === "trending"
              ? "text-white font-medium border-b-2 border-green-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab("copytrade")}
          className={`whitespace-nowrap pb-1 transition-colors ${
            activeTab === "copytrade"
              ? "text-white font-medium border-b-2 border-green-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          CopyTrade
        </button>
        <button
          onClick={() => setActiveTab("monitor")}
          className={`whitespace-nowrap pb-1 transition-colors ${
            activeTab === "monitor"
              ? "text-white font-medium border-b-2 border-green-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Monitor
        </button>
        <button
          onClick={() => setActiveTab("follow")}
          className={`whitespace-nowrap pb-1 transition-colors ${
            activeTab === "follow"
              ? "text-white font-medium border-b-2 border-green-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default Header;
