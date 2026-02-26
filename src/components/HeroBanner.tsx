import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroLaptop from "@/assets/hero-laptop.jpg";

const slides = [
  {
    image: "https://i.pinimg.com/1200x/0a/3e/b1/0a3eb13e27748d1c92171b4eefb85575.jpg",
    tag: "Latest Collection",
    title: "Get MacBook Pro\nA Touch Of Genius",
    desc: "Now it's even faster than it looks. Experience unprecedented performance.",
    link: "/shop"
  },
  {
    image: "https://i.pinimg.com/1200x/ca/13/aa/ca13aafb9ffae845c3f6c5c6b667fb4b.jpg",
    tag: "New Arrivals",
    title: "Powerful Desktops\nFor Professionals",
    desc: "Unleash your creativity with top-tier desktop workstations.",
    link: "/shop?category=Desktops"
  },
  {
    image: "https://i.pinimg.com/1200x/c3/14/65/c314656d13a6cda33da180c8be441677.jpg",
    tag: "Accessories",
    title: "Elevate Your Setup\nPremium Accessories",
    desc: "Discover high-quality peripherals for a complete experience.",
    link: "/shop?category=Accessories"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide
              ? "opacity-100 translate-x-0 z-10"
              : index < currentSlide
                ? "opacity-0 -translate-x-full z-0"
                : "opacity-0 translate-x-full z-0"
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay to ensure text is readable against the background image. Darkened to match gaming theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-xl">
                  {/* Content animation staggered for each slide manually */}
                  <p className={`text-primary text-sm font-bold mb-3 uppercase tracking-[0.2em] transition-all duration-700 delay-300 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    {slide.tag}
                  </p>
                  <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 whitespace-pre-line transition-all duration-700 delay-500 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    {slide.title}
                  </h1>
                  <p className={`text-white/80 text-base sm:text-lg mb-8 max-w-md transition-all duration-700 delay-700 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    {slide.desc}
                  </p>
                  <div className={`transition-all duration-700 delay-[900ms] ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 hover:scale-105 transition-all shadow-lg hover:shadow-primary/25"
                    >
                      Discover Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary w-8" : "bg-white/40 w-2 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
