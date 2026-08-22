import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '@/types';
import { cartLineId } from '@/lib/format';

interface AddToCartInput {
  productId: string;
  name: string;
  image: string;
  sizeId: string;
  sizeLabel: string;
  quantity: number;
  selections: {
    groupId: string;
    groupName: string;
    optionIds: string[];
    optionLabels: string[];
  }[];
  unitPrice: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (input: AddToCartInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'kf_cart_v1';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors */
    }
  }, [items]);

  const addItem = useCallback((input: AddToCartInput) => {
    const id = cartLineId(input.productId, input.sizeId, Object.fromEntries(input.selections.map((s) => [s.groupId, s.optionIds])));
    const total = input.unitPrice * input.quantity;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity + input.quantity, total: i.unitPrice * (i.quantity + input.quantity) }
            : i,
        );
      }
      const item: CartItem = {
        id,
        productId: input.productId,
        name: input.name,
        image: input.image,
        sizeId: input.sizeId,
        sizeLabel: input.sizeLabel,
        quantity: input.quantity,
        selections: input.selections,
        unitPrice: input.unitPrice,
        total,
      };
      return [...prev, item];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity, total: i.unitPrice * quantity } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.total, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, count, subtotal, addItem, updateQuantity, removeItem, clearCart }),
    [items, count, subtotal, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
