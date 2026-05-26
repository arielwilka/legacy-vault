// ============================================================
// Legacy Vault — Mock Data (Realistic TCG Product Catalog)
// Based on actual legacyvault.id product catalog
// ============================================================

import { Product, CategoryDisplay, FeaturedEvent, Article } from "@/types";

// --- Products ---
export const products: Product[] = [
  {
    id: "prod-001",
    name: 'Greninja ex #214 Twilight Masquerade — Extended Art Print',
    slug: "greninja-ex-214-twilight-masquerade",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/greninja-ex/400/400",
    images: [
      "https://picsum.photos/seed/greninja-ex/800/800",
      "https://picsum.photos/seed/greninja-ex-2/800/800",
      "https://picsum.photos/seed/greninja-ex-3/800/800",
      "https://picsum.photos/seed/greninja-ex-4/800/800",
    ],
    stock: 10983,
    description:
      "❗IMPORTANT : READ THIS DESCRIPTION❗\n📝Cards are NOT included.\n\n📍If you already have Graded Guard/Magnetic Case of your own and only want the Extended Art, Choose the \"Extended Art Print Only\" Option!\n\n✅Key Features:\n- Unique and custom HAND-DRAWN extended art background design by our talented team of illustrators\n- Glittered & textured to match card beautifully\n- Ideal for beautifying your collection in exceptional way\n\n✅Specification:\nExtended Artwork is printed on 150gsm art paper + premium coating (textured & glittered) for high quality and precise final results.",
    tags: ["PSA", "BGS", "CGC", "TAG"],
    isFeatured: true,
    isNew: true,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-002",
    name: 'Greninja #40 BREAKpoint — Extended Art Print',
    slug: "greninja-40-breakpoint",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/greninja-bp/400/400",
    images: [
      "https://picsum.photos/seed/greninja-bp/800/800",
      "https://picsum.photos/seed/greninja-bp-2/800/800",
      "https://picsum.photos/seed/greninja-bp-3/800/800",
    ],
    stock: 11000,
    description:
      "❗IMPORTANT : READ THIS DESCRIPTION❗\n📝Cards are NOT included.\n\nCustom HAND-DRAWN extended art background for Greninja #40 from BREAKpoint / #27 Japanese Best of XY.\n\n✅Key Features:\n- Unique and custom HAND-DRAWN extended art background\n- Glittered & textured to match card beautifully\n- Printed on 150gsm art paper + premium coating",
    tags: ["PSA", "BGS", "CGC", "TAG"],
    isFeatured: true,
    isNew: false,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-003",
    name: 'Greninja [Gold Star] #SWSH144 Celebrations — Extended Art',
    slug: "greninja-gold-star-celebrations",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/greninja-gs/400/400",
    images: [
      "https://picsum.photos/seed/greninja-gs/800/800",
      "https://picsum.photos/seed/greninja-gs-2/800/800",
      "https://picsum.photos/seed/greninja-gs-3/800/800",
    ],
    stock: 10997,
    description:
      "Gold Star Greninja from Celebrations set! Custom HAND-DRAWN extended art.\n\n📝Cards are NOT included.\n\n✅Key Features:\n- Unique Gold Star themed art background\n- Glittered & textured to match card beautifully\n- Printed on 150gsm art paper + premium coating",
    tags: ["PSA", "BGS", "CGC", "TAG"],
    isFeatured: true,
    isNew: false,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-004",
    name: 'Greninja ex #132 Promo [Shrouded Fable] — Extended Art',
    slug: "greninja-ex-132-shrouded-fable",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/greninja-sf/400/400",
    images: [
      "https://picsum.photos/seed/greninja-sf/800/800",
      "https://picsum.photos/seed/greninja-sf-2/800/800",
      "https://picsum.photos/seed/greninja-sf-3/800/800",
    ],
    stock: 10989,
    description:
      "Promo Greninja ex from Shrouded Fable! Custom extended art print.\n\n📝Cards are NOT included.\n\n✅Key Features:\n- Unique and custom HAND-DRAWN extended art background\n- Glittered & textured to match card\n- Printed on 150gsm art paper + premium coating",
    tags: ["PSA", "BGS", "CGC", "TAG"],
    isFeatured: false,
    isNew: false,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-005",
    name: 'Charizard ex #223 Obsidian Flames — Extended Art Print',
    slug: "charizard-ex-223-obsidian-flames",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/charizard-of/400/400",
    images: [
      "https://picsum.photos/seed/charizard-of/800/800",
      "https://picsum.photos/seed/charizard-of-2/800/800",
      "https://picsum.photos/seed/charizard-of-3/800/800",
    ],
    stock: 9500,
    description:
      "The iconic Charizard ex from Obsidian Flames! Custom HAND-DRAWN extended art.\n\n📝Cards are NOT included.\n\n✅Key Features:\n- Fire-themed custom background\n- Glittered & textured premium finish\n- Printed on 150gsm art paper + premium coating",
    tags: ["PSA", "BGS", "CGC", "TAG"],
    isFeatured: true,
    isNew: false,
    discount: 10,
    weight: 25,
  },
  {
    id: "prod-006",
    name: 'Pikachu VMAX #044 Vivid Voltage — Extended Art Print',
    slug: "pikachu-vmax-044-vivid-voltage",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/pikachu-vv/400/400",
    images: [
      "https://picsum.photos/seed/pikachu-vv/800/800",
      "https://picsum.photos/seed/pikachu-vv-2/800/800",
      "https://picsum.photos/seed/pikachu-vv-3/800/800",
    ],
    stock: 8200,
    description:
      "The fan-favorite Pikachu VMAX Rainbow! Custom extended art.\n\n📝Cards are NOT included.\n\n✅Key Features:\n- Electrifying custom background design\n- Glittered & textured premium finish\n- Printed on 150gsm art paper + premium coating",
    tags: ["PSA", "BGS", "CGC"],
    isFeatured: true,
    isNew: false,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-007",
    name: 'Mewtwo VSTAR #079 Crown Zenith — Extended Art Print',
    slug: "mewtwo-vstar-079-crown-zenith",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "Pokemon",
    imageUrl: "https://picsum.photos/seed/mewtwo-cz/400/400",
    images: [
      "https://picsum.photos/seed/mewtwo-cz/800/800",
      "https://picsum.photos/seed/mewtwo-cz-2/800/800",
    ],
    stock: 7800,
    description:
      "Mewtwo VSTAR from Crown Zenith! Custom HAND-DRAWN extended art.\n\n📝Cards are NOT included.\n\n✅Key Features:\n- Psychic-themed custom background\n- Glittered & textured premium finish",
    tags: ["PSA", "BGS", "CGC", "TAG"],
    isFeatured: false,
    isNew: true,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-008",
    name: 'Luffy Gear 5 #OP05-119 — Extended Art Print',
    slug: "luffy-gear-5-op05-119",
    price: 100000,
    category: "Extended Art Print",
    subCategory: "One Piece",
    imageUrl: "https://picsum.photos/seed/luffy-g5/400/400",
    images: [
      "https://picsum.photos/seed/luffy-g5/800/800",
      "https://picsum.photos/seed/luffy-g5-2/800/800",
      "https://picsum.photos/seed/luffy-g5-3/800/800",
    ],
    stock: 5000,
    description:
      "The legendary Luffy Gear 5 from One Piece TCG! Custom extended art.\n\n📝Cards are NOT included.\n\n✅Key Features:\n- Dynamic Gear 5 custom art background\n- Glittered & textured premium finish\n- Printed on 150gsm art paper + premium coating",
    tags: ["PSA", "BGS", "CGC"],
    isFeatured: true,
    isNew: true,
    discount: 0,
    weight: 25,
  },
  {
    id: "prod-009",
    name: 'Acrylic Booster Box Display Case',
    slug: "acrylic-booster-box-display",
    price: 200000,
    category: "Acrylic Display Case",
    subCategory: "Display",
    imageUrl: "https://picsum.photos/seed/acrylic-bb/400/400",
    images: [
      "https://picsum.photos/seed/acrylic-bb/800/800",
      "https://picsum.photos/seed/acrylic-bb-2/800/800",
    ],
    stock: 150,
    description:
      "Premium Acrylic Booster Box Display Case.\n\n✅Key Features:\n- Crystal clear acrylic material\n- UV protection to prevent card fading\n- Stackable design\n- Perfect for Pokémon TCG booster boxes\n\n✅Specification:\n- Material: High-quality transparent acrylic\n- Compatible with standard Pokémon TCG booster boxes",
    tags: [],
    isFeatured: true,
    isNew: false,
    discount: 0,
    weight: 500,
  },
  {
    id: "prod-010",
    name: 'Acrylic ETB Display Case',
    slug: "acrylic-etb-display",
    price: 250000,
    category: "Acrylic Display Case",
    subCategory: "Display",
    imageUrl: "https://picsum.photos/seed/acrylic-etb/400/400",
    images: [
      "https://picsum.photos/seed/acrylic-etb/800/800",
      "https://picsum.photos/seed/acrylic-etb-2/800/800",
    ],
    stock: 80,
    description:
      "Premium Acrylic Elite Trainer Box Display Case.\n\n✅Key Features:\n- Crystal clear acrylic\n- UV protection coating\n- Designed for ETB dimensions\n- Museum-quality display",
    tags: [],
    isFeatured: false,
    isNew: true,
    discount: 5,
    weight: 600,
  },
  {
    id: "prod-011",
    name: 'Wonder Guard Magnetic Case — Black',
    slug: "wonder-guard-magnetic-case-black",
    price: 150000,
    category: "Accessories",
    subCategory: "Magnetic Case",
    imageUrl: "https://picsum.photos/seed/wg-black/400/400",
    images: [
      "https://picsum.photos/seed/wg-black/800/800",
      "https://picsum.photos/seed/wg-black-2/800/800",
    ],
    stock: 320,
    description:
      "Wonder Guard Premium Magnetic Case in Black.\n\n✅Key Features:\n- Strong magnetic closure\n- Crystal clear viewing window\n- Available in multiple colors\n- Fits standard graded cards (PSA, BGS, CGC)",
    tags: ["PSA", "BGS", "CGC"],
    isFeatured: false,
    isNew: false,
    discount: 0,
    weight: 150,
  },
  {
    id: "prod-012",
    name: 'Wonder Guard Magnetic Case — Gold',
    slug: "wonder-guard-magnetic-case-gold",
    price: 150000,
    category: "Accessories",
    subCategory: "Magnetic Case",
    imageUrl: "https://picsum.photos/seed/wg-gold/400/400",
    images: [
      "https://picsum.photos/seed/wg-gold/800/800",
      "https://picsum.photos/seed/wg-gold-2/800/800",
    ],
    stock: 250,
    description:
      "Wonder Guard Premium Magnetic Case in Gold.\n\n✅Key Features:\n- Premium gold frame finish\n- Strong magnetic closure\n- Crystal clear viewing window\n- Fits standard graded cards (PSA, BGS, CGC)",
    tags: ["PSA", "BGS", "CGC"],
    isFeatured: false,
    isNew: false,
    discount: 0,
    weight: 150,
  },
];

// --- Categories for homepage display ---
export const categories: CategoryDisplay[] = [
  {
    id: "cat-001",
    name: "Extended Art Print (Slab)",
    description: "Custom hand-drawn extended art for graded cards",
    imageUrl: "https://picsum.photos/seed/cat-ext-art/600/400",
    href: "/list-product?category=Extended+Art+Print",
    productCount: 8,
  },
  {
    id: "cat-002",
    name: "Acrylic Display Case (Raw)",
    description: "Premium acrylic cases for booster boxes & ETBs",
    imageUrl: "https://picsum.photos/seed/cat-acrylic/600/400",
    href: "/list-product?category=Acrylic+Display+Case",
    productCount: 2,
  },
  {
    id: "cat-003",
    name: "Wonder Guard Accessories",
    description: "Magnetic cases & card protection accessories",
    imageUrl: "https://picsum.photos/seed/cat-accessories/600/400",
    href: "/list-product?category=Accessories",
    productCount: 2,
  },
];

// --- Featured Event (Pokemon of The Month) ---
export const featuredEvent: FeaturedEvent = {
  id: "event-001",
  name: "Pokemon of The Month — Greninja",
  description:
    "Celebrate Greninja with our exclusive extended art collection! From BREAKpoint classics to the latest Twilight Masquerade releases.",
  imageUrl: "https://picsum.photos/seed/event-greninja/1200/400",
  productIds: ["prod-001", "prod-002", "prod-003", "prod-004"],
};

// --- Helper: Get product by ID ---
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

// --- Helper: Get product by slug ---
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// --- Helper: Get featured products ---
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

// --- Helper: Get products by category ---
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

// --- Helper: Get event products ---
export function getEventProducts(): Product[] {
  return products.filter((p) => featuredEvent.productIds.includes(p.id));
}

// --- Articles (based on legacyvault.id) ---
export const articles: Article[] = [
  {
    id: "art-001",
    title: 'Next Pokemon English Set "Chaos Rising" is Coming in May!!',
    slug: "next-pokemon-english-set-chaos-rising-is-coming-may",
    excerpt:
      "The next Pokémon TCG Mega Evolution expansion, Chaos Rising, is set to hit English markets on May 22, 2026, with prereleases running from May 9–17.",
    content: `Official English release date announced for "Chaos Rising"!

The next Pokémon TCG Mega Evolution expansion, Chaos Rising, is set to hit English markets on May 22, 2026, with prereleases running from May 9–17.

This set is the English counterpart to Japan's Ninja Spinner release and will spotlight **Mega Greninja ex** as a key card, giving collectors plenty to chase as the spring TCG schedule continues to heat up.

Mark your calendars and get ready for another wave of Mega Evolution hype next May!

**Key Highlights:**
- Release Date: May 22, 2026
- Prereleases: May 9–17, 2026
- Featured Card: Mega Greninja ex
- Japanese Counterpart: Ninja Spinner

Stay tuned to Legacy Vault for extended art prints from this new set!`,
    imageUrl: "https://picsum.photos/seed/chaos-rising-article/800/450",
    publishedAt: "2026-03-28",
    isPublished: true,
  },
  {
    id: "art-002",
    title: "How to Protect Your Graded Cards: A Complete Guide",
    slug: "how-to-protect-graded-cards-complete-guide",
    excerpt:
      "Learn the best practices for protecting and displaying your PSA, BGS, and CGC graded cards with our premium magnetic cases and extended art prints.",
    content: `Your graded cards are valuable investments — here's how to keep them safe and looking stunning.

**1. Use Quality Magnetic Cases**
Our Wonder Guard Magnetic Cases feature strong magnetic closures and crystal-clear viewing windows. Available in Black, Gold, Silver, Red, Blue, Purple, and Green finishes.

**2. Extended Art Backgrounds**
Add a custom hand-drawn extended art print behind your graded card for a museum-quality display experience. Our prints are made on 150gsm art paper with premium glittered & textured coating.

**3. Avoid Direct Sunlight**
UV rays can fade your cards over time. Our acrylic display cases come with UV protection coating.

**4. Control Temperature & Humidity**
Store your collection in a climate-controlled environment. Avoid basements and attics.

**5. Handle with Care**
Always hold graded slabs by the edges. Use cotton gloves when handling raw cards.

Visit our shop to find the perfect display solution for your collection!`,
    imageUrl: "https://picsum.photos/seed/protect-cards/800/450",
    publishedAt: "2026-03-15",
    isPublished: true,
  },
  {
    id: "art-003",
    title: "Legacy Vault x Greninja: Behind the Extended Art",
    slug: "legacy-vault-greninja-behind-extended-art",
    excerpt:
      "Go behind the scenes with our illustrators as they create the custom extended art backgrounds for our Greninja collection.",
    content: `Every extended art background at Legacy Vault is hand-drawn by our talented team of illustrators. Here's a look at how we created the Greninja collection.

**The Design Process:**
1. **Research** — Our team studies the original card art, the Pokémon's lore, and the set's aesthetic theme.
2. **Sketching** — Initial pencil sketches explore different composition ideas.
3. **Digital Illustration** — The chosen sketch is refined digitally, adding colors and details that blend seamlessly with the card.
4. **Texturing** — We add glitter and texture effects to match the card's foil patterns.
5. **Print Testing** — Multiple test prints ensure color accuracy on 150gsm art paper.

**The Greninja Series:**
Our Greninja collection spans multiple sets:
- Greninja ex #214 from Twilight Masquerade
- Greninja #40 from BREAKpoint
- Greninja [Gold Star] from Celebrations
- Greninja ex #132 Promo from Shrouded Fable

Each design captures Greninja's ninja-like agility with dynamic water and shadow effects.

Follow us on Instagram @legacyvault.id for more behind-the-scenes content!`,
    imageUrl: "https://picsum.photos/seed/behind-art/800/450",
    publishedAt: "2026-02-20",
    isPublished: true,
  },
  {
    id: "art-004",
    title: "Top 5 Most Collected Pokémon Cards in 2026",
    slug: "top-5-most-collected-pokemon-cards-2026",
    excerpt:
      "From Charizard to Pikachu VMAX, discover which cards collectors are chasing the most this year.",
    content: `The Pokémon TCG market continues to grow. Here are the most sought-after cards of 2026:

**1. Charizard ex #223 — Obsidian Flames**
The eternal fan favorite. Every Charizard is instantly collectible.

**2. Pikachu VMAX #044 — Vivid Voltage**
The rainbow Pikachu remains one of the most iconic modern cards.

**3. Mega Greninja ex — Chaos Rising**
The upcoming Chaos Rising set has collectors hyped for Mega Greninja.

**4. Luffy Gear 5 #OP05-119 — One Piece TCG**
Cross-collectible appeal makes this One Piece card hugely popular.

**5. Mewtwo VSTAR #079 — Crown Zenith**
Crown Zenith's premium feel makes this Mewtwo a display piece.

Protect your investment with Legacy Vault extended art prints and acrylic display cases!`,
    imageUrl: "https://picsum.photos/seed/top5-cards/800/450",
    publishedAt: "2026-01-10",
    isPublished: true,
  },
];

// --- Helper: Get article by slug ---
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
