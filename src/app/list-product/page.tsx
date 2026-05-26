"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/shared/product-card";
import { products } from "@/data/mock-data";
import { formatPrice } from "@/lib/utils";
import { ProductCategory } from "@/types";

const allCategories: ProductCategory[] = ["Extended Art Print", "Acrylic Display Case", "Accessories"];
const allTags = ["PSA", "BGS", "CGC", "TAG"];

function ProductListContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [sortBy, setSortBy] = useState("featured");

  // Sync search state when URL params change (e.g. navbar search submission)
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  const toggleCategory = (cat: string) => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  const toggleTag = (tag: string) => setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  const clearFilters = () => { setSearch(""); setSelectedCategories([]); setSelectedTags([]); setPriceRange([0, 300000]); setSortBy("featured"); };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (search) { const q = search.toLowerCase(); result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
    if (selectedCategories.length > 0) result = result.filter((p) => selectedCategories.includes(p.category));
    if (selectedTags.length > 0) result = result.filter((p) => selectedTags.some((tag) => p.tags.includes(tag)));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return result;
  }, [search, selectedCategories, selectedTags, priceRange, sortBy]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 300000;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-semibold uppercase tracking-wider">Category</Label>
        <div className="mt-3 space-y-2">
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => toggleCategory(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategories.includes(cat) ? "bg-gold/10 text-gold border border-gold/30" : "text-muted-foreground hover:bg-muted border border-transparent"}`}>{cat}</button>
          ))}
        </div>
      </div>
      <Separator className="bg-border/50" />
      <div>
        <Label className="text-sm font-semibold uppercase tracking-wider">Grading Type</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${selectedTags.includes(tag) ? "bg-gold text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{tag}</button>
          ))}
        </div>
      </div>
      <Separator className="bg-border/50" />
      <div>
        <Label className="text-sm font-semibold uppercase tracking-wider">Price Range</Label>
        <div className="mt-4 px-1">
          <Slider value={priceRange} onValueChange={(val) => setPriceRange(val as [number, number])} min={0} max={300000} step={10000} className="mb-3" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
      {hasActiveFilters && (<><Separator className="bg-border/50" /><Button variant="outline" size="sm" className="w-full text-destructive" onClick={clearFilters}><X className="h-3 w-3 mr-1" />Clear All Filters</Button></>)}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All <span className="text-gradient-gold">Products</span></h1>
        <p className="text-sm text-muted-foreground mt-1">Browse our complete collection.</p>
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /><span className="font-semibold">Filters</span></div>
            <FilterContent />
          </div>
        </aside>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Sheet><SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden gap-1.5" />}><Filter className="h-3.5 w-3.5" />Filters</SheetTrigger><SheetContent side="left" className="w-80 bg-background"><div className="mt-6"><FilterContent /></div></SheetContent></Sheet>
              <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 md:w-64 h-9 text-sm bg-muted/50" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">{filteredProducts.length} products</span>
              <Select value={sortBy} onValueChange={(v) => v && setSortBy(v)}><SelectTrigger className="w-40 h-9 text-sm bg-muted/50"><SelectValue placeholder="Sort by" /></SelectTrigger><SelectContent><SelectItem value="featured">Featured</SelectItem><SelectItem value="newest">Newest</SelectItem><SelectItem value="price-low">Price: Low → High</SelectItem><SelectItem value="price-high">Price: High → Low</SelectItem><SelectItem value="name">Name A-Z</SelectItem></SelectContent></Select>
            </div>
          </div>
          {hasActiveFilters && (<div className="flex flex-wrap gap-2 mb-4">{selectedCategories.map((cat) => (<Badge key={cat} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>{cat}<X className="h-3 w-3" /></Badge>))}{selectedTags.map((tag) => (<Badge key={tag} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleTag(tag)}>{tag}<X className="h-3 w-3" /></Badge>))}</div>)}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{filteredProducts.map((p) => (<ProductCard key={p.id} product={p} />))}</div>
          ) : (
            <div className="text-center py-20"><p className="text-lg text-muted-foreground">No products found.</p><Button variant="outline" className="mt-4 border-gold/30 text-gold" onClick={clearFilters}>Clear Filters</Button></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListPage() {
  return <Suspense fallback={<div className="container mx-auto px-4 py-8"><p className="text-muted-foreground">Loading...</p></div>}><ProductListContent /></Suspense>;
}
