import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div 
          className="relative overflow-hidden rounded-3xl gradient-hero p-8 lg:p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative circles */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/10 -translate-y-1/2 translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              Limited Time Offer
            </motion.div>
            
            <motion.h2 
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Season End Sale
            </motion.h2>
            
            <motion.p 
              className="text-lg text-primary-foreground/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Get up to <span className="font-bold">40% OFF</span> on selected items. 
              Refresh your wardrobe with premium pieces at unbeatable prices.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/shop?sale=true">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                    Shop Sale
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Countdown placeholder */}
            <motion.div 
              className="flex justify-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '05', label: 'Days' },
                { value: '12', label: 'Hours' },
                { value: '34', label: 'Mins' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {item.value}
                  </div>
                  <span className="text-xs text-primary-foreground/70 mt-1 block">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

