import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Animated image with parallax and reveal effects
export const AnimatedImage = ({
  src,
  alt,
  className = "",
  parallax = true,
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  reveal?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-10%", "10%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], reveal ? [0.9, 1, 1, 0.9] : [1, 1, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], reveal ? [0, 1, 1, 0] : [1, 1, 1, 1]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.img
        style={{ y, scale, opacity }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

// Scroll-reveal container for elements
export const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ ...directions[direction], opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Cinematic image card with hover effects
export const CinematicImageCard = ({
  src,
  alt,
  title,
  subtitle,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
      style={{ scale }}
    >
      <motion.div style={{ y }} className="h-full w-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Text content */}
      <motion.div 
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 p-6"
      >
        <motion.p 
          className="text-primary font-medium text-sm mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        <motion.h3 
          className="font-display text-2xl font-bold text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.div
          className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-primary-foreground/80 text-sm">Explore →</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Staggered grid animation container
export const StaggeredGrid = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({
  children,
  direction = "up",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      variants={{
        hidden: { ...directions[direction], opacity: 0 },
        visible: { x: 0, y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
};

