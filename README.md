# Crypto-trading-tool

# 🐸 GMGN.ai - Copy Trading Platform

A modern, mobile-first cryptocurrency copy trading platform built with React and TypeScript. Discover trending tokens, follow successful traders, and automate your trading strategy.

![GMGN.ai Preview](https://via.placeholder.com/800x400/000000/22c55e?text=GMGN.ai+Copy+Trading+Platform)

## ✨ Features

### 🎯 **Core Functionality**

- **Token Discovery**: Browse new pairs, trending tokens, and market data
- **Copy Trading**: Automatically copy trades from successful traders
- **Real-time Analytics**: Live market data, price charts, and performance metrics
- **Wallet Integration**: Connect wallets, manage balances, and track portfolio
- **Advanced Trading**: Slippage control, priority fees, anti-MEV protection

### 📱 **User Experience**

- **Mobile-First Design**: Optimized for mobile trading on the go
- **Dark Theme**: Professional trading interface with green accents
- **Responsive Tables**: Horizontal scrolling for complex data tables
- **Real-time Updates**: Live price feeds and trading activity
- **Progressive Disclosure**: Advanced settings hidden until needed

### 🔐 **Security & Authentication**

- **Multiple Login Options**: Email, Telegram, Phantom wallet
- **Invite Code System**: Controlled user registration
- **Phishing Protection**: Built-in security checks and audit features
- **Wallet Security**: Non-custodial wallet integration

## 🧠 Development Approach
This project was independently developed with a focus on production readiness, developer experience, and responsive UX. I incorporated automated workflows, clean component architecture, and thorough documentation throughout.

### **Key Contributions**
Component Architecture: Designed a modular React component structure for maintainability

TypeScript Best Practices: Wrote strongly typed components and services

Refactoring: Optimized performance and code readability through iterative improvements

Design System: Created consistent UI patterns using Tailwind CSS

Documentation: Authored detailed README, usage guides, and inline comments

### **Workflow**
Requirements Breakdown: Translated trading concepts into technical features

Architecture Design: Structured data flow and layout with flexibility in mind

Component Development: Built reusable components from scratch

Testing and Optimization: Iteratively improved performance and user flow

Documentation and Deployment: Provided guides and multi-platform deployment options

### **Benefits Achieved**
⚡ Fast Iteration: Efficient development cycle from design to deployment

🎯 High Code Quality: Consistent use of TS, modularization, and reusable logic

📱 Polished UX: Fully responsive interface with real-time updates

🔄 Maintainability: Clean abstractions for copy trading logic and analytics

📚 Complete Documentation: Usage guide, demo credentials, and deployment steps


## 🏗️ Project Structure

src/
├── components/ # Reusable UI components
│ ├── Header.tsx # Main navigation and wallet integration
│ ├── LoginModal.tsx # Authentication modal
│ ├── SignupModal.tsx # User registration modal
│ └── WalletDropdown.tsx # Wallet management dropdown
├── pages/ # Main application pages
│ ├── TrenchesPage.tsx # Token discovery and market data
│ ├── NewPairPage.tsx # Recently launched token pairs
│ ├── TrendingPage.tsx # Trending tokens with analytics
│ ├── CopyTradePage.tsx # Copy trading dashboard
│ ├── CopyTradeCreationPage.tsx # Copy trade configuration
│ ├── WalletPage.tsx # Wallet management and portfolio
│ └── MarketAnalysisPage.tsx # Individual token analysis
├── services/ # API and data services
│ └── mockAPI.ts # Mock backend for development
├── types/ # TypeScript type definitions
│ └── index.ts # Core application types
├── App.tsx # Main application component
├── App.css # Global styles and animations
└── main.tsx # Application entry point

## 🚀 Quick Deployment Guide

### **Method 1: Vercel (Recommended)**

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

### **Method 2: Netlify**

```bash
npm run build
```

- Go to [Netlify](https://www.netlify.com)
- Drag & drop the `dist/` folder
- Or connect your GitHub repository for automatic deploys

---

### **Method 3: Docker**

**Dockerfile**

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Build & Run**

```bash
docker build -t gmgn-app .
docker run -p 3000:3000 gmgn-app
```

---

### **Method 4: GitHub Pages**

**Install:**

```bash
npm install --save-dev gh-pages
```

**Update `package.json`:**

```json
{
  "homepage": "https://yourusername.github.io/gmgn-copy-trading",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Deploy:**

```bash
npm run deploy
```

---

## 🛠️ Local Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Modern browser

### Installation

```bash
git clone https://github.com/yourusername/gmgn-copy-trading.git
cd gmgn-copy-trading
npm install   # or yarn install
npm run dev   # or yarn dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Demo Credentials

- **Email**: demo@gmgn.ai
- **Password**: demo123
- **Invite Code**: FKNvP6Qi

---

## 🎮 Usage Guide

### 🔍 Token Discovery

- Browse **Trenches**, **New Pairs**, **Trending**
- Filter by status: All / Completing / Completed
- Click token for detailed analytics
- Track market performance

### 👥 Copy Trading

- Discover top traders
- Analyze PnL, win rates
- Click **Copy**
- Configure amount & method
- Confirm
- Monitor active trades

### 💼 Wallet Management

- Connect via dropdown
- View portfolio in **My Wallet**
- Manage trades
- Phishing protection overview

---

## 🛠️ Technical Stack

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- Vite

### State Management

- `useState`, `useEffect`
- Custom Hooks
- Context API

### API & Data

- Mock API
- Simulated live updates
- Local storage

### Styling & UX

- Mobile-first
- Dark theme
- Custom animations
- ARIA + keyboard support

---

## 🔧 Environment Configuration

### `.env.local`

```env
VITE_API_URL=https://api.gmgn.ai
VITE_WALLET_CONNECT_ID=your_wallet_connect_id
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn
```

### Deployment Environments

#### Vercel / Netlify

Add environment variables via Dashboard

#### Docker

```bash
docker run -p 3000:3000 \
  -e VITE_API_URL=https://api.gmgn.ai \
  -e VITE_WALLET_CONNECT_ID=your_id \
  gmgn-app
```

---

## 📱 Responsive Design

- **Mobile (320px+)**: Single-column
- **Tablet (768px+)**: Two-column
- **Desktop (1024px+)**: Multi-column

### Key Features

- Scrollable tables
- Collapsible navigation
- Touch-friendly controls
- Optimized modals

---

## 🧪 Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript compile
npm run test         # Run test suite
```

---

## 📈 Production Deployment Checklist

### Pre-Deployment

- ✅ Run `npm run build`
- ✅ Test build with `npm run preview`
- ✅ Set all environment variables
- ✅ Run `npm run type-check`
- ✅ Run `npm run lint`
- ✅ Responsive tests

### Performance

- Bundle size: `npm run build -- --analyze`
- Lighthouse score > 90
- Lazy loading images
- Service worker (optional)

### Security

- No hardcoded secrets
- HTTPS only
- CSP configured
- Input validation
- Secure authentication flow

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Guidelines

- Follow code style
- Add TypeScript types
- Consider responsiveness
- Update docs
- Test on devices

---




## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.


## 🏗️ Project Structure

src/
├── components/ # Reusable UI components
│ ├── Header.tsx # Main navigation and wallet integration
│ ├── LoginModal.tsx # Authentication modal
│ ├── SignupModal.tsx # User registration modal
│ └── WalletDropdown.tsx # Wallet management dropdown
├── pages/ # Main application pages
│ ├── TrenchesPage.tsx # Token discovery and market data
│ ├── NewPairPage.tsx # Recently launched token pairs
│ ├── TrendingPage.tsx # Trending tokens with analytics
│ ├── CopyTradePage.tsx # Copy trading dashboard
│ ├── CopyTradeCreationPage.tsx # Copy trade configuration
│ ├── WalletPage.tsx # Wallet management and portfolio
│ └── MarketAnalysisPage.tsx # Individual token analysis
├── services/ # API and data services
│ └── mockAPI.ts # Mock backend for development
├── types/ # TypeScript type definitions
│ └── index.ts # Core application types
├── App.tsx # Main application component
├── App.css # Global styles and animations
└── main.tsx # Application entry point

## 🚀 Quick Deployment Guide

### **Method 1: Vercel (Recommended)**

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

### **Method 2: Netlify**

```bash
npm run build
```

- Go to [Netlify](https://www.netlify.com)
- Drag & drop the `dist/` folder
- Or connect your GitHub repository for automatic deploys

---

### **Method 3: Docker**

**Dockerfile**

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Build & Run**

```bash
docker build -t gmgn-app .
docker run -p 3000:3000 gmgn-app
```

---

### **Method 4: GitHub Pages**

**Install:**

```bash
npm install --save-dev gh-pages
```

**Update `package.json`:**

```json
{
  "homepage": "https://yourusername.github.io/gmgn-copy-trading",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Deploy:**

```bash
npm run deploy
```

---

## 🛠️ Local Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Modern browser

### Installation

```bash
git clone https://github.com/yourusername/gmgn-copy-trading.git
cd gmgn-copy-trading
npm install   # or yarn install
npm run dev   # or yarn dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Demo Credentials

- **Email**: demo@gmgn.ai
- **Password**: demo123
- **Invite Code**: FKNvP6Qi

---

## 🎮 Usage Guide

### 🔍 Token Discovery

- Browse **Trenches**, **New Pairs**, **Trending**
- Filter by status: All / Completing / Completed
- Click token for detailed analytics
- Track market performance

### 👥 Copy Trading

- Discover top traders
- Analyze PnL, win rates
- Click **Copy**
- Configure amount & method
- Confirm
- Monitor active trades

### 💼 Wallet Management

- Connect via dropdown
- View portfolio in **My Wallet**
- Manage trades
- Phishing protection overview

---

## 🛠️ Technical Stack

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- Vite

### State Management

- `useState`, `useEffect`
- Custom Hooks
- Context API

### API & Data

- Mock API
- Simulated live updates
- Local storage

### Styling & UX

- Mobile-first
- Dark theme
- Custom animations
- ARIA + keyboard support

---

## 🔧 Environment Configuration

### `.env.local`

```env
VITE_API_URL=https://api.gmgn.ai
VITE_WALLET_CONNECT_ID=your_wallet_connect_id
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn
```

### Deployment Environments

#### Vercel / Netlify

Add environment variables via Dashboard

#### Docker

```bash
docker run -p 3000:3000 \
  -e VITE_API_URL=https://api.gmgn.ai \
  -e VITE_WALLET_CONNECT_ID=your_id \
  gmgn-app
```

---

## 📱 Responsive Design

- **Mobile (320px+)**: Single-column
- **Tablet (768px+)**: Two-column
- **Desktop (1024px+)**: Multi-column

### Key Features

- Scrollable tables
- Collapsible navigation
- Touch-friendly controls
- Optimized modals

---

## 🧪 Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript compile
npm run test         # Run test suite
```

---

## 📈 Production Deployment Checklist

### Pre-Deployment

- ✅ Run `npm run build`
- ✅ Test build with `npm run preview`
- ✅ Set all environment variables
- ✅ Run `npm run type-check`
- ✅ Run `npm run lint`
- ✅ Responsive tests

### Performance

- Bundle size: `npm run build -- --analyze`
- Lighthouse score > 90
- Lazy loading images
- Service worker (optional)

### Security

- No hardcoded secrets
- HTTPS only
- CSP configured
- Input validation
- Secure authentication flow

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Guidelines

- Follow code style
- Add TypeScript types
- Consider responsiveness
- Update docs
- Test on devices

---

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.
