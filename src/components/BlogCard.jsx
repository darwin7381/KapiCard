import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import { Clock, Calendar } from 'lucide-react';

const BlogCard = ({ post }) => {
    return (
        <Link to={`/blog/${post.id}`} className="group">
            <motion.article
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden border border-border shadow-soft hover:shadow-lg transition-all h-full flex flex-col"
            >
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge variant="accent" className="bg-white/90 backdrop-blur-sm shadow-sm border-none">
                            {post.category}
                        </Badge>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-3 mb-4 flex-grow">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        Read Article
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};

export default BlogCard;
