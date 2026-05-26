"use client";

// ============================================================
// Legacy Vault — Product Card Component
// Reusable card with hover effects, badges, and quick-add
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden border border-border/50 bg-card transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
      {/* Image Container */}
      <Link
        href={`/list-product/${product.id}`}
        className="relative aspect-square overflow-hidden bg-muted/50"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Add Button (appears on hover) */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Button
            size="sm"
            className="w-full bg-gold hover:bg-gold-light text-background font-semibold gap-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-emerald-500/90 text-white border-0 text-[10px] px-1.5 py-0.5">
              <Sparkles className="h-2.5 w-2.5 mr-0.5" />
              NEW
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge className="bg-red-500/90 text-white border-0 text-[10px] px-1.5 py-0.5">
              -{product.discount}%
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        {/* Category */}
        <span className="text-[10px] uppercase tracking-wider text-gold/70 font-medium">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/list-product/${product.id}`}>
          <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-2">
          {discountedPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gold">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-gold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        <div className="flex items-center gap-1">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              product.stock > 100
                ? "bg-emerald-400"
                : product.stock > 0
                ? "bg-amber-400"
                : "bg-red-400"
            }`}
          />
          <span className="text-[10px] text-muted-foreground">
            {product.stock > 100
              ? "In Stock"
              : product.stock > 0
              ? `Only ${product.stock} left`
              : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
