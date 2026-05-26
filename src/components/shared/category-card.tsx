// ============================================================
// Legacy Vault — Category Card Component
// Clickable category tile with image + glassmorphism overlay
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CategoryDisplay } from "@/types";

interface CategoryCardProps {
  category: CategoryDisplay;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group relative overflow-hidden rounded-xl border border-border/50 aspect-[3/2] transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
    >
      {/* Background Image */}
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {category.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gold/70">
            {category.productCount} products
          </span>
          <span className="flex items-center gap-1 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
            Browse
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
