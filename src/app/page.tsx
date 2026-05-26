"use client";

// ============================================================
// Legacy Vault — Home Page
// Hero, Categories, Pokemon of The Month, Featured Products
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBanner from "@/components/shared/hero-banner";
import CategoryCard from "@/components/shared/category-card";
import ProductCard from "@/components/shared/product-card";
import {
  categories,
  featuredEvent,
  getFeaturedProducts,
  getEventProducts,
} from "@/data/mock-data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const eventProducts = getEventProducts();

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ===== Hero Banner ===== */}
      <HeroBanner />

      {/* ===== Category Section ===== */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Shop by <span className="text-gradient-gold">Category</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Find the perfect display for your collection
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* ===== Pokemon of The Month ===== */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Flame className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {featuredEvent.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {featuredEvent.description}
                </p>
              </div>
            </div>
            <Link href="/list-product">
              <Button
                variant="outline"
                size="sm"
                className="border-gold/30 text-gold hover:bg-gold/10 gap-1 hidden md:flex"
              >
                View All
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          {/* Event Banner */}
          <div className="relative rounded-xl overflow-hidden mb-8 aspect-[3/1] border border-gold/20">
            <Image
              src={featuredEvent.imageUrl}
              alt={featuredEvent.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold text-gradient-gold mb-2">
                  Greninja
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore our curated collection of Greninja extended art prints
                  — from classic BREAKpoint to the latest Twilight Masquerade.
                </p>
              </div>
            </div>
          </div>

          {/* Event Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured <span className="text-gradient-gold">Products</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Our most popular items, handpicked for you
            </p>
          </div>
          <Link href="/list-product">
            <Button
              variant="outline"
              size="sm"
              className="border-gold/30 text-gold hover:bg-gold/10 gap-1"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== Article Preview ===== */}
      <section className="container mx-auto px-4">
        <div className="rounded-xl border border-border/50 overflow-hidden glass-card">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-video md:aspect-auto">
              <Image
                src="https://res.cloudinary.com/dohmgkugj/image/upload/w_800,h_500,c_fill,f_auto,q_auto/products/Greninja-EX"
                alt="Chaos Rising Article"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-xs text-gold font-medium uppercase tracking-wider">
                Latest News
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-2">
                Pokémon TCG &quot;Chaos Rising&quot; is Coming in May!
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                The next Pokémon TCG Mega Evolution expansion, Chaos Rising, is
                set to hit English markets on May 22, 2026. This set spotlights
                Mega Greninja ex as a key card!
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gold/30 text-gold hover:bg-gold/10 gap-1"
                >
                  Read More
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
