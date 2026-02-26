import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { apiClient } from "@/api/apiClient";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "All");
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

  const filtered = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  if (loading) {
    return <div className="container py-8 text-center">Loading products...</div>;
  }

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Filters</h3>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`block w-full text-left text-sm py-1.5 px-3 rounded transition-colors ${selectedCategory === "All" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left text-sm py-1.5 px-3 rounded transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border rounded px-3 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No products found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;
