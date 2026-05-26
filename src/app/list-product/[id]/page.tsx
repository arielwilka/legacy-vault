"use client";

import { useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/shared/product-card";
import PriceDisplay from "@/components/shared/price-display";
import { useCartStore } from "@/store/cart-store";
import { getProductById, products } from "@/data/mock-data";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/list-product"><Button className="mt-4 bg-gold text-background">Browse Products</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/list-product" className="hover:text-gold transition-colors">Products</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Back button */}
      <Link href="/list-product" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      {/* Product Detail Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-muted/30">
            <Image src={product.images[selectedImage] || product.imageUrl} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            {product.isNew && <Badge className="absolute top-3 left-3 bg-emerald-500/90 text-white border-0">NEW</Badge>}
            {product.discount > 0 && <Badge className="absolute top-3 right-3 bg-red-500/90 text-white border-0">-{product.discount}%</Badge>}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${selectedImage === i ? "border-gold" : "border-border/50 hover:border-border"}`}>
                <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold/70 font-medium">{product.category} • {product.subCategory}</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">{product.name}</h1>
          </div>

          <PriceDisplay price={product.price} discount={product.discount} size="lg" />

          {/* Tags */}
          {product.tags.length > 0 && (
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Compatible Grading</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag) => (<Badge key={tag} variant="secondary" className="bg-muted text-foreground">{tag}</Badge>))}
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${product.stock > 100 ? "bg-emerald-400" : product.stock > 0 ? "bg-amber-400" : "bg-red-400"}`} />
            <span className="text-sm text-muted-foreground">{product.stock > 100 ? `In Stock (${product.stock.toLocaleString()} available)` : product.stock > 0 ? `Low Stock (${product.stock} left)` : "Out of Stock"}</span>
          </div>

          <Separator className="bg-border/50" />

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Minus className="h-3.5 w-3.5" /></Button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}><Plus className="h-3.5 w-3.5" /></Button>
              </div>
            </div>

            <Button size="lg" className={`w-full font-semibold gap-2 transition-all ${added ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gold hover:bg-gold-light"} text-background`} onClick={handleAddToCart} disabled={product.stock === 0}>
              {added ? (<><Check className="h-4 w-4" />Added to Cart!</>) : (<><ShoppingCart className="h-4 w-4" />Add to Cart</>)}
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3">
            {[{ icon: Shield, text: "Authentic Hand-Drawn Art" }, { icon: Shield, text: "Premium 150gsm Paper" }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 border border-border/50">
                <Icon className="h-4 w-4 text-gold shrink-0" />
                <span className="text-xs text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>

          <Separator className="bg-border/50" />

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Description</h3>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related <span className="text-gradient-gold">Products</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{relatedProducts.map((p) => (<ProductCard key={p.id} product={p} />))}</div>
        </section>
      )}
    </div>
  );
}
