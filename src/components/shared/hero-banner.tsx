// ============================================================
// Legacy Vault — Hero Banner Component
// Full-width hero with gradient overlay and CTA
// ============================================================

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-gold/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-2xl space-y-6 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-gold text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            New Collection Available
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Protect Your Legacy,
            <br />
            <span className="text-gradient-gold">Elevate Your Collection</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Premium hand-drawn extended art prints & crystal-clear acrylic
            display cases for your most treasured TCG cards.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/list-product">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-light text-background font-semibold gap-2 px-6"
              >
                Browse Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/list-product?category=Extended+Art+Print">
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 px-6"
              >
                Extended Art Prints
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-6">
            <div>
              <div className="text-2xl font-bold text-gold">500+</div>
              <div className="text-xs text-muted-foreground">
                Unique Designs
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-gold">10K+</div>
              <div className="text-xs text-muted-foreground">
                Happy Collectors
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-gold">⭐ 5.0</div>
              <div className="text-xs text-muted-foreground">
                Tokopedia Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
