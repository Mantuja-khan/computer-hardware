import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { categories } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { apiClient } from "@/api/apiClient";
import logo from "@/assets/logo.png"

const categoryImages: Record<string, string> = {
  "Laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400",
  "Desktops": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400",
  "Accessories": "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/s/n/u/-original-imahaksassduhpgs.jpeg?q=90",
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const location = useLocation();
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      try {
        const data = await apiClient.get('/products');
        const query = searchQuery.toLowerCase();
        const filtered = data.filter((p: any) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        ).slice(0, 6);

        setSearchResults(filtered);
        setShowResults(true);
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchContainerRef.current && searchContainerRef.current.contains(target)) {
        return;
      }
      setShowResults(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 shadow-sm relative">
      {/* Search Overlay */}
      <div
        className={`absolute inset-0 bg-background z-50 flex items-center justify-center transition-all duration-300 ease-in-out px-3 md:px-8 border-b ${searchOpen ? "opacity-100 visible h-[56px] sm:h-[64px] md:h-[72px]" : "opacity-0 invisible h-0"}`}
        ref={searchContainerRef}
      >
        <div className="container relative flex items-center justify-center w-full max-w-4xl gap-2 sm:gap-4">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for laptops, desktops, accessories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => { if (searchQuery.trim() && searchResults.length > 0) setShowResults(true); }}
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm sm:text-base md:text-lg h-full py-3 md:py-4 text-foreground placeholder:text-muted-foreground/60"
          />
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery(""); setShowResults(false); }}
            className="shrink-0 p-1.5 sm:p-2 hover:bg-secondary rounded-full transition-colors group"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground" />
          </button>

          {/* Search Dropdown Panel */}
          {showResults && searchOpen && (
            <div className="absolute top-[52px] sm:top-[60px] left-0 right-0 bg-background border rounded-b-xl shadow-2xl overflow-hidden z-[60] animate-fade-in origin-top">
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 p-2 max-h-[60vh] overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product._id || product.id}
                      to={`/product/${product._id || product.id}`}
                      onClick={() => { setShowResults(false); setSearchQuery(""); setSearchOpen(false); }}
                      className="flex items-center gap-3 p-2 sm:p-3 hover:bg-secondary/50 transition-colors rounded-lg group"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-secondary/30 rounded flex items-center justify-center p-1.5 sm:p-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=200";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-foreground truncate" title={product.name}>
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs sm:text-sm text-primary font-bold">₹{product.price}</span>
                          {product.oldPrice && (
                            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">₹{product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 sm:p-8 text-center text-sm sm:text-base text-muted-foreground">
                  No products found matching "{searchQuery}". Try a different keyword.
                </div>
              )}
              {searchResults.length > 0 && (
                <div className="bg-secondary/20 p-2 sm:p-3 text-center border-t">
                  <Link
                    to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); setShowResults(false); }}
                    className="text-primary text-xs sm:text-sm font-medium hover:underline"
                  >
                    View all results for "{searchQuery}"
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className={`bg-header text-header-foreground transition-opacity duration-300 ${searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="container flex items-center justify-between h-[56px] sm:h-[64px] md:h-[72px] gap-2 sm:gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="EcoLaptop Logo"
              className="h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            {/* Fallback */}
            <div className="hidden items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs sm:text-sm">E</span>
              </div>
              <span className="text-base sm:text-xl font-bold tracking-tight">EcoLaptop</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
            {navLinks.map((link) => {
              if (link.name === "Shop") {
                return (
                  <div
                    key={link.name}
                    className="relative h-full flex items-center group"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <Link
                      to={link.path}
                      className={`text-sm lg:text-base font-medium transition-colors flex items-center gap-1 h-full py-4 ${location.pathname.includes(link.path) ? "text-primary" : "text-white hover:text-primary"}`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${showMegaMenu ? "rotate-180" : ""}`} />
                    </Link>

                    {showMegaMenu && (
                      <div className="absolute top-[80%] left-[-10px] w-56 lg:w-60 bg-background border shadow-xl rounded-xl z-50 p-2 animate-fade-in origin-top">
                        <div className="absolute -top-4 left-0 w-full h-8 bg-transparent" />
                        <div className="flex flex-col gap-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat}
                              to={`/shop?category=${cat}`}
                              className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                              onClick={() => setShowMegaMenu(false)}
                            >
                              <div className="w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded overflow-hidden bg-secondary">
                                <img
                                  src={categoryImages[cat]}
                                  alt={cat}
                                  className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 flex justify-between items-center">
                                <span className="font-medium text-xs lg:text-sm text-foreground group-hover/item:text-primary transition-colors">{cat}</span>
                                <ChevronDown className="w-3 h-3 text-muted-foreground opacity-0 -rotate-90 group-hover/item:opacity-100 transition-opacity" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm lg:text-base font-medium transition-colors h-full flex items-center ${location.pathname === link.path ? "text-primary" : "text-white hover:text-primary"}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors group"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-primary transition-colors" />
            </button>

            <Link
              to={user ? "/profile" : "/auth"}
              className="hidden sm:flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-white/10 rounded-full sm:rounded-md transition-colors group"
              title={user ? "Profile" : "Login / Register"}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-primary" />
              {!user && <span className="hidden lg:block text-xs sm:text-sm font-medium text-white">Login</span>}
              {user && <span className="hidden lg:block text-xs sm:text-sm font-medium text-white max-w-[80px] lg:max-w-[100px] truncate">{user.display_name || 'Account'}</span>}
            </Link>

            {user && (
              <button
                onClick={signOut}
                className="hidden sm:flex items-center justify-center p-1.5 sm:p-2 hover:bg-destructive/20 text-destructive rounded-full transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            )}

            <Link to="/cart" className="relative p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors group">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="md:hidden p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b shadow-lg absolute top-full left-0 right-0 z-40 animate-in slide-in-from-top-2">
          <div className="container py-3 sm:py-4 space-y-1 sm:space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2.5 sm:py-3 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}
                >
                  {link.name}
                </Link>
                {link.name === "Shop" && (
                  <div className="pl-6 sm:pl-8 pr-4 py-2 grid grid-cols-1 gap-1 sm:gap-2 border-l-2 border-border ml-5 sm:ml-6 my-1 sm:my-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/shop?category=${cat}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground hover:text-primary font-medium"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t my-2 pt-2 px-3 sm:px-4 space-y-1 sm:space-y-2">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2.5 sm:py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-md px-3 sm:px-4">
                    My Profile ({user.display_name})
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-left py-2.5 sm:py-3 px-3 sm:px-4 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="block py-2.5 sm:py-3 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md px-3 sm:px-4 text-center mt-3 sm:mt-4">
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;