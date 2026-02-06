import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { NFT } from "@/lib/mock-nft-data";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
interface NFTCardProps {
  nft: NFT;
  className?: string;
}
export function NFTCard({ nft, className }: NFTCardProps) {
  return (
    <Link to={`/assets/${nft.id}`} className="block h-full">
      <Card className={cn("group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-glow hover:-translate-y-1", className)}>
        <CardContent className="p-0 relative">
          <AspectRatio ratio={1} className="overflow-hidden">
            <img
              src={nft.image}
              alt={nft.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </AspectRatio>
          <div className="absolute top-3 right-3 z-10">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Handle like logic
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          {nft.endsIn && (
            <div className="absolute bottom-3 left-3 z-10">
              <Badge variant="secondary" className="bg-black/60 backdrop-blur-md text-white border-white/10 font-mono text-xs">
                {nft.endsIn} left
              </Badge>
            </div>
          )}
          {/* Overlay Action */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-semibold">
              Place Bid
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 p-4">
          <div className="flex w-full justify-between items-start">
            <div className="min-w-0 flex-1 mr-2">
              <h3 className="font-semibold text-lg leading-none tracking-tight mb-1 truncate" title={nft.title}>
                {nft.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={nft.avatar} />
                  <AvatarFallback>{nft.artist[0]}</AvatarFallback>
                </Avatar>
                <span className="truncate">{nft.artist}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">Price</p>
              <div className="font-bold text-primary flex items-center gap-1 justify-end">
                {nft.price} <span className="text-xs font-normal text-muted-foreground">ETH</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}