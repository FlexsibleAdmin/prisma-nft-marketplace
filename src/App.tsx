import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { Toaster } from "@/components/ui/sonner";
export function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border/40 bg-secondary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
            <div>
              <h4 className="font-bold text-foreground mb-4">Marketplace</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">All NFTs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Art</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Music</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Virtual Worlds</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Stats</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Rankings</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Activity</a></li>
              </ul>
            </div>
          </div>
          <p>© 2024 Prisma NFT Marketplace. Built with ❤️ by Aurelia.</p>
        </div>
      </footer>
      <PWAInstallPrompt />
      <Toaster richColors closeButton />
      <ScrollRestoration />
    </div>
  );
}