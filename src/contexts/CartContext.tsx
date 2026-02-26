import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: any) => void;
  updateQuantity: (productId: any, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  clearCart: () => { },
  totalAmount: 0,
  itemCount: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: any) => {
    setItems((prev) => {
      const pId = product._id || product.id;
      const existing = prev.find((i) => (i.product._id || i.product.id) === pId);
      if (existing) {
        return prev.map((i) =>
          (i.product._id || i.product.id) === pId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
  };

  const removeFromCart = (productId: any) => {
    setItems((prev) => prev.filter((i) => (i.product._id || i.product.id) !== productId));
  };

  const updateQuantity = (productId: any, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => ((i.product._id || i.product.id) === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalAmount = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
