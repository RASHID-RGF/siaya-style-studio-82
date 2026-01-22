import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
