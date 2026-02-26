export interface Product {
  _id?: string;
  id: number | string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  images?: string[];
  badge?: "sale" | "new" | "hot";
  description: string;
  specs?: Record<string, string>;
}
export const categories = [
  "Laptops",
  "Desktops",
  "Accessories",
];
export const products: Product[] = [
  {
    id: 1,
    name: "HP 15s AMD Ryzen 5 Quad Core 7520U - (16 GB/512 GB SSD/Windows 11 Home) 15-fc0030AU | 15-fc0690AU Thin and Light Laptop (15.6 Inch, Natural Silver, 1.75 Kg, With MS Office)",
    category: "Laptops",
    price: 43990,
    rating: 5,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800"
    ],
    badge: "new",
    description: "HP 15s Thin and Light Laptop featuring AMD Ryzen 5 Quad Core 7520U processor, 16GB LPDDR5 RAM, and 512GB SSD storage. It comes with Windows 11 Home and MS Office pre-installed, offering a smooth experience for work and entertainment on its 15.6-inch Full HD display.",
    specs: {
      "Processor": "AMD Ryzen 5 Quad Core 7520U",
      "RAM": "16 GB LPDDR5",
      "Storage": "512 GB SSD",
      "Display": "15.6 Inch Full HD",
      "Graphics": "AMD Radeon Graphics",
      "Weight": "1.75 Kg",
      "OS": "Windows 11 Home",
      "Software": "MS Office Included"
    },
  },
];
