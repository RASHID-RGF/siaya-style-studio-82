import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Akinyi Ochieng',
    location: 'Siaya Town',
    rating: 5,
    text: 'The quality of clothes here is exceptional. I always find unique pieces that make me stand out.',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
  },
  {
    id: 2,
    name: 'James Otieno',
    location: 'Bondo',
    rating: 5,
    text: 'Best boutique in Siaya County! Great customer service and the prices are very fair.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: 3,
    name: 'Faith Adhiambo',
    location: 'Ugunja',
    rating: 5,
    text: 'I love how they blend modern fashion with our local style. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join thousands of satisfied customers across Siaya County
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card rounded-2xl p-6 shadow-boutique hover-lift animate-fade-up stagger-${index + 1}`}
              style={{ opacity: 0 }}
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
