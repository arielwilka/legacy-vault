"use client";

// ============================================================
// Legacy Vault — Event Page
// Pokemon of The Month: Greninja
// Dedicated landing page matching legacyvault.id event section
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { Flame, ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/shared/product-card";
import { featuredEvent, getEventProducts, products } from "@/data/mock-data";

export default function EventPage() {
  const eventProducts = getEventProducts();
  const otherFeatured = products
    .filter(
      (p) =>
        !featuredEvent.productIds.includes(p.id) &&
        p.category === "Extended Art Print"
    )
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

        {/* Water-themed pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            {/* Event Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-gold text-sm font-medium">
              <Flame className="h-4 w-4" />
              Pokemon of The Month
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-gradient-gold">GRENINJA</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {featuredEvent.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">
                  {eventProducts.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Exclusive Designs
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 fill-gold" />
                  5.0
                </div>
                <div className="text-xs text-muted-foreground">
                  Customer Rating
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">4</div>
                <div className="text-xs text-muted-foreground">
                  TCG Sets Covered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Event Banner ===== */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden border border-gold/20 aspect-[3/1]">
          <Image
            src={featuredEvent.imageUrl}
            alt={featuredEvent.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-xs text-gold font-medium uppercase tracking-wider">
                  Limited Collection
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                Greninja Collection
              </h2>
              <p className="text-sm text-muted-foreground">
                From BREAKpoint classic to Twilight Masquerade — explore every
                Greninja extended art design hand-crafted by our illustrators.
              </p>
              <Link href="/list-product">
                <Button className="mt-4 bg-gold hover:bg-gold-light text-white font-semibold gap-2">
                  Shop All Greninja
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Greninja Products Grid ===== */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-gold/10">
            <Flame className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Greninja{" "}
              <span className="text-gradient-gold">Extended Art</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              All 4 designs from our Greninja collection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eventProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== About This Event ===== */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-xl glass-card border border-border/50">
          <h3 className="text-lg font-bold mb-4">
            About{" "}
            <span className="text-gradient-gold">Pokemon of The Month</span>
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Every month, Legacy Vault spotlights a beloved Pokémon with a
              curated collection of hand-drawn extended art prints. This month,
              we celebrate <strong className="text-foreground">Greninja</strong>{" "}
              — the ninja frog Pokémon loved by collectors worldwide.
            </p>
            <p>
              Our Greninja collection includes extended art designs spanning 4
              different TCG sets: Twilight Masquerade, BREAKpoint, Celebrations,
              and Shrouded Fable. Each design is hand-drawn by our talented team
              of illustrators and printed on premium 150gsm art paper with
              glittered and textured coating.
            </p>
            <p>
              Compatible with all major grading services including PSA, BGS, CGC,
              and TAG. Available as art-print-only or bundled with our Wonder
              Guard magnetic cases.
            </p>
          </div>
        </div>
      </section>

      {/* ===== More Extended Art ===== */}
      {otherFeatured.length > 0 && (
        <section className="container mx-auto px-4">
          <Separator className="mb-10 bg-border/50" />
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                More{" "}
                <span className="text-gradient-gold">Extended Art</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore designs beyond the Greninja collection
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
