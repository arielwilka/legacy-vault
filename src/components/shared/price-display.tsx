// ============================================================
// Legacy Vault — Price Display Component
// Formatted IDR price with optional discount
// ============================================================

import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({
  price,
  discount = 0,
  size = "md",
}: PriceDisplayProps) {
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-bold text-gold ${sizeClasses[size]}`}>
        {formatPrice(discountedPrice ?? price)}
      </span>
      {discountedPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
