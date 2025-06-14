import React, { useState } from "react";
import { X, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { User } from "./types";
import { mockAPI } from "./services/mockAPI";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSwitchToSignup,
}) => {
  const [email, setEmail] = useState("demo@gmgn.ai");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const user = await mockAPI.login(email, password);
      onLogin(user);
      onClose();
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Log In</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Don't have an account yet?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-green-400 hover:text-green-300"
          >
            Sign Up
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
          <label className="text-white mb-2 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Password"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 pr-12 focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="text-right mt-2">
            <button
              type="button"
              className="text-green-400 text-sm hover:text-green-300"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-green-500 text-black font-bold py-3 rounded-lg mb-6 disabled:opacity-50 hover:bg-green-400 transition-colors"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <div className="text-center text-gray-400 mb-6">OR</div>

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
          <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-xl">📱</span>
            </div>
            <span className="text-white text-sm">APP Scan</span>
          </div>
        </div>

        <div className="text-center">
          <button className="text-white flex items-center justify-center mx-auto hover:text-green-400 transition-colors">
            Connect with extension wallet{" "}
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </button>
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

export default LoginModal;
