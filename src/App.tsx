// App.tsx (REPLACE YOUR EXISTING FILE)
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import TrenchesPage from "./pages/TrenchesPage";
import NewPairPage from "./pages/NewPairPage";
import TrendingPage from "./pages/TrendingPage";
import CopyTradePage from "./pages/CopyTradePage";
import WalletPage from "./pages/WalletPage";
import { User, Transaction, CopyTrader, Token, TabType } from "./types";
import { mockAPI } from "./services/mockAPI";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showWalletPage, setShowWalletPage] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [copyTraders, setCopyTraders] = useState<CopyTrader[]>([]);
  const [marketTokens, setMarketTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("trenches");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [transactionsData, tradersData, marketData] = await Promise.all([
          mockAPI.getTransactions(),
          mockAPI.getCopyTraders(),
          mockAPI.getMarketData(),
        ]);

        setTransactions(transactionsData);
        setCopyTraders(tradersData);
        setMarketTokens(marketData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("trenches");
    setShowWalletPage(false);
  };

  const handleShowWalletPage = (show: boolean) => {
    setShowWalletPage(show);
  };

  const handleBackFromWallet = () => {
    setShowWalletPage(false);
  };

  const handleFollowTrader = (traderId: string) => {
    setCopyTraders((traders) =>
      traders.map((trader) =>
        trader.id === traderId
          ? { ...trader, isFollowing: !trader.isFollowing }
          : trader
      )
    );
  };

  const handleCopyTrade = async (traderId: string, amount: number) => {
    try {
      const result = await mockAPI.copyTrade(traderId, amount);
      console.log("Copy trade executed:", result);
      const newTransactions = await mockAPI.getTransactions();
      setTransactions(newTransactions);
    } catch (error) {
      console.error("Copy trade failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐸</div>
          <div className="text-white text-xl font-bold mb-2">gmgn.ai</div>
          <div className="text-gray-400 text-sm">Loading trenches...</div>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show wallet page if it's active
  if (showWalletPage && user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <WalletPage user={user} onBack={handleBackFromWallet} />
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case "trenches":
        return <TrenchesPage tokens={marketTokens} />;
      case "newpair":
        return <NewPairPage onBack={() => setActiveTab("trenches")} />;
      case "trending":
        return <TrendingPage onBack={() => setActiveTab("trenches")} />;
      case "copytrade":
        return (
          <CopyTradePage
            traders={copyTraders}
            onFollow={handleFollowTrader}
            onCopyTrade={handleCopyTrade}
            onLogin={handleLogin}
            user={user}
          />
        );
      case "monitor":
        return (
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <div className="text-white text-xl font-bold mb-2">Monitor</div>
              <div className="text-gray-400 text-sm">Coming soon...</div>
            </div>
          </div>
        );
      case "follow":
        return (
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <div className="text-white text-xl font-bold mb-2">Follow</div>
              <div className="text-gray-400 text-sm">Coming soon...</div>
            </div>
          </div>
        );
      default:
        return <TrenchesPage tokens={marketTokens} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogin={() => setShowLoginModal(true)}
        onSignup={() => setShowSignupModal(true)}
        onLogout={handleLogout}
        onShowWalletPage={handleShowWalletPage}
      />

      <div className="pb-20">{renderActivePage()}</div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default App;
