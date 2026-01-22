import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, LayoutGrid, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

const priceRanges = [
  { label: 'Under KES 2,000', min: 0, max: 2000 },
  { label: 'KES 2,000 - 4,000', min: 2000, max: 4000 },
  { label: 'KES 4,000 - 6,000', min: 4000, max: 6000 },
  { label: 'Over KES 6,000', min: 6000, max: Infinity },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedPrice = searchParams.get('price') || '';
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedPrice) {
        const range = priceRanges.find(r => r.label === selectedPrice);
        if (range && (product.price < range.min || product.price > range.max)) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedPrice]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all' || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPrice !== '';

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
            Shop Collection
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                variant={gridCols === 2 ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setGridCols(2)}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridCols === 3 ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setGridCols(3)}
                className="hidden sm:flex"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar Filters */}
          <aside className={cn(
            "lg:w-64 shrink-0",
            isFilterOpen ? "block" : "hidden lg:block"
          )}>
            <div className="sticky top-24 space-y-6 bg-card rounded-2xl p-6 shadow-boutique">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', 'all')}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === 'all' ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    )}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <button
                      key={range.label}
                      onClick={() => updateFilter('price', selectedPrice === range.label ? '' : range.label)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedPrice === range.label ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                    <button onClick={() => updateFilter('category', 'all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedPrice && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {selectedPrice}
                    <button onClick={() => updateFilter('price', '')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Grid Controls (Desktop) */}
            <div className="hidden lg:flex justify-end mb-6 gap-2">
              <Button
                variant={gridCols === 2 ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setGridCols(2)}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridCols === 3 ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setGridCols(3)}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={cn(
                "grid gap-4 lg:gap-6",
                gridCols === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"
              )}>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
