import React, { createContext, useContext, useMemo, useState } from "react";
import { CartState, Product, DeliveryInfo } from "@/types";
import { useProducts } from "@/contexts/ProductsContext";

interface CartContextType {
  cart: CartState;
  total: number;
  hasItems: boolean;
  increment: (product: Product, variantID: string) => void;
  decrement: (product: Product, variantID: string) => void;
  clearCart: () => void;
  cartMap: Map<string, Product>;
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});
  const [cartMap, setCartMap] = useState<Map<string, Product>>(new Map());
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const { products } = useProducts();

  const total = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, variantState]) => {
        const item = products.find((m) => m.id === id);
        if (!item) return sum;
        let currentItemPrice = 0;
        Object.entries(variantState).forEach(([variantID, count]) => {
          const currentVariantPrice =
            (item.variants.find((v) => v.id === variantID)?.cost ?? 0) * 100 ||
            0;
          const discountPrice = item.discount
            ? currentVariantPrice * (1 - item.discount / 100)
            : currentVariantPrice * count;
          currentItemPrice += discountPrice * count;
        });
        return sum + currentItemPrice;
      }, 0) / 100,
    [cart, products],
  );

  const hasItems = total > 0.009;

  const increment = (product: Product, variantID: string) => {
    setCart((prev) => {
      const variantCount = prev[product.id] || {};
      return {
        ...prev,
        [product.id]: {
          ...prev[product.id],
          [variantID]: (variantCount[variantID] ?? 0) + 1,
        },
      };
    });
    if (!cartMap.get(product.id)) {
      setCartMap((prev) => {
        return prev.set(product.id, product);
      });
    }
  };

  const decrement = (product: Product, variantID: string) =>
    setCart((prev) => {
      const variantCount = prev[product.id] || {};
      return {
        ...prev,
        [product.id]: {
          ...prev[product.id],
          [variantID]: (variantCount[variantID] ?? 0) - 1,
        },
      };
    });

  const clearCart = () => setCart({});

  const value = {
    cart,
    total,
    hasItems,
    increment,
    decrement,
    clearCart,
    cartMap,
    deliveryInfo,
    setDeliveryInfo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
