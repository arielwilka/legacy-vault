// ============================================================
// Legacy Vault — Footer Component
// Standard e-commerce footer with links, socials, copyright
// ============================================================

import Link from "next/link";
import { Shield, Globe, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/list-product" },
    { label: "Extended Art Prints", href: "/list-product?category=Extended+Art+Print" },
    { label: "Acrylic Display Cases", href: "/list-product?category=Acrylic+Display+Case" },
    { label: "Accessories", href: "/list-product?category=Accessories" },
  ],
  customer: [
    { label: "My Account", href: "/login" },
    { label: "Order History", href: "/login" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Contact Us", href: "#" },
  ],
  info: [
    { label: "About Us", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      {/* Gold separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-gold" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-wider text-gradient-gold">
                  LEGACY
                </span>
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
                  VAULT
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium extended art prints & acrylic display cases for your
              treasured TCG collection. Hand-drawn designs, museum-quality
              display.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/legacyvault.id"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-gold/10 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://shopee.co.id/legacyvault.id"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-gold/10 hover:text-gold transition-colors"
                aria-label="Shopee"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://tokopedia.com/legacyvault"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-gold/10 hover:text-gold transition-colors"
                aria-label="Tokopedia"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Customer Service
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.customer.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Information
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Legacy Vault. All rights reserved.</p>
          <p>
            Handcrafted with ❤️ in Indonesia — Protect your legacy, elevate your
            collection.
          </p>
        </div>
      </div>
    </footer>
  );
}
