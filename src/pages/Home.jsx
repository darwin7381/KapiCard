import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Award, Shield, Sparkles, ArrowRight, Zap, BookOpen, Star, DollarSign, Crown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCard from '../components/CreditCard';
import CompactCard from '../components/CompactCard';
import BlogCard from '../components/BlogCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';
import CardVisual from '../components/CardVisual';
import SEO from '../components/SEO';
import { cards } from '../data/cards';
import { blogPosts } from '../data/blog';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                navigate(`/cards?search=${encodeURIComponent(searchQuery)}`);
            }
        }
    };

    const popularCategories = [
        { name: 'Travel Rewards', type: 'Travel', icon: '✈️' },
        { name: 'Cash Back', type: 'Cash Back', icon: '💰' },
        { name: 'No Annual Fee', type: 'No Fee', icon: '🎁' },
        { name: 'Premium Cards', type: 'Premium', icon: '💎' },
        { name: 'Dining', type: 'Dining', icon: '🍽️' },
        { name: 'Groceries', type: 'Groceries', icon: '🛒' },
    ];

    const topPicks = cards.slice(0, 3);
    const travelCards = cards.filter(card => card.tags.includes('Travel')).slice(0, 3);
    const cashbackCards = cards.filter(card => card.tags.includes('Cash Back')).slice(0, 3);
    const noFeeCards = cards.filter(card => card.tags.includes('No Fee')).slice(0, 3);

    const comparisonCards = [
        cards.find(c => c.id === 1), // Sapphire Reserve
        cards.find(c => c.id === 3), // Platinum
        cards.find(c => c.id === 7), // Venture X
    ].filter(Boolean);

    return (
        <div className="min-h-screen">
            <SEO
                title="Find Your Perfect Credit Card"
                description="Compare the best credit cards for travel, cash back, and more. Maximize your rewards with KapiCard."
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-surface to-background">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 -left-24 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Find Your Perfect Credit Card
                        </h1>
                        <p className="text-xl md:text-2xl text-text-muted mb-12">
                            Compare rewards, benefits, and bonuses to discover the card that fits your lifestyle
                        </p>

                        {/* Large Search Box */}
                        <div className="relative max-w-3xl mx-auto mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors duration-200 z-10" />
                                <input
                                    type="text"
                                    placeholder="Search by card name, bank, or benefits..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="w-full pl-14 pr-32 py-4 rounded-2xl bg-white/90 backdrop-blur-sm
                                               border-2 border-border focus:border-primary
                                               focus:outline-none focus:ring-4 focus:ring-primary/20
                                               text-base shadow-xl hover:shadow-2xl focus:shadow-2xl
                                               transition-all duration-300 text-text-main placeholder:text-text-muted"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2
                                               bg-gradient-to-r from-primary to-secondary
                                               text-white px-6 py-2.5 rounded-xl font-medium
                                               hover:shadow-lg hover:scale-105 active:scale-95
                                               transition-all duration-200"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Quick Category Tags */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {popularCategories.map((cat, index) => (
                                <Link
                                    key={index}
                                    to={`/cards?type=${encodeURIComponent(cat.type)}`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-sm hover:shadow-md hover:bg-white/60 transition-all cursor-pointer text-text-main"
                                    >
                                        <span className="text-lg">{cat.icon}</span>
                                        <span className="text-sm font-medium">{cat.name}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Top Picks Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-6 h-6 text-primary" />
                                <h2 className="text-4xl font-bold text-text-main">Top Picks for You</h2>
                            </div>
                            <p className="text-text-muted text-lg">Curated selection based on popular choices</p>
                        </div>
                        <Link to="/cards">
                            <Button variant="outline">
                                View All Cards <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {topPicks.map((card) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <CreditCard card={card} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Award className="w-6 h-6 text-primary" />
                            <h2 className="text-4xl font-bold text-text-main">Premium Cards Comparison</h2>
                        </div>
                        <p className="text-text-muted text-lg">Compare top premium travel cards side-by-side</p>
                    </div>

                    <GlassCard className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-4 text-text-main font-bold">Feature</th>
                                    {comparisonCards.map(card => (
                                        <th key={card.id} className="text-center py-4 px-4 min-w-[200px]">
                                            <div className="font-bold text-text-main">{card.name}</div>
                                            <div className="text-sm text-text-muted font-normal">{card.bank}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 px-4 text-text-muted font-medium">Annual Fee</td>
                                    {comparisonCards.map(card => (
                                        <td key={card.id} className="py-4 px-4 text-center text-text-main font-semibold">{card.annualFee}</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 px-4 text-text-muted font-medium">Reward Rate</td>
                                    {comparisonCards.map(card => (
                                        <td key={card.id} className="py-4 px-4 text-center text-accent font-semibold">{card.rewardRate}</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 px-4 text-text-muted font-medium">Sign-up Bonus</td>
                                    {comparisonCards.map(card => (
                                        <td key={card.id} className="py-4 px-4 text-center text-sm text-text-main">{card.signUpBonus}</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 px-4 text-text-muted font-medium">Rating</td>
                                    {comparisonCards.map(card => (
                                        <td key={card.id} className="py-4 px-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-yellow-500">★</span>
                                                <span className="font-semibold text-text-main">{card.rating}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="py-4 px-4"></td>
                                    {comparisonCards.map(card => (
                                        <td key={card.id} className="py-4 px-4 text-center">
                                            <Link to={`/cards/${card.id}`}>
                                                <Button variant="primary" className="w-full">View Details</Button>
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </GlassCard>

                    <div className="text-center mt-8">
                        <Link to="/compare">
                            <Button variant="outline" className="px-8">
                                Full Comparison Tool <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Best for Travel */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="text-3xl">✈️</div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-main">Best for Travel</h2>
                            <p className="text-text-muted">Maximize your travel rewards and perks</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {travelCards.map(card => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <CompactCard card={card} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Best Cashback Cards - Bento Grid Dark Theme */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="mb-12">
                        <Badge variant="accent" className="mb-4 bg-accent/20 text-accent border-accent/20">Top Picks</Badge>
                        <h2 className="text-4xl font-bold mb-4 text-white">Maximize Your Cashback</h2>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Stop leaving money on the table. These cards offer the highest returns on your daily spending.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Main Feature - Spans 3 cols */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 transition-colors group">
                                {/* Big Card Visual & Details */}
                                <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                                    <div className="w-full md:w-1/2">
                                        {/* 3D Card Tilt Effect Placeholder */}
                                        <div className="transform group-hover:scale-105 transition-transform duration-500">
                                            <CardVisual card={cashbackCards[0]} />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                <span className="text-yellow-400 font-bold tracking-wide text-sm">EDITOR'S CHOICE</span>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white">{cashbackCards[0].name}</h3>
                                            <p className="text-slate-400">{cashbackCards[0].bank}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Cashback</p>
                                                <p className="text-2xl font-bold text-accent">{cashbackCards[0].rewardRate}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Annual Fee</p>
                                                <p className="text-2xl font-bold text-white">{cashbackCards[0].annualFee}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <Link to={`/cards/${cashbackCards[0].id}`} className="flex-1">
                                                <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 border-none">Apply Now</Button>
                                            </Link>
                                            <Link to="/compare" className="flex-1">
                                                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white">Compare</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side List - Spans 2 cols */}
                        <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                Top Contenders
                            </h3>
                            {cashbackCards.slice(1, 4).map((card, idx) => (
                                <Link key={card.id} to={`/cards/${card.id}`}>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer group hover:translate-x-1">
                                        {/* Small Visual */}
                                        <div className={`w-16 h-10 rounded-md shadow-sm flex-shrink-0 bg-gradient-to-br ${card.network === 'Visa' ? 'from-blue-500 to-indigo-700' :
                                            card.network === 'Mastercard' ? 'from-orange-400 to-pink-600' :
                                                'from-blue-400 to-teal-600'
                                            }`} />

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold truncate text-white group-hover:text-primary transition-colors">{card.name}</h4>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-accent font-medium">{card.rewardRate}</span>
                                                <span className="text-slate-500">•</span>
                                                <span className="text-slate-400">{card.annualFee}</span>
                                            </div>
                                        </div>

                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <Link to="/cards?type=cashback" className="mt-2 text-center text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                                View all cashback cards <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* No Annual Fee Cards */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="text-3xl">🎁</div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-main">No Annual Fee Cards</h2>
                            <p className="text-text-muted">Great rewards without the annual cost</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {noFeeCards.map(card => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <CompactCard card={card} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-6 h-6 text-primary" />
                                <h2 className="text-4xl font-bold text-text-main">Latest Insights</h2>
                            </div>
                            <p className="text-text-muted text-lg">Expert tips and guides to help you make smarter financial decisions</p>
                        </div>
                        <Link to="/blog">
                            <Button variant="outline">
                                View All Posts <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.slice(0, 3).map((post, index) => (
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
            </section>

            {/* Why Choose KapiCard - Benefits Section */}
            <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-text-main mb-4">Why Choose KapiCard?</h2>
                        <p className="text-text-muted text-lg">Your trusted companion for finding the perfect credit card</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <GlassCard className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Smart Comparisons</h3>
                            <p className="text-text-muted">
                                Compare cards side-by-side with detailed breakdowns of rewards, fees, and benefits
                            </p>
                        </GlassCard>

                        <GlassCard className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Honest Reviews</h3>
                            <p className="text-text-muted">
                                Unbiased reviews and ratings from real users to help you make informed decisions
                            </p>
                        </GlassCard>

                        <GlassCard className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">Financial Tips</h3>
                            <p className="text-text-muted">
                                Expert advice and insights to maximize your rewards and manage credit wisely
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* CTA Section - Redesigned */}
            <section className="py-24 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Visual Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Floating Card Visuals */}
                            <div className="relative h-96">
                                {/* Card 1 */}
                                <motion.div
                                    animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 left-0 w-64 aspect-[1.586/1] rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-2xl border border-white/20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />
                                    <div className="absolute top-6 left-6 w-10 h-8 rounded bg-yellow-200/90 border border-yellow-400/50" />
                                    <div className="absolute bottom-6 left-6 text-white font-mono text-xs tracking-wider">**** **** **** 1234</div>
                                    <div className="absolute top-4 right-4 text-white font-bold text-xs italic">VISA</div>
                                </motion.div>

                                {/* Card 2 */}
                                <motion.div
                                    animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute top-12 right-0 w-64 aspect-[1.586/1] rounded-xl bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 shadow-2xl border border-white/20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />
                                    <div className="absolute top-6 left-6 w-10 h-8 rounded bg-yellow-200/90 border border-yellow-400/50" />
                                    <div className="absolute bottom-6 left-6 text-white font-mono text-xs tracking-wider">**** **** **** 5678</div>
                                    <div className="absolute top-4 right-4 text-white font-bold text-xs italic">MASTERCARD</div>
                                </motion.div>

                                {/* Card 3 */}
                                <motion.div
                                    animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 aspect-[1.586/1] rounded-xl bg-gradient-to-br from-teal-500 via-blue-600 to-indigo-700 shadow-2xl border border-white/20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />
                                    <div className="absolute top-6 left-6 w-10 h-8 rounded bg-yellow-200/90 border border-yellow-400/50" />
                                    <div className="absolute bottom-6 left-6 text-white font-mono text-xs tracking-wider">**** **** **** 9012</div>
                                    <div className="absolute top-4 right-4 text-white font-bold text-xs italic">AMEX</div>
                                </motion.div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                                >
                                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                                    <div className="text-white/80 text-sm">Cards Reviewed</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                                >
                                    <div className="text-3xl font-bold text-white mb-1">10K+</div>
                                    <div className="text-white/80 text-sm">Happy Users</div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right: Content Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-white"
                        >
                            <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                                <span className="text-sm font-medium">🎉 Your Credit Card Journey Starts Here</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Ready to Find Your Perfect Card?
                            </h2>

                            <p className="text-xl mb-8 text-white/90 leading-relaxed">
                                Join thousands of smart consumers who've discovered their ideal credit card. Compare rewards, fees, and benefits to make the best choice for your financial future.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/cards" className="flex-1 sm:flex-initial">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-8 py-4 bg-white text-primary font-bold rounded-full shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        Browse All Cards
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>

                                <Link to="/compare" className="flex-1 sm:flex-initial">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        Start Comparing
                                        <Sparkles className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-8 flex items-center gap-6 text-white/70 text-sm">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    <span>100% Secure</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-white/70" />
                                    <span>Trusted Reviews</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    <span>Free Service</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
