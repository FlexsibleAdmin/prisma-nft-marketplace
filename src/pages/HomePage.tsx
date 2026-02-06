import { useEffect, useState } from "react";
import { ArrowRight, Zap, Shield, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/ui/nft-card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/lib/api-client";
import type { NFT } from "@shared/types";
import { toast } from "sonner";
export function HomePage() {
  const [featuredNFTs, setFeaturedNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await api<{ items: NFT[], next: string | null }>('/api/nfts?limit=4');
        setFeaturedNFTs(response.items);
      } catch (error) {
        console.error("Failed to fetch trending NFTs", error);
        toast.error("Failed to load trending items");
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                The Next Gen NFT Marketplace
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-balance"
            >
              Discover, Collect, and Sell <span className="text-gradient">Extraordinary</span> NFTs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty"
            >
              Prisma is the world's first ultra-low latency marketplace built on the Edge. Experience instant transactions and zero-gas minting.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <Button size="lg" className="h-12 px-8 text-lg rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-glow transition-all" asChild>
                <Link to="/explore">
                  Explore Marketplace
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full border-2" asChild>
                <Link to="/create">
                  Create NFT
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold">Trending Now</h2>
          <Button variant="ghost" className="group" asChild>
            <Link to="/explore">
              View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <NFTCard nft={nft} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
      {/* Features Grid */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">Built on Cloudflare Workers for sub-millisecond latency worldwide.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Secure & Safe</h3>
              <p className="text-muted-foreground">Enterprise-grade security protecting your assets and data.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Eco-Friendly</h3>
              <p className="text-muted-foreground">99.9% less energy consumption than traditional proof-of-work chains.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}