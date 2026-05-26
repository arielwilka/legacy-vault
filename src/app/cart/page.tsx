"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore();
  const total = totalPrice();
  const shipping = total >= 500000 ? 0 : 25000;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/list-product">
            <Button className="bg-gold hover:bg-gold-light text-background font-semibold gap-2 mt-4">
              <ArrowLeft className="h-4 w-4" /> Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping <span className="text-gradient-gold">Cart</span></h1>
        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={clearCart}>
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear All
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = item.product.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price;
            return (
              <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card">
                {/* Image */}
                <Link href={`/list-product/${item.product.id}`} className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 border border-border/50">
                  <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" sizes="96px" />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/list-product/${item.product.id}`} className="text-sm font-medium hover:text-gold transition-colors line-clamp-2">{item.product.name}</Link>
                  <span className="text-xs text-muted-foreground block mt-1">{item.product.category}</span>
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center border border-border rounded-lg">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gold">{formatPrice(price * item.quantity)}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-xl border border-border/50 bg-card space-y-4">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <Separator className="bg-border/50" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && <p className="text-[10px] text-muted-foreground">Free shipping for orders above Rp 500.000</p>}
            </div>
            <Separator className="bg-border/50" />
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-gold">{formatPrice(total + shipping)}</span></div>
            <Button size="lg" className="w-full bg-gold hover:bg-gold-light text-background font-semibold" disabled>
              Proceed to Checkout
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">Checkout will be available in Phase 2</p>

            {/* Trust */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
              <span className="text-xs text-muted-foreground">Secure checkout with Midtrans & PayPal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-8">
        <Link href="/list-product" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
