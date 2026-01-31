import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { featuredProducts } from '@/data/products';
import { StaggeredGrid, StaggerItem } from '@/components/ui/ScrollAnimations';

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              Featured Pieces
            </h2>
            <p className="text-muted-foreground">
              Handpicked favorites for the season
            </p>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <StaggeredGrid>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
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

