// components/WalletDropdown.tsx
import React from "react";
import { Shield, RefreshCw, Bell, Plus, LogOut, Trophy } from "lucide-react";
import { User } from "../types";

interface WalletDropdownProps {
  user: User;
  onSelectWallet: () => void;
  onLogout: () => void;
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({
  user,
  onSelectWallet,
  onLogout,
}) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-lg border border-gray-600 shadow-lg z-50">
      {/* My Wallet */}
      <button
        onClick={onSelectWallet}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-t-lg text-left"
      >
        <div className="w-5 h-5 border border-gray-400 rounded"></div>
        <span className="text-white">My Wallet</span>
      </button>

      {/* Wallet Manager */}
      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-left">
        <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
          <div className="w-3 h-3 border border-gray-400 rounded"></div>
        </div>
        <span className="text-white">Wallet Manager</span>
      </button>

      {/* Security */}
      <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 text-left">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <span className="text-white">Security</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-red-400 text-sm">Not Bound</span>
        </div>
      </button>

      {/* Referral */}
      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-left">
        <RefreshCw className="w-5 h-5 text-gray-400" />
        <span className="text-white">Referral</span>
      </button>

      {/* Contest */}
      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-left relative">
        <Trophy className="w-5 h-5 text-gray-400" />
        <span className="text-white">Contest(S6)</span>
        <div className="absolute right-4 top-2 w-8 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">⭐</span>
        </div>
      </button>

      {/* Deposit/Withdraw/Buy */}
      <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 text-left">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-gray-400" />
          <span className="text-white">Deposit/Withdraw/Buy</span>
        </div>
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      </button>

      {/* TG Alert */}
      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-left">
        <Bell className="w-5 h-5 text-gray-400" />
        <span className="text-white">TG Alert</span>
      </button>

      {/* Add Twitter */}
      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-left">
        <Plus className="w-5 h-5 text-gray-400" />
        <span className="text-white">Add Twitter</span>
      </button>

      {/* Disconnect */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-b-lg text-left"
      >
        <LogOut className="w-5 h-5 text-gray-400" />
        <span className="text-white">Disconnect</span>
      </button>
    </div>
  );
};

export default WalletDropdown;
