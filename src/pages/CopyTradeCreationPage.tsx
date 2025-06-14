import React, { useState } from "react";
import { X, Copy, ChevronDown } from "lucide-react";
import { CopyTrader, User } from "../types";

interface CopyTradeCreationPageProps {
  selectedTrader?: CopyTrader | null;
  user: User;
  onBack: () => void;
  onSuccess: () => void;
}

const CopyTradeCreationPage: React.FC<CopyTradeCreationPageProps> = ({
  selectedTrader,
  user,
  onBack,
  onSuccess,
}) => {
  const [copyAmount, setCopyAmount] = useState("");
  const [buyMethod, setBuyMethod] = useState<"max" | "fixed" | "ratio">("max");
  const [sellMethod, setSellMethod] = useState<"copy" | "not">("copy");
  const [slippageMethod, setSlippageMethod] = useState<"auto" | "custom">(
    "auto"
  );
  const [priorityFee, setPriorityFee] = useState("0.005");
  const [antiMEV, setAntiMEV] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmCopy = () => {
    if (copyAmount) {
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">CopyTrade</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">🎓 Tutorial</span>
          </div>
          <button onClick={onBack}>
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-green-600 text-white p-3 text-center">
          ✅ Copy trade created successfully!
        </div>
      )}

      <div className="p-4">
        {/* Lightning mode toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-yellow-400">
              Lightning mode, rapid on-chain
            </span>
            <div className="w-8 h-4 bg-yellow-500 rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </div>

        {/* Wallet selection */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <span>W1 Wallet</span>
            <span className="text-gray-400">{user.walletAddress}</span>
            <Copy className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-white rounded"></div>
            <span>{user.balance.toFixed(2)}</span>
          </div>
        </div>

        {/* Copy From */}
        <div className="mb-6">
          <h3 className="text-white mb-3">Copy From</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            {selectedTrader ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span>{selectedTrader.avatar}</span>
                </div>
                <div>
                  <div className="text-white font-bold">
                    {selectedTrader.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    Rank #{selectedTrader.rank}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-300 font-mono break-all">
                Select a trader to copy
              </div>
            )}
          </div>
        </div>

        {/* Buy options */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setBuyMethod("max")}
            className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
              buyMethod === "max"
                ? "bg-gray-700 border-green-500 text-white"
                : "bg-gray-800 border-gray-600 text-gray-300"
            }`}
          >
            <div className="text-sm">Max Buy Amount</div>
          </button>
          <button
            onClick={() => setBuyMethod("fixed")}
            className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
              buyMethod === "fixed"
                ? "bg-gray-700 border-green-500 text-white"
                : "bg-gray-800 border-gray-600 text-gray-300"
            }`}
          >
            <div className="text-sm">Fixed Buy</div>
          </button>
          <button
            onClick={() => setBuyMethod("ratio")}
            className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
              buyMethod === "ratio"
                ? "bg-gray-700 border-green-500 text-white"
                : "bg-gray-800 border-gray-600 text-gray-300"
            }`}
          >
            <div className="text-sm">Fixed Ratio</div>
          </button>
        </div>

        {/* Amount input */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Amount</span>
            <span className="text-gray-400">SOL</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={copyAmount}
                onChange={(e) => setCopyAmount(e.target.value)}
                placeholder="≈$0(0SOL)"
                className="bg-transparent text-white text-lg outline-none flex-1"
              />
              <span className="text-gray-400 text-sm">
                Bal: {user.balance.toFixed(2)}SOL
              </span>
            </div>
          </div>
        </div>

        {/* Sell Method */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white">Sell Method</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSellMethod("copy")}
              className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                sellMethod === "copy"
                  ? "bg-gray-700 border-green-500 text-white"
                  : "bg-gray-800 border-gray-600 text-gray-300"
              }`}
            >
              Copy Sells
            </button>
            <button
              onClick={() => setSellMethod("not")}
              className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                sellMethod === "not"
                  ? "bg-gray-700 border-green-500 text-white"
                  : "bg-gray-800 border-gray-600 text-gray-300"
              }`}
            >
              Not Sells
            </button>
          </div>
          <button className="w-full mt-3 text-gray-400 py-2">
            Customize TP & SL
          </button>
        </div>

        {/* Advanced Settings */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-white">Advanced Settings</span>
              <div className="bg-gray-600 text-xs px-2 py-1 rounded text-white">
                1
              </div>
              <span className="text-green-400">Open</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <button className="text-gray-400">🗑️ Clear</button>
          </div>

          {/* Settings row */}
          <div className="flex justify-between items-center mb-4 bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                ⚡
              </span>
              <span className="text-white">Auto</span>
              <span className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                🔄
              </span>
              <span className="text-white">0.005</span>
              <span className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                ≡
              </span>
              <span className="text-white">OFF</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Slippage</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSlippageMethod("auto")}
                  className={`px-4 py-2 rounded border-2 transition-colors ${
                    slippageMethod === "auto"
                      ? "bg-gray-700 border-green-500 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-400"
                  }`}
                >
                  Auto
                </button>
                <button
                  onClick={() => setSlippageMethod("custom")}
                  className={`px-4 py-2 rounded border-2 transition-colors ${
                    slippageMethod === "custom"
                      ? "bg-gray-700 border-green-500 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-400"
                  }`}
                >
                  Custom %
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Priority Fee(SOL)</span>
              <div className="flex gap-2 items-center">
                <span className="text-gray-400 text-sm">Auto 0.0021</span>
                <input
                  type="text"
                  value={priorityFee}
                  onChange={(e) => setPriorityFee(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-2 rounded w-20 text-center border-2 border-gray-600 focus:border-green-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Anti-MEV RPC</span>
              <button
                onClick={() => setAntiMEV(!antiMEV)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  antiMEV ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    antiMEV ? "right-0.5" : "left-0.5"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirmCopy}
          disabled={!copyAmount}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-lg mb-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </button>

        {/* Note */}
        <p className="text-gray-400 text-sm text-center px-4">
          Note: Ensure your account has enough balance for auto trading to run
          smoothly.
        </p>
      </div>
    </div>
  );
};

export default CopyTradeCreationPage;
