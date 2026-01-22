import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.slug}`}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] animate-fade-up stagger-${index + 1}`}
              style={{ opacity: 0 }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-primary-foreground mb-1">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-foreground/70">
                    {category.productCount} Products
                  </span>
                  <span className="p-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground transition-all duration-300 group-hover:bg-primary group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
