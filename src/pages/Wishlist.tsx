import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite items here for later. Click the heart icon on any product to add it.
          </p>
          <Link to="/shop">
            <Button variant="hero" size="lg">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
