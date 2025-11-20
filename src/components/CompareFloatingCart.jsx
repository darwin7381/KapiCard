import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { useState } from 'react';

const CompareFloatingCart = () => {
    const { compareCards, compareCount, removeFromCompare } = useCompare();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    if (compareCount === 0) {
        return null;
    }

    const handleNavigateToCompare = () => {
        navigate('/compare');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExpanded(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                        />

                        {/* Cart Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="mb-4 bg-surface border-2 border-primary rounded-2xl shadow-2xl p-4 min-w-[280px] relative z-10"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-text-main">Compare List</h3>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="text-text-muted hover:text-text-main"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                {compareCards.map(card => (
                                    <div
                                        key={card.id}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                                    >
                                        <div className={`w-10 h-6 rounded bg-gradient-to-r flex-shrink-0 ${card.network === 'Visa' ? 'from-blue-500 to-indigo-600' :
                                            card.network === 'Mastercard' ? 'from-orange-400 to-red-500' :
                                                'from-blue-400 to-cyan-500'
                                            }`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-text-main truncate">
                                                {card.name}
                                            </p>
                                            <p className="text-xs text-text-muted">{card.bank}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCompare(card.id)}
                                            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleNavigateToCompare}
                                className="w-full mt-3 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Compare Now
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-glow transition-all"
            >
                <GitCompare className="w-7 h-7" />

                {/* Count Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-lg"
                >
                    {compareCount}
                </motion.div>
            </motion.button>
        </div>
    );
};

export default CompareFloatingCart;
