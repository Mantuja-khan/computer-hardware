import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/api/apiClient";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalAmount, itemCount } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [paying, setPaying] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to sign in to checkout.", variant: "destructive" });
      return;
    }

    setPaying(true);

    try {
      const data = await apiClient.post("/orders", {
        amount: totalAmount,
        items: items.map((i) => ({
          product_id: i.product._id || i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price
        })),
      });

      if (!data?.order_id) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: data.key_id,
        amount: 1000 * 100, // Fixed advance payment of ₹1,000
        currency: "INR",
        name: "Electros",
        description: `Order of ${itemCount} item(s)`,
        order_id: data.order_id,
        handler: async (response: any) => {
          // Verify payment
          try {
            await apiClient.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              db_order_id: data.db_order_id,
            });

            toast({ title: "Payment Successful! 🎉", description: "Your order has been placed." });
            clearCart();
          } catch (verifyError: any) {
            toast({ title: "Payment verification failed", description: verifyError.message, variant: "destructive" });
          }
        },
        prefill: { email: user.email },
        theme: { color: "#2E9B56" },
      };

      if (!window.Razorpay) {
        toast({ title: "Checkout Error", description: "Razorpay SDK failed to load. Please refresh the page.", variant: "destructive" });
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        toast({ title: "Payment failed", description: response.error.description || "Please try again.", variant: "destructive" });
      });
      rzp.open();
    } catch (err: any) {
      toast({ title: "Checkout error", description: err.message, variant: "destructive" });
    } finally {
      setPaying(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="container py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Start shopping and add some items!</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium text-sm hover:opacity-90">
          Browse Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({itemCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const pId = item.product._id || item.product.id;
            return (
              <div key={pId} className="flex gap-4 p-4 border rounded-lg bg-card">
                <Link to={`/product/${pId}`} className="w-20 h-20 bg-secondary/50 rounded shrink-0 flex items-center justify-center">
                  <img src={item.product.image.startsWith('http') ? item.product.image : `/placeholder.svg`} alt={item.product.name} className="w-full h-full object-contain p-2" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${pId}`} className="font-medium text-sm hover:text-primary truncate block">
                    {item.product.name}
                  </Link>
                  <p className="text-price font-bold text-sm mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(pId, item.quantity - 1)} className="w-7 h-7 border rounded flex items-center justify-center hover:bg-secondary">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(pId, item.quantity + 1)} className="w-7 h-7 border rounded flex items-center justify-center hover:bg-secondary">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(pId)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="border rounded-lg p-6 bg-card h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary font-medium">Free</span>
            </div>
          </div>
          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between font-bold">
              <span>Grand Total</span>
              <span className="text-muted-foreground line-through text-xs self-end mb-1 opacity-50">{formatPrice(totalAmount + (totalAmount * 0.7 / 0.3))}</span>
              <span className="text-price">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-primary p-2 bg-primary/5 rounded border border-primary/20">
              <div className="flex flex-col">
                <span className="text-sm">Pay Advance</span>
                <span className="text-[10px] font-normal text-muted-foreground leading-tight">Pay only ₹1,000 now to secure your order</span>
              </div>
              <span className="text-lg">₹1,000</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Balance (on delivery)</span>
              <span>{formatPrice(totalAmount - 1000)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={paying}
            className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-md font-bold text-sm tracking-wide shadow-sm hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
          >
            {paying ? "Creating Order..." : "PAY ₹1,000 ADVANCE"}
          </button>
          {!user && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to checkout
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
