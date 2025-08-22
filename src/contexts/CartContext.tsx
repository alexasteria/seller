import React, { createContext, useContext, useMemo, useState } from 'react';
import { CartState } from '../types';
import { MENU } from '../data/menu';

interface CartContextType {
  cart: CartState;
  total: number;
  hasItems: boolean;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});

  const total = useMemo(() =>
    Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = MENU.find(m => m.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0), [cart]);

  const hasItems = total > 0.009;

  const increment = (id: string) => 
    setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  const decrement = (id: string) => 
    setCart(prev => {
      const next = { ...prev };
      if ((next[id] ?? 0) > 1) next[id] = next[id] - 1; 
      else delete next[id];
      return next;
    });

  const clearCart = () => setCart({});

  const value = {
    cart,
    total,
    hasItems,
    increment,
    decrement,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

