import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../components/ui/Button';
import SearchBar from '../components/SearchBar';
import CompareFloatingCart from '../components/CompareFloatingCart';
import AuthModal from '../components/AuthModal';
import { CreditCard, BookOpen, BarChart2, Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [authModal, setAuthModal] = useState({ isOpen: false, tab: 'login' });

    return (
        <div className="min-h-screen flex flex-col bg-background text-text-main font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-glow">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        KapiCard
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 flex-1">
                        <Link to="/cards" className="font-medium hover:text-primary transition-colors">Browse Cards</Link>
                        <Link to="/compare" className="font-medium hover:text-primary transition-colors">Compare</Link>
                        <Link to="/blog" className="font-medium hover:text-primary transition-colors">Blog</Link>
                        <div className="flex-1 max-w-md ml-auto">
                            <SearchBar />
                        </div>
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="hidden md:flex"
                            onClick={() => setAuthModal({ isOpen: true, tab: 'login' })}
                        >
                            Login
                        </Button>
                        <Button
                            className="hidden md:flex"
                            variant="primary"
                            onClick={() => setAuthModal({ isOpen: true, tab: 'register' })}
                        >
                            Register
                        </Button>
                        <button
                            className="md:hidden p-2 text-text-main"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden absolute top-20 left-0 right-0 bg-surface border-b border-border p-4 shadow-lg flex flex-col gap-4"
                    >
                        <SearchBar />
                        <Link to="/cards" className="p-2 hover:bg-primary/5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Browse Cards</Link>
                        <Link to="/compare" className="p-2 hover:bg-primary/5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Compare</Link>
                        <Link to="/blog" className="p-2 hover:bg-primary/5 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    setAuthModal({ isOpen: true, tab: 'login' });
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => {
                                    setAuthModal({ isOpen: true, tab: 'register' });
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Register
                            </Button>
                        </div>
                    </motion.div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            {/* Floating Compare Cart */}
            <CompareFloatingCart />

            {/* Auth Modal */}
            <AuthModal
                isOpen={authModal.isOpen}
                initialTab={authModal.tab}
                onClose={() => setAuthModal({ isOpen: false, tab: 'login' })}
            />

            {/* Footer */}
            <footer className="bg-surface border-t border-border mt-20 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        {/* Brand Column */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                KapiCard
                            </div>
                            <p className="text-text-muted">
                                Your trusted companion for finding the perfect credit card. Smart comparisons, honest reviews, and financial tips.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Discover</h4>
                            <ul className="space-y-3 text-text-muted">
                                <li><Link to="/cards" className="hover:text-primary transition-colors">Browse Cards</Link></li>
                                <li><Link to="/compare" className="hover:text-primary transition-colors">Compare Features</Link></li>
                                <li><Link to="/blog" className="hover:text-primary transition-colors">Financial Blog</Link></li>
                                <li><Link to="#" className="hover:text-primary transition-colors">Top Rewards</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Company</h4>
                            <ul className="space-y-3 text-text-muted">
                                <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
                                <li><Link to="#" className="hover:text-primary transition-colors">Careers</Link></li>
                                <li><Link to="#" className="hover:text-primary transition-colors">Contact</Link></li>
                                <li><Link to="/design-system" className="hover:text-primary transition-colors">Design System</Link></li>
                                <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Stay Updated</h4>
                            <p className="text-text-muted mb-4">Subscribe to our newsletter for the latest credit card offers and tips.</p>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                <Button size="sm">Join</Button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 text-center text-text-muted text-sm">
                        © {new Date().getFullYear()} KapiCard. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
