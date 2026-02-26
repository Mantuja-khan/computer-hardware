import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders over $500" },
  { icon: RotateCcw, title: "Product Returns", desc: "30-day return policy" },
  { icon: ShieldCheck, title: "Safe Payment", desc: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated support team" },
];

const FeaturesBar = () => {
  return (
    <section className="bg-secondary py-8 border-y">
      <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="flex items-center gap-3">
            <f.icon className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="text-sm font-semibold">{f.title}</h4>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesBar;
