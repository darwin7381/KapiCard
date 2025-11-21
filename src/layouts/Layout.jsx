import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import SearchBar from '../components/SearchBar';
import CompareFloatingCart from '../components/CompareFloatingCart';
import AuthModal from '../components/AuthModal';
import { CreditCard, BookOpen, BarChart2, Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [authModal, setAuthModal] = useState({ isOpen: false, tab: 'login' });
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isCardDetail = location.pathname.match(/^\/cards\/\d+$/);
    const isImmersive = isHome || isCardDetail;

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-text-main font-sans relative">
            {/* Floating Island Header */}
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
                <header className="w-full max-w-6xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg shadow-black/5 rounded-2xl transition-all duration-300 pointer-events-auto">
                    <div className="px-6 h-14 flex items-center justify-between gap-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary flex-shrink-0 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                <CreditCard className="w-4 h-4 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">KapiCard</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
                            {[
                                { to: '/cards', label: 'Browse Cards' },
                                { to: '/compare', label: 'Compare' },
                                { to: '/blog', label: 'Blog' }
                            ].map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`text-sm font-medium transition-all relative whitespace-nowrap ${location.pathname === link.to
                                        ? 'text-primary'
                                        : 'text-text-muted hover:text-text-main'
                                        }`}
                                >
                                    {link.label}
                                    {location.pathname === link.to && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                            <div className="w-48 hidden lg:block">
                                <SearchBar />
                            </div>
                            <div className="h-5 w-px bg-border/50 mx-1" />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setAuthModal({ isOpen: true, tab: 'login' })}
                                className="hover:bg-primary/5 text-sm h-8 px-3"
                            >
                                Login
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setAuthModal({ isOpen: true, tab: 'register' })}
                                className="shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm h-8 px-4"
                            >
                                Register
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-text-main hover:bg-surface-hover rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/95 backdrop-blur-xl border border-white/40 rounded-xl shadow-xl flex flex-col gap-1 md:hidden overflow-hidden"
                        >
                            <nav className="flex flex-col">
                                <Link to="/cards" className="p-3 rounded-lg hover:bg-surface-hover font-medium text-sm">Browse Cards</Link>
                                <Link to="/compare" className="p-3 rounded-lg hover:bg-surface-hover font-medium text-sm">Compare</Link>
                                <Link to="/blog" className="p-3 rounded-lg hover:bg-surface-hover font-medium text-sm">Blog</Link>
                            </nav>
                            <div className="h-px bg-border/50 my-1" />
                            <div className="flex gap-2 p-2">
                                <Button variant="ghost" size="sm" className="flex-1" onClick={() => setAuthModal({ isOpen: true, tab: 'login' })}>Login</Button>
                                <Button variant="primary" size="sm" className="flex-1" onClick={() => setAuthModal({ isOpen: true, tab: 'register' })}>Register</Button>
                            </div>
                        </motion.div>
                    )}
                </header>
            </div>

            {/* Main Content - Dynamic Padding */}
            <main className={`flex-grow ${isImmersive ? 'pt-0' : 'pt-28'}`}>
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

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-text-muted">
                                <li><Link to="/cards" className="hover:text-primary transition-colors">Browse Cards</Link></li>
                                <li><Link to="/compare" className="hover:text-primary transition-colors">Compare</Link></li>
                                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                                <li><Link to="/design-system" className="hover:text-primary transition-colors">Design System</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-bold mb-4">Legal</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-bold mb-4">Stay Updated</h3>
                            <p className="text-text-muted text-sm mb-4">Subscribe to our newsletter for the latest credit card offers and financial tips.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                />
                                <Button size="sm" variant="primary">Subscribe</Button>
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
