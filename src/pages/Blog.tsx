import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: '1',
    title: 'The Art of Mixing African Prints with Contemporary Fashion',
    excerpt: 'Discover how to seamlessly blend traditional African patterns with modern silhouettes for a unique style statement.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
  },
  {
    id: '2',
    title: 'Sustainable Fashion: Our Commitment to Ethical Production',
    excerpt: 'Learn about our journey towards sustainable fashion practices and how we support local artisans.',
    date: '2024-01-10',
    readTime: '4 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
  {
    id: '3',
    title: 'Seasonal Trends: What to Expect in 2024',
    excerpt: 'A preview of the fashion trends we\'re excited about for the upcoming season.',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
  },
  {
    id: '4',
    title: 'Behind the Scenes: Crafting Our Signature Pieces',
    excerpt: 'Take a look at the craftsmanship and attention to detail that goes into each Siaya Style Studio piece.',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600',
  },
];

export default function Blog() {
  return (
    <Layout>
      <div className="container py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Fashion Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, trends, and stories from the world of fashion. Discover inspiration for your style journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            More articles coming soon. Stay tuned for fashion insights and style inspiration!
          </p>
        </div>
      </div>
    </Layout>
  );
}