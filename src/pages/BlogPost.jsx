import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { blogPosts } from '../data/blog';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="text-center py-20">
                <SEO title="Article Not Found" />
                <h2 className="text-2xl font-bold mb-4">Article not found</h2>
                <Link to="/blog">
                    <Button variant="outline">Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={[post.category, 'credit cards', 'finance']}
            />

            <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="mb-8">
                <Badge variant="accent" className="mb-4">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-main leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-6 text-text-muted text-sm border-b border-border pb-8">
                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
                </div>
            </div>

            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12 shadow-soft">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div
                className="prose prose-lg max-w-none prose-headings:text-text-main prose-p:text-text-muted prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
};

export default BlogPost;
