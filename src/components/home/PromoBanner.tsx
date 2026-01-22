import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 lg:p-16">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Limited Time Offer
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Season End Sale
            </h2>
            
            <p className="text-lg text-primary-foreground/90 mb-8">
              Get up to <span className="font-bold">40% OFF</span> on selected items. 
              Refresh your wardrobe with premium pieces at unbeatable prices.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop?sale=true">
                <Button size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                  Shop Sale
                </Button>
              </Link>
            </div>
            
            {/* Countdown placeholder */}
            <div className="flex justify-center gap-4 mt-8">
              {[
                { value: '05', label: 'Days' },
                { value: '12', label: 'Hours' },
                { value: '34', label: 'Mins' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {item.value}
                  </div>
                  <span className="text-xs text-primary-foreground/70 mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
