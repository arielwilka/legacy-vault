"use client";

// ============================================================
// Legacy Vault — Navbar Component
// 4 tabs: Home, Products, Articles, Event
// Includes search, cart badge, auth, theme toggle, mobile drawer
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
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
import { products } from "@/data/mock-data";
import { formatPrice } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/list-product", label: "Products" },
  { href: "/articles", label: "Articles" },
  { href: "/event", label: "Event" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query (max 6 results)
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q))
      .slice(0, 6);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node) &&
          mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.trim().length >= 2);
    setActiveIndex(-1);
  }, []);

  const handleSelectProduct = useCallback((slug: string, id: string) => {
    setShowSuggestions(false);
    setSearchQuery("");
    setActiveIndex(-1);
    setSearchOpen(false);
    router.push(`/list-product/${id}`);
  }, [router]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setActiveIndex(-1);
      setSearchOpen(false);
      router.push(`/list-product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [searchQuery, router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[activeIndex];
      handleSelectProduct(selected.slug, selected.id);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  }, [showSuggestions, suggestions, activeIndex, handleSelectProduct]);
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

            {/* Search Bar (Desktop) with Autocomplete */}
            <form
              className="hidden md:flex flex-1 max-w-md mx-6"
              onSubmit={handleSearchSubmit}
            >
              <div className="relative w-full" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  className="pl-9 bg-muted/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                />
                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/50 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-xl">
                    {suggestions.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gold/10 ${
                          index === activeIndex ? "bg-gold/10" : ""
                        }`}
                        onClick={() => handleSelectProduct(product.slug, product.id)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-border/30">
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <span className="text-sm font-semibold text-gold flex-shrink-0">{formatPrice(product.price)}</span>
                      </button>
                    ))}
                    <button
                      type="submit"
                      className="w-full px-3 py-2 text-xs text-center text-gold hover:bg-gold/5 border-t border-border/30 transition-colors"
                    >
                      View all results for &quot;{searchQuery}&quot; →
                    </button>
                  </div>
                )}
              </div>
            </form>

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

          {/* Mobile Search (Expandable) with Autocomplete */}
          {searchOpen && (
            <form
              className="md:hidden pb-3 animate-in slide-in-from-top-2"
              onSubmit={handleSearchSubmit}
            >
              <div className="relative" ref={mobileSearchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  className="pl-9 bg-muted/50 border-border/50"
                  autoFocus
                />
                {/* Mobile Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/50 rounded-lg shadow-xl z-50 overflow-hidden">
                    {suggestions.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gold/10 ${
                          index === activeIndex ? "bg-gold/10" : ""
                        }`}
                        onClick={() => handleSelectProduct(product.slug, product.id)}
                      >
                        <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-border/30">
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      type="submit"
                      className="w-full px-3 py-2 text-xs text-center text-gold hover:bg-gold/5 border-t border-border/30"
                    >
                      View all results →
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </header>
    </>
  );
}
