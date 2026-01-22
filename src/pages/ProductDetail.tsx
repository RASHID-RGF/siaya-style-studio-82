import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Heart, Share2, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Added to cart!');
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary/30">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-20 h-24 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-8">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.subcategory}
              </p>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-primary">
                  KES {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    KES {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">
                Color: <span className="text-muted-foreground">{selectedColor || 'Select'}</span>
              </h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all",
                      selectedColor === color.name ? "border-primary scale-110" : "border-border"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">
                Size: <span className="text-muted-foreground">{selectedSize || 'Select'}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[48px] h-12 px-4 rounded-lg border-2 font-medium transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-primary text-primary")} />
              </Button>

              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Free Delivery</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-secondary/30 py-16">
          <div className="container">
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
