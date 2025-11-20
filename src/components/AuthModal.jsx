import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import Button from './ui/Button';

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Connect to backend API
        alert(`${activeTab === 'login' ? 'Login' : 'Registration'} functionality coming soon!`);
        onClose();
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-surface-hover flex items-center justify-center transition-colors text-text-muted hover:text-text-main"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-text-main mb-2">
                                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-sm text-text-muted">
                                {activeTab === 'login'
                                    ? 'Sign in to access your saved cards and comparisons'
                                    : 'Join KapiCard to unlock personalized recommendations'}
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-border">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-3 px-4 font-medium transition-colors relative ${activeTab === 'login'
                                        ? 'text-primary'
                                        : 'text-text-muted hover:text-text-main'
                                    }`}
                            >
                                Login
                                {activeTab === 'login' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('register')}
                                className={`flex-1 py-3 px-4 font-medium transition-colors relative ${activeTab === 'register'
                                        ? 'text-primary'
                                        : 'text-text-muted hover:text-text-main'
                                    }`}
                            >
                                Register
                                {activeTab === 'register' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {activeTab === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main placeholder:text-text-muted"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main placeholder:text-text-muted"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main placeholder:text-text-muted"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                {activeTab === 'register' && (
                                    <p className="text-xs text-text-muted mt-1">
                                        Must be at least 6 characters
                                    </p>
                                )}
                            </div>

                            {activeTab === 'login' && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full h-12 text-base font-medium"
                            >
                                {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                            </Button>

                            {activeTab === 'register' && (
                                <p className="text-xs text-text-muted text-center">
                                    By creating an account, you agree to our{' '}
                                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                                </p>
                            )}
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
