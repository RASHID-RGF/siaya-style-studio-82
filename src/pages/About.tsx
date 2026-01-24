import { Layout } from '@/components/layout/Layout';

export default function About() {
  return (
    <Layout>
      <div className="container py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              About Siaya Style Studio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating modern elegance through curated fashion that blends African heritage with contemporary style.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2024, Siaya Style Studio emerged from a passion for celebrating African fashion heritage
                while embracing modern design sensibilities. Our name draws inspiration from Lake Victoria's shores,
                symbolizing the convergence of cultures and styles.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe fashion is more than clothing—it's a form of self-expression that tells your unique story.
                Our curated collection features pieces that blend traditional African prints with contemporary silhouettes,
                creating versatile wardrobes for the modern individual.
              </p>
            </div>
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Quality craftsmanship and sustainable practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Cultural celebration through modern design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Inclusive sizing for all body types</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Empowering local artisans and designers</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold mb-6">Visit Our Store</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience our collection in person at our store located opposite Siaya GK Prison in Siaya, on your way to Bondo.
              Our knowledgeable staff is ready to help you find pieces that reflect your personal style.
            </p>
            <div className="bg-secondary/30 rounded-xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold mb-2">Store Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <h3 className="font-semibold mb-4">Location Map</h3>
              <div className="aspect-video bg-secondary/30 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.756!2d34.288!3d0.061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMC4wNjEnMzQuMyJOIDM0LjI4OCcwMC4wIkU!5e0!3m2!1sen!2ske!4v1634567890123!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}