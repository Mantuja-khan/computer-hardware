import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { apiClient } from "@/api/apiClient";

const tabs = ["New Arrivals", "Featured Products", "Best Sellers"];

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState("Featured Products");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getFiltered = () => {
    let filtered = [];
    switch (activeTab) {
      case "New Arrivals":
        filtered = products.filter((p) => p.badge === "new" || p.id > 5);
        break;
      case "Best Sellers":
        filtered = products.filter((p) => p.rating >= 4.5 || p.badge === "hot");
        break;
      default:
        filtered = products;
        break;
    }
    // Limit to exactly 4 products for the home page layout
    return filtered.slice(0, 4);
  };

  return (
    <section className="container py-10">
      <div className="flex items-center justify-center gap-6 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${activeTab === tab
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground animate-pulse">Loading products...</div>
        ) : (
          getFiltered().map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductSection;
