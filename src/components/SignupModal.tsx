import React, { useState } from "react";
import { X } from "lucide-react";
import { User } from "../types";
import { mockAPI } from "../services/mockAPI";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (user: User) => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSignup,
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("FKNvP6Qi");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      const user = await mockAPI.register(email, inviteCode);
      onSignup(user);
      onClose();
    } catch (err) {
      setError("Invalid invite code or email already exists");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Sign Up</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-green-400 hover:text-green-300"
          >
            Log In
          </button>
        </p>

        <div className="mb-4">
          <label className="text-white mb-2 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Email"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Invite Code"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
          />
          <p className="text-gray-400 text-sm mt-2">
            The invite code cannot be changed after binding. Please ensure the
            correct invite code is entered.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          onClick={handleSignup}
          disabled={isLoading || !email || !inviteCode}
          className="w-full bg-green-500 text-black font-bold py-3 rounded-lg mb-6 disabled:opacity-50 hover:bg-green-400 transition-colors"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="text-center text-gray-400 mb-6">OR Sign Up</div>

        <div className="flex justify-around mb-6">
          <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-xl">📱</span>
            </div>
            <span className="text-white text-sm">Telegram</span>
          </div>
          <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-xl">👻</span>
            </div>
            <span className="text-white text-sm">Phantom</span>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          {" | "}
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
