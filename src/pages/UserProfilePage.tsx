import { useState, useEffect } from "react";
import { NFTCard } from "@/components/ui/nft-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Settings, Share2, Grid, List as ListIcon, Globe, Twitter, Instagram, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api-client";
import type { NFT } from "@shared/types";
import { toast } from "sonner";
export function UserProfilePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const user = useAuthStore(s => s.user);
  const [collectedNFTs, setCollectedNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (!user) return;
      try {
        // In a real app, we'd have a specific endpoint like /api/users/:id/nfts
        // For this demo, we fetch all and filter client-side or use the list endpoint
        const response = await api<{ items: NFT[] }>('/api/nfts');
        const userItems = response.items.filter(n => n.owner === user.id || n.owner === user.handle);
        setCollectedNFTs(userItems);
      } catch (error) {
        console.error("Failed to fetch user NFTs", error);
        toast.error("Failed to load your collection");
      } finally {
        setLoading(false);
      }
    };
    fetchUserNFTs();
  }, [user]);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Please connect your wallet to view profile.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen pb-12">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full relative bg-muted">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-4 border-background rounded-full" />
          </motion.div>
          <div className="flex-1 space-y-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold font-display">{user.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{user.handle}</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-mono flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors">
                {user.address}
                <Copy className="h-3 w-3" />
              </span>
            </div>
            <p className="max-w-xl text-sm md:text-base text-muted-foreground/90 pt-2">
              {user.bio}
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
            <Button variant="outline" size="icon" className="rounded-full">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1" />
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Dashboard Tabs */}
        <Tabs defaultValue="collected" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/50 pb-4">
            <TabsList className="bg-transparent p-0 h-auto gap-6">
              <TabsTrigger
                value="collected"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2 text-base text-muted-foreground data-[state=active]:text-foreground transition-all"
              >
                Collected <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">{collectedNFTs.length}</span>
              </TabsTrigger>
              <TabsTrigger
                value="created"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2 text-base text-muted-foreground data-[state=active]:text-foreground transition-all"
              >
                Created <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">{user.stats.created}</span>
              </TabsTrigger>
              <TabsTrigger
                value="favorited"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2 text-base text-muted-foreground data-[state=active]:text-foreground transition-all"
              >
                Favorited <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">{user.stats.favorited}</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 bg-secondary/30 p-1 rounded-lg border border-border/50">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <TabsContent value="collected" className="mt-0">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collectedNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
                {collectedNFTs.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    You haven't collected any NFTs yet.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="created" className="mt-0">
            <div className="text-center py-12 text-muted-foreground">
              No created items yet.
            </div>
          </TabsContent>
          <TabsContent value="favorited" className="mt-0">
            <div className="text-center py-12 text-muted-foreground">
              No favorites yet.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}