import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'The Art of Mixing African Prints with Contemporary Fashion',
    excerpt: 'Discover how to seamlessly blend traditional African patterns with modern silhouettes for a unique style statement.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    content: `
      <p>In the ever-evolving world of fashion, the fusion of traditional African prints with contemporary silhouettes represents a beautiful marriage of heritage and modernity. This style approach not only celebrates cultural diversity but also creates unique, standout pieces that tell a story.</p>

      <h2>The Foundation: Understanding African Prints</h2>
      <p>African prints are rich in symbolism and history. From the vibrant Kente cloth of Ghana to the intricate wax prints that originated in Indonesia but were popularized in West Africa, each pattern carries meaning and tradition. Understanding these roots allows us to appreciate the depth behind the designs.</p>

      <h2>Modern Silhouettes: The Contemporary Canvas</h2>
      <p>Contemporary fashion favors clean lines, structured shapes, and versatile pieces. Think tailored blazers, flowing maxi dresses, and minimalist accessories. These silhouettes provide the perfect backdrop for bold African prints to shine.</p>

      <h2>Mixing Techniques</h2>
      <ul>
        <li><strong>Layering:</strong> Combine printed pieces with neutral solids to create balance</li>
        <li><strong>Scale Play:</strong> Mix large-scale prints with smaller patterns for visual interest</li>
        <li><strong>Color Coordination:</strong> Use complementary colors to tie different prints together</li>
      </ul>

      <h2>Practical Tips for Your Wardrobe</h2>
      <p>Start small with accessories like scarves or bags featuring African prints. Gradually incorporate them into your wardrobe through statement pieces that can be dressed up or down. Remember, confidence is key when wearing bold patterns.</p>

      <p>The beauty of mixing African prints with contemporary fashion lies in creating pieces that are both timeless and current, honoring tradition while embracing the present moment.</p>
    `,
  },
  {
    id: '2',
    title: 'Sustainable Fashion: Our Commitment to Ethical Production',
    excerpt: 'Learn about our journey towards sustainable fashion practices and how we support local artisans.',
    date: '2024-01-10',
    readTime: '4 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    content: `
      <p>Sustainability in fashion is no longer a trend—it's a necessity. At Siaya Style Studio, we're committed to ethical production practices that honor both people and the planet.</p>

      <h2>Our Sustainable Journey</h2>
      <p>Our commitment to sustainability began with a simple question: How can we create beautiful fashion that doesn't harm the environment or exploit workers? This led us to partner with local artisans who share our values.</p>

      <h2>Supporting Local Artisans</h2>
      <p>We work directly with skilled craftsmen and women in communities across East Africa. By providing fair wages and safe working conditions, we're helping preserve traditional techniques while supporting local economies.</p>

      <h2>Material Choices</h2>
      <p>We're constantly exploring sustainable fabric alternatives, including organic cotton, recycled materials, and innovative plant-based textiles. Our goal is to reduce our environmental footprint while maintaining the quality our customers expect.</p>

      <h2>Transparency and Traceability</h2>
      <p>We believe in complete transparency. Every piece in our collection includes information about its origin, materials, and the artisans who created it. This traceability builds trust and allows our customers to make informed choices.</p>

      <p>Sustainable fashion is about creating a better future for everyone involved in the process—from the farmers growing the cotton to the customers wearing our pieces.</p>
    `,
  },
  {
    id: '3',
    title: 'Seasonal Trends: What to Expect in 2024',
    excerpt: 'A preview of the fashion trends we\'re excited about for the upcoming season.',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    content: `
      <p>As we look ahead to 2024, the fashion landscape is evolving with exciting new directions. Here are the trends we're most excited about for the coming season.</p>

      <h2>The Rise of Cultural Fusion</h2>
      <p>We're seeing a beautiful blending of global influences, with African prints and silhouettes taking center stage alongside Asian and European elements. This cultural fusion creates unique, conversation-starting pieces.</p>

      <h2>Sustainable Luxury</h2>
      <p>Luxury fashion is going green. Expect to see high-end brands incorporating sustainable materials and ethical production methods. Quality over quantity is the new luxury mantra.</p>

      <h2>Gender Fluidity</h2>
      <p>The lines between men's and women's fashion continue to blur. Unisex pieces that can be styled in multiple ways are becoming increasingly popular, offering versatility and inclusivity.</p>

      <h2>Technology in Fashion</h2>
      <p>Innovative fabrics with built-in technology—think moisture-wicking, temperature-regulating materials—are making their way into everyday wear. Comfort and functionality are now as important as style.</p>

      <h2>Color Stories</h2>
      <p>Earth tones with pops of vibrant color dominate the palette. Think terracotta, sage green, and deep indigo, accented with bright coral or turquoise.</p>

      <p>These trends reflect a fashion industry that's becoming more conscious, inclusive, and innovative. We're excited to see how these directions shape the coming season.</p>
    `,
  },
  {
    id: '4',
    title: 'Behind the Scenes: Crafting Our Signature Pieces',
    excerpt: 'Take a look at the craftsmanship and attention to detail that goes into each Siaya Style Studio piece.',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800',
    content: `
      <p>Every piece in our collection tells a story of craftsmanship, tradition, and innovation. Here's a glimpse into the meticulous process behind our signature pieces.</p>

      <h2>The Design Process</h2>
      <p>Our design journey begins with inspiration from African art, nature, and culture. We sketch initial concepts, considering both aesthetic appeal and functionality. Each design goes through multiple iterations before finalization.</p>

      <h2>Fabric Selection</h2>
      <p>Choosing the right fabric is crucial. We source high-quality materials that drape beautifully and maintain their shape. Our African prints are carefully selected for their vibrancy and cultural significance.</p>

      <h2>The Art of Pattern Making</h2>
      <p>Pattern making is where art meets science. Our skilled pattern makers create templates that ensure perfect fit and comfort. This step requires precision and years of experience.</p>

      <h2>Cutting and Sewing</h2>
      <p>Expert tailors bring our designs to life. Every stitch is placed with care, ensuring durability and elegance. We use traditional techniques alongside modern sewing technology.</p>

      <h2>Quality Control</h2>
      <p>Before any piece leaves our workshop, it undergoes rigorous quality checks. We inspect for stitching, fit, and overall finish. Only pieces that meet our high standards make it to our customers.</p>

      <h2>The Human Touch</h2>
      <p>Behind every piece is a team of dedicated artisans. Their skill, creativity, and attention to detail make Siaya Style Studio what it is. We're proud to support these talented individuals and their craft.</p>

      <p>The result is fashion that not only looks beautiful but also carries the warmth of human creativity and cultural heritage.</p>
    `,
  },
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="container py-16 lg:py-24 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] overflow-hidden rounded-xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="border-t border-border mt-12 pt-8">
            <h3 className="font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                Share on Twitter
              </Button>
              <Button variant="outline" size="sm">
                Share on Facebook
              </Button>
              <Button variant="outline" size="sm">
                Copy Link
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-semibold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <div key={relatedPost.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <Link to={`/blog/${relatedPost.id}`}>
                      <h4 className="font-semibold mb-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}