import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blog';
import SEO from '../components/SEO';

const BlogList = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <SEO
                title="Financial Blog"
                description="Read our latest articles on credit cards, personal finance, and travel tips."
            />

            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-main">
                    Financial <span className="text-primary">Insights</span>
                </h1>
                <p className="text-lg text-text-muted">
                    Expert advice to help you make smarter financial decisions and get the most out of your credit cards.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <BlogCard post={post} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
