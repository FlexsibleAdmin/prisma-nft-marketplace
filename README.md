# Prisma NFT Marketplace

[aureliabutton]

Prisma is a high-performance, visually stunning NFT marketplace designed for the next generation of digital art collectors. Built on the Edge using Cloudflare Workers and Durable Objects, it offers ultra-low latency state management and a seamless user experience.

The platform features a breathtaking "Digital Noir" UI built with Shadcn/UI and Tailwind CSS, operating as a fully compliant Progressive Web App (PWA) that works flawlessly across desktop and mobile devices.

## ✨ Key Features

- ** immersive Hero & Showcase:** A visually striking landing page featuring trending collections, live auctions, and featured artists with smooth animations.
- **Advanced Marketplace Explorer:** A sophisticated filtering and search engine allowing users to browse NFTs by category, price range, and collection using a responsive grid layout.
- **Rich NFT Details:** Detailed asset views displaying high-resolution media, ownership history, attribute rarity, and interactive price history charts.
- **User Dashboard:** A personalized space for users to view their collected items, manage listings, and track favorites.
- **Edge-Native Performance:** Powered by Cloudflare Workers and Hono, ensuring instant load times and global availability.
- **Durable Object State:** Utilizes Cloudflare Durable Objects for consistent, transactional state management (Users, NFTs, Listings) without traditional database bottlenecks.
- **PWA Ready:** Custom installation experience for a native-app feel on mobile devices.

## 🛠️ Technology Stack

**Frontend:**
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v3, Shadcn/UI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Routing:** React Router v6
- **Charts:** Recharts
- **Validation:** Zod

**Backend (Edge):**
- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **Storage:** Cloudflare Durable Objects (Transactional Storage)
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **Bun** (Package Manager)
- **Wrangler** (Cloudflare CLI) - `bun install -g wrangler`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prisma-nft-marketplace
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   This command starts both the Vite frontend and the Cloudflare Worker proxy locally.
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal).

## 🏗️ Architecture Overview

Prisma utilizes a unified Client-Server architecture hosted entirely on the Edge:

1.  **Frontend:** The React application fetches data from the API routes.
2.  **API Layer:** A Hono-based Worker handles HTTP requests (`/api/*`).
3.  **Data Layer:** "Entities" (Users, NFTs) are abstractions over a single Global Durable Object. This ensures transactional integrity and simplifies state management for this prototype.

### Directory Structure

- `src/` - React frontend application (Pages, Components, Hooks).
- `worker/` - Cloudflare Worker backend (API Routes, Durable Object logic).
- `shared/` - Types and constants shared between frontend and backend.

## 📦 Deployment

You can deploy this project to Cloudflare Workers with a single click using the button below, or manually via the CLI.

[aureliabutton]

### Manual Deployment

1.  **Build the project**
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare**
    ```bash
    bun run deploy
    ```

## 🎨 Design System

The application follows a strict "Digital Noir" aesthetic:
- **Background:** Slate-950 (Dark Mode default)
- **Accents:** Vibrant Neon Blue (#3B82F6) and Pink (#EC4899)
- **Typography:** Inter/Geist Sans
- **Interactions:** Glass-morphism overlays, hover glows, and smooth transitions.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.