import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/modern.jpeg"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary/30">
            New Season Collection
          </span>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 hover:text-terracotta-light transition-colors duration-300 cursor-pointer">
            Elevate Your
            <span className="block text-terracotta-light">Style Story</span>
          </h1>

          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
            Discover curated fashion pieces that celebrate modern elegance and timeless sophistication.
            Our collection features premium quality craftsmanship that blends contemporary African style with global fashion trends.
            From elegant maxi dresses to versatile unisex wear, find your perfect expression of style.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <Button variant="hero" size="xl" className="group">
                Shop Collection
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/shop?category=new">
              <Button variant="glass" size="xl" className="text-primary-foreground border-primary-foreground/30">
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary-foreground/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
