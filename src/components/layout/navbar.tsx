"use client";

// ============================================================
// Legacy Vault — Navbar Component
// 4 tabs: Home, Products, Articles, Event
// Includes search, cart badge, auth, theme toggle, mobile drawer
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Shield,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import ThemeToggle from "@/components/shared/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/list-product", label: "Products" },
  { href: "/articles", label: "Articles" },
  { href: "/event", label: "Event" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <>
      {/* --- Running Text Banner --- */}
      <div className="bg-gold/10 border-b border-gold/20 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-1.5 text-xs text-gold">
          <span className="mx-8">
            🎉 FREE SHIPPING for orders above Rp 500.000! &nbsp;&nbsp;|
          </span>
          <span className="mx-8">
            ⚡ New: Chaos Rising Extended Art Collection Available Now!
            &nbsp;&nbsp;|
          </span>
          <span className="mx-8">
            🔥 Pokemon of The Month: GRENINJA — Special Collection!
            &nbsp;&nbsp;|
          </span>
          <span className="mx-8">
            🎉 FREE SHIPPING for orders above Rp 500.000! &nbsp;&nbsp;|
          </span>
          <span className="mx-8">
            ⚡ New: Chaos Rising Extended Art Collection Available Now!
            &nbsp;&nbsp;|
          </span>
          <span className="mx-8">
            🔥 Pokemon of The Month: GRENINJA — Special Collection!
            &nbsp;&nbsp;|
          </span>
        </div>
      </div>

      {/* --- Main Navbar --- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Shield className="h-7 w-7 text-gold" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-wider text-gradient-gold">
                  LEGACY
                </span>
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
                  VAULT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — 4 tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-gold bg-gold/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 bg-muted/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-gold"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-gold"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-gold text-background border-0 animate-in zoom-in-50">
                      {totalItems > 99 ? "99+" : totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Auth (Desktop) */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-gold gap-1.5"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user?.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-1">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-gold"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-gold hover:bg-gold-light text-white font-semibold"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden text-muted-foreground"
                    />
                  }
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 bg-background border-border"
                >
                  <div className="flex flex-col gap-6 mt-8">
                    {/* Mobile Nav Links — 4 tabs */}
                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                            pathname === link.href ||
                            (link.href !== "/" && pathname.startsWith(link.href))
                              ? "text-gold bg-gold/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Auth */}
                    <div className="border-t border-border pt-4">
                      {isAuthenticated ? (
                        <div className="flex flex-col gap-2">
                          <div className="px-4 py-2 text-sm text-muted-foreground">
                            Signed in as{" "}
                            <span className="text-gold">{user?.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            className="justify-start text-destructive"
                            onClick={() => {
                              logout();
                              setMobileOpen(false);
                            }}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <Link href="/login" onClick={() => setMobileOpen(false)}>
                            <Button variant="outline" className="w-full">
                              Login
                            </Button>
                          </Link>
                          <Link href="/register" onClick={() => setMobileOpen(false)}>
                            <Button className="w-full bg-gold hover:bg-gold-light text-white">
                              Register
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search (Expandable) */}
          {searchOpen && (
            <div className="md:hidden pb-3 animate-in slide-in-from-top-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 bg-muted/50 border-border/50"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
