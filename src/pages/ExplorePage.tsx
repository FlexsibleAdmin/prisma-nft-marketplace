import { useState, useEffect } from "react";
import { Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NFTCard } from "@/components/ui/nft-card";
import { api } from "@/lib/api-client";
import type { NFT } from "@shared/types";
import { toast } from "sonner";
export function ExplorePage() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const categories = ["Art", "Collectibles", "Music", "Photography", "Sports", "Virtual Worlds"];
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await api<{ items: NFT[], next: string | null }>('/api/nfts');
        setNfts(response.items);
      } catch (error) {
        console.error("Failed to fetch NFTs", error);
        toast.error("Failed to load marketplace items");
      } finally {
        setLoading(false);
      }
    };
    fetchNFTs();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Explore Marketplace</h1>
            <p className="text-muted-foreground mt-1">Browse more than 50k NFTs from top creators</p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Mobile Filters Content */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Price Range (ETH)</h3>
                    <Slider
                      defaultValue={[0, 10]}
                      max={20}
                      step={0.1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <div className="border rounded px-2 py-1 w-20 text-center">{priceRange[0]}</div>
                      <span className="text-muted-foreground">to</span>
                      <div className="border rounded px-2 py-1 w-20 text-center">{priceRange[1]}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-${cat}`} />
                          <Label htmlFor={`mobile-${cat}`}>{cat}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex items-center gap-2 border rounded-lg p-1 bg-secondary/30">
              <Button variant="ghost" size="sm" className="bg-background shadow-sm">Items</Button>
              <Button variant="ghost" size="sm">Activity</Button>
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8 sticky top-24">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Price Range</h3>
              <Slider
                defaultValue={[0, 10]}
                max={20}
                step={0.1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between text-sm">
                <div className="border rounded px-3 py-2 w-24 text-center bg-background">{priceRange[0]} ETH</div>
                <span className="text-muted-foreground">-</span>
                <div className="border rounded px-3 py-2 w-24 text-center bg-background">{priceRange[1]} ETH</div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox id={`desktop-${cat}`} />
                    <Label htmlFor={`desktop-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {nfts.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                  {/* Duplicate for demo volume if needed, but using real data now */}
                </div>
                {nfts.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No items found.
                  </div>
                )}
                <div className="mt-12 flex justify-center">
                  <Button variant="outline" size="lg" className="min-w-[200px]">
                    Load More
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}