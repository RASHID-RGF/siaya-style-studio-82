import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img
          src="/print.jpeg"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          {/* Badge with slide up animation */}
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            New Season Collection
          </motion.span>
          
          {/* Title with staggered animations */}
          <motion.h1 
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 hover:text-terracotta-light transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Elevate Your
            <motion.span 
              className="block text-terracotta-light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Style Story
            </motion.span>
          </motion.h1>

          {/* Description with fade in */}
          <motion.p 
            className="text-lg text-primary-foreground/80 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Discover curated fashion pieces that celebrate modern elegance and timeless sophistication.
            Our collection features premium quality craftsmanship that blends contemporary African style with global fashion trends.
            From elegant maxi dresses to versatile unisex wear, find your perfect expression of style.
          </motion.p>
          
          {/* Buttons with stagger */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link to="/shop">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="hero" size="xl" className="group">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/shop?category=new">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="glass" size="xl" className="text-primary-foreground border-primary-foreground/30">
                  New Arrivals
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary-foreground/30'}`}
            animate={i === 0 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </section>
  );
}

