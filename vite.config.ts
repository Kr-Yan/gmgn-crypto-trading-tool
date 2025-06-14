import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/gmgn-crypto-trading-tool/", // This must match your repo name exactly
});
