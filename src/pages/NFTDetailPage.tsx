import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Eye, Heart, Share2, MoreHorizontal, ShieldCheck, Tag, Activity, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { NFTCard } from "@/components/ui/nft-card";
import { api } from "@/lib/api-client";
import type { NFT } from "@shared/types";
import { useAuthStore } from "@/lib/store";
import { toast } from "sonner";
export function NFTDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [nft, setNft] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [moreFromCollection, setMoreFromCollection] = useState<NFT[]>([]);
  const user = useAuthStore(s => s.user);
  useEffect(() => {
    const fetchNFT = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await api<NFT>(`/api/nfts/${id}`);
        setNft(data);
        // Fetch more from collection (mock logic: just fetch all and filter)
        const allNfts = await api<{ items: NFT[] }>('/api/nfts?limit=10');
        setMoreFromCollection(
          allNfts.items.filter(n => n.collection === data.collection && n.id !== data.id).slice(0, 4)
        );
      } catch (error) {
        console.error("Failed to fetch NFT", error);
        toast.error("Failed to load NFT details");
      } finally {
        setLoading(false);
      }
    };
    fetchNFT();
  }, [id]);
  const handleBuy = async () => {
    if (!user) {
      toast.error("Please connect wallet to purchase");
      return;
    }
    if (!nft) return;
    setBuying(true);
    try {
      const updated = await api<NFT>(`/api/nfts/${nft.id}/buy`, {
        method: 'POST',
        body: JSON.stringify({ userId: user.id })
      });
      setNft(updated);
      toast.success(`Successfully purchased ${updated.title}!`);
    } catch (error) {
      console.error("Purchase failed", error);
      toast.error("Purchase failed. Please try again.");
    } finally {
      setBuying(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  if (!nft) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">NFT Not Found</h2>
        <p className="text-muted-foreground">The asset you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/explore">Back to Explore</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden border border-border/50 bg-card shadow-2xl"
          >
            <div className="aspect-square relative group">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border border-white/10">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border border-white/10">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
          {/* Description Card (Desktop) */}
          <Card className="hidden lg:block">
            <CardHeader className="border-b border-border/50 p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-muted-foreground" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Created by</span>
                <Link to="/profile" className="text-primary font-medium hover:underline flex items-center gap-1">
                  {nft.artist} <ShieldCheck className="h-3 w-3 text-blue-500" />
                </Link>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {nft.description}
              </p>
            </CardContent>
          </Card>
          {/* Attributes Grid */}
          <Card>
            <CardHeader className="border-b border-border/50 p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5 text-muted-foreground" />
                Attributes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {nft.attributes.map((attr, idx) => (
                  <div key={idx} className="bg-secondary/30 rounded-lg p-3 border border-border/50 flex flex-col items-center text-center gap-1 hover:bg-secondary/50 transition-colors">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{attr.trait_type}</span>
                    <span className="text-sm font-semibold text-foreground">{attr.value}</span>
                    {attr.rarity && (
                      <span className="text-xs text-muted-foreground">{attr.rarity}% rarity</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column: Details */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Link to={`/explore`} className="text-primary font-medium hover:underline">
                {nft.collection}
              </Link>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{nft.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 ring-2 ring-background">
                  <AvatarImage src={nft.avatar} />
                  <AvatarFallback>{nft.owner[0]}</AvatarFallback>
                </Avatar>
                <span>Owned by <span className="text-foreground font-medium">{nft.owner === user?.id ? 'You' : nft.owner}</span></span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{nft.likes * 12} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{nft.likes} favorites</span>
              </div>
            </div>
            {/* Price Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 space-y-6">
                {nft.endsIn && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-4 bg-secondary/30 p-3 rounded-lg inline-flex">
                    <Clock className="h-4 w-4" />
                    <span>Sale ends in {nft.endsIn}</span>
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{nft.price} ETH</span>
                    <span className="text-muted-foreground text-lg">(${(nft.price * 3200).toLocaleString()})</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="lg" 
                    className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-glow transition-all"
                    onClick={handleBuy}
                    disabled={buying || nft.owner === user?.id}
                  >
                    {buying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {nft.owner === user?.id ? 'You Own This' : 'Buy Now'}
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 h-12 text-lg font-semibold border-2">
                    Make Offer
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
          {/* Price History Chart */}
          <Card>
            <CardHeader className="border-b border-border/50 p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-muted-foreground" />
                Price History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={nft.priceHistory}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `${value} Ξ`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => [`${value} ETH`, 'Price']}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Description Card (Mobile) */}
          <Card className="lg:hidden">
            <CardHeader className="border-b border-border/50 p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-muted-foreground" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Created by</span>
                <Link to="/profile" className="text-primary font-medium hover:underline flex items-center gap-1">
                  {nft.artist} <ShieldCheck className="h-3 w-3 text-blue-500" />
                </Link>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {nft.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* More from Collection */}
      {moreFromCollection.length > 0 && (
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-display">More from {nft.collection}</h2>
            <Button variant="outline" asChild>
              <Link to="/explore">View Collection</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreFromCollection.map((item) => (
              <NFTCard key={item.id} nft={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}