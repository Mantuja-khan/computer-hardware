import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { apiClient } from "@/api/apiClient";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiClient.get(`/products/${id}`);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        } else {
          setActiveImage(data.image);
        }

        const allProducts = await apiClient.get("/products");
        const foundRelated = allProducts.filter((p: any) => p.category === data.category && (p._id || p.id) !== (data._id || data.id)).slice(0, 4);
        setRelated(foundRelated);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className="container py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="flex gap-4 h-fit">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
            {galleryImages.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="bg-secondary/20 rounded-xl p-4 sm:p-8 flex items-center justify-center aspect-square flex-1 border border-border/50">
            <img
              src={activeImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain drop-shadow-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          {product.badge && (
            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-2 ${product.badge === "sale" ? "bg-destructive text-destructive-foreground"
              : product.badge === "new" ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background"
              }`}>
              {product.badge.toUpperCase()}
            </span>
          )}

          {/* ✅ Updated: smaller font size and lighter font weight — Flipkart style */}
          <h1 className="text-base font-normal text-foreground leading-snug mb-1">{product.name}</h1>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
              {product.rating} <Star className="w-3 h-3 fill-white" />
            </span>
            <span className="text-xs text-muted-foreground">({product.rating}/5) Ratings</span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-price-old line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {product.oldPrice && (
              <span className="text-sm text-green-600 font-semibold">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity mb-6"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>

          {/* Specs */}
          {product.specs && (
            <div className="border rounded-lg overflow-hidden">
              <h3 className="font-semibold p-3 bg-secondary text-sm">Specifications</h3>
              <div className="divide-y">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex text-sm">
                    <span className="w-1/3 p-3 font-medium bg-secondary/30 text-xs">{key}</span>
                    <span className="w-2/3 p-3 text-muted-foreground text-xs">{value as any}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perks */}
          <div className="grid grid-cols-3 gap-4 mt-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" /> Free Delivery
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RotateCcw className="w-4 h-4 text-primary" /> 30-Day Returns
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" /> 1 Year Warranty
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;