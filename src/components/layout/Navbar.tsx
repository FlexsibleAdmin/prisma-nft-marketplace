import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, Wallet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { MOCK_USER_PROFILE } from "@shared/mock-data";
import { toast } from "sonner";
export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Global Auth State
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Creators", path: "/creators" },
    { name: "Community", path: "/community" },
  ];
  const isActive = (path: string) => location.pathname === path;
  const handleConnect = () => {
    if (user) {
      logout();
      toast.info("Wallet disconnected");
    } else {
      login(MOCK_USER_PROFILE);
      toast.success("Wallet connected successfully");
    }
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="hidden md:inline-block font-display font-bold text-xl tracking-tight">
                Prisma
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items, collections, and accounts"
              className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:border-input transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle className="relative top-0 right-0" />
            {user ? (
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex gap-2 border-primary/20 hover:bg-primary/5"
                  asChild
                >
                  <Link to="/create">
                    <Plus className="h-4 w-4" />
                    Create
                  </Link>
                </Button>
                <Link to="/profile">
                  <Avatar className="h-8 w-8 border border-border hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleConnect}
                className="hidden md:flex gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 border-0"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect</span>
              </Button>
            )}
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <span className="font-display font-bold text-xl">Prisma</span>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          isActive(link.path) ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                    {user && (
                      <>
                        <Link
                          to="/create"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            isActive("/create") ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          Create NFT
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            isActive("/profile") ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          Profile
                        </Link>
                      </>
                    )}
                  </nav>
                  <div className="mt-auto">
                    <Button
                      onClick={() => {
                        handleConnect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full gap-2 bg-gradient-to-r from-blue-600 to-violet-600"
                    >
                      <Wallet className="h-4 w-4" />
                      {user ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}