import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import { CinematicImageCard, StaggeredGrid, StaggerItem } from '@/components/ui/ScrollAnimations';

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our curated collections for every style and occasion
          </p>
        </div>

        <StaggeredGrid delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <StaggerItem key={category.id} direction={index % 2 === 0 ? "up" : "up"}>
                <CinematicImageCard
                  src={category.image}
                  alt={category.name}
                  title={category.name}
                  subtitle={`${category.productCount} Products`}
                  className="aspect-[3/4]"
                />
              </StaggerItem>
            ))}
          </div>
        </StaggeredGrid>
      </div>
    </section>
  );
}

