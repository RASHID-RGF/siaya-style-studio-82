import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-card overflow-hidden transition-all duration-500",
        "hover:shadow-boutique-lg hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered && "scale-110"
          )}
        />

        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-charcoal/20 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-3 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            isLiked ? "bg-primary text-primary-foreground" : "bg-card/80 backdrop-blur-sm text-foreground",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </button>

        {/* Quick Actions */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="glass" size="sm" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              Quick View
            </Button>
          </Link>
          <Button variant="default" size="sm" className="px-3">
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.subcategory}
        </p>
        <h3 className="font-medium text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary">
            KES {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              KES {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex gap-1 mt-3">
          {product.colors.slice(0, 4).map((color, index) => (
            <span
              key={index}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{product.colors.length - 4}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
