import { Award, Users, Laptop, TrendingUp } from "lucide-react";

const stats = [
  { icon: Laptop, value: "10K+", label: "Products Sold" },
  { icon: Users, value: "5K+", label: "Happy Customers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "99%", label: "Satisfaction Rate" },
];

const About = () => {
  return (
    <main>
      <section className="bg-header text-header-foreground py-16">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Eco Laptop Store</h1>
          <p className="text-header-foreground/70 max-w-2xl mx-auto">
            Your trusted destination for premium laptops, desktops, and computer accessories since 2010.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-lg bg-secondary">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">Our Story</h2>
          <p>
            Eco Laptop Store was founded with a simple mission: to make premium technology accessible to everyone.
            We started as a small shop and have grown into a trusted online destination for laptops, desktops,
            monitors, and accessories from top brands worldwide.
          </p>
          <p>
            Our team of tech enthusiasts carefully curates every product in our catalog, ensuring you get the
            best quality at competitive prices. We believe in honest recommendations, transparent pricing, and
            exceptional customer service at Eco Laptop Store.
          </p>
          <h2 className="text-xl font-bold text-foreground">Why Choose Eco Laptop Store?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Curated selection of premium tech products</li>
            <li>Competitive pricing with price match guarantee</li>
            <li>Expert customer support available 24/7</li>
            <li>30-day hassle-free return policy</li>
            <li>Fast and free shipping on orders over $500</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default About;