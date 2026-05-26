// ============================================================
// Legacy Vault — Cart Store (Zustand)
// Manages shopping cart state with persistence
// ============================================================

import { create } from "zustand";
import { Product, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  /** Add a product to cart or increment quantity if already exists */
  addItem: (product, quantity = 1, variant) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        // Product already in cart — increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { items: updatedItems };
      }

      // New product — add to cart
      return {
        items: [...state.items, { product, quantity, selectedVariant: variant }],
      };
    });
  },

  /** Remove a product from cart entirely */
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  /** Update the quantity of a specific cart item */
  updateQuantity: (productId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    });
  },

  /** Clear all items from the cart */
  clearCart: () => set({ items: [] }),

  /** Compute total number of items in cart */
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  /** Compute total price of all cart items */
  totalPrice: () => {
    return get().items.reduce((total, item) => {
      const price = item.product.discount
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  },
}));
