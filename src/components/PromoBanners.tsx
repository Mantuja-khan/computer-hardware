import { Link } from "react-router-dom";
import promoWorkspace from "@/assets/promo-workspace.jpg";
import promoDesign from "@/assets/promo-design.jpg";

const PromoBanners = () => {
  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden group h-48 sm:h-56">
          <img src={promoWorkspace} alt="Workspace setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-foreground/40 flex items-center p-6">
            <div>
              <p className="text-primary text-xs font-semibold uppercase">The Versa</p>
              <h3 className="text-background text-xl font-bold mb-1">New Design CAM</h3>
              <p className="text-background/70 text-xs mb-3 max-w-[200px]">
                The smart way to organise your complete workspace with style.
              </p>
              <Link to="/shop" className="text-primary text-sm font-semibold hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden group h-48 sm:h-56">
          <img src={promoDesign} alt="Sleek laptop design" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-end p-6 text-right">
            <div>
              <h3 className="text-background text-xl font-bold mb-1">Sleek & Cutting-edge Design</h3>
              <p className="text-background/70 text-xs mb-3 max-w-[220px] ml-auto">
                Built with attention to detail using cutting-edge design principles.
              </p>
              <Link to="/shop" className="text-primary text-sm font-semibold hover:underline">
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
