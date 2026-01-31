import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { newArrivals } from '@/data/products';
import { StaggeredGrid, StaggerItem } from '@/components/ui/ScrollAnimations';

export function NewArrivals() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Just In</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              New Arrivals
            </h2>
            <p className="text-muted-foreground">
              Fresh styles just landed in store
            </p>
          </div>
          <Link to="/shop?sort=newest">
            <Button variant="outline" className="group">
              See All New
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <StaggeredGrid>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.slice(0, 4).map((product, index) => (
              <StaggerItem key={product.id} direction={index % 2 === 0 ? "up" : "up"}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </div>
        </StaggeredGrid>
      </div>
    </section>
  );
}

