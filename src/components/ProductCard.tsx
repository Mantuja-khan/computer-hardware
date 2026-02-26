import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

import productGamingLaptop from "@/assets/product-gaming-laptop.jpg";
import productUltrabook from "@/assets/product-ultrabook.jpg";
import productDesktop from "@/assets/product-desktop.jpg";
import productBusinessLaptop from "@/assets/product-business-laptop.jpg";
import productAccessories from "@/assets/product-accessories.jpg";
import productMonitor from "@/assets/product-monitor.jpg";
import productKeyboard from "@/assets/product-keyboard.jpg";

const imageMap: Record<string, string> = {
  "product-gaming-laptop": productGamingLaptop,
  "product-ultrabook": productUltrabook,
  "product-desktop": productDesktop,
  "product-business-laptop": productBusinessLaptop,
  "product-accessories": productAccessories,
  "product-monitor": productMonitor,
  "product-keyboard": productKeyboard,
};

const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const productId = product._id || product.id;
  const productImage = imageMap[product.image] || product.image;

  return (
    <div className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <Link to={`/product/${productId}`} className="block">
        <div className="relative aspect-square bg-secondary/50 flex items-center justify-center overflow-hidden p-4">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.badge && (
            <span
              className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded ${product.badge === "sale"
                ? "bg-destructive text-destructive-foreground"
                : product.badge === "new"
                  ? "bg-primary text-primary-foreground"
                  : "bg-foreground text-background"
                }`}
            >
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium truncate">{product.name}</h3>
          <div className="flex items-center gap-0.5 my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < product.rating ? "fill-star text-star" : "text-muted"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-price font-bold text-sm">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-price-old text-xs line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
          className="w-full flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-xs py-2 rounded hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
