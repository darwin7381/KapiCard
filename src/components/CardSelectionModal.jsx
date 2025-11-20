import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { cards } from '../data/cards';
import { useCompare } from '../context/CompareContext';
import CompactCard from './CompactCard';

const CardSelectionModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCompare, removeFromCompare, compareCards } = useCompare();

    // Filter out cards already in comparison
    const availableCards = cards.filter(
        card => !compareCards.find(c => c.id === card.id)
    );

    // Filter by search query
    const filteredCards = availableCards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleAddCard = (card) => {
        addToCompare(card);
        // Don't close modal - allow multiple selections
    };

    const getCardGradient = (network) => {
        switch (network) {
            case 'Visa':
                return 'from-blue-500 via-blue-600 to-indigo-700';
            case 'Mastercard':
                return 'from-orange-400 via-red-500 to-pink-600';
            case 'American Express':
                return 'from-teal-500 via-blue-600 to-indigo-700';
            default:
                return 'from-purple-500 via-primary to-secondary';
        }
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
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:max-h-[85vh] bg-surface rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-text-main">Select Card to Compare</h2>
                                    <p className="text-sm text-text-muted mt-1">
                                        {availableCards.length} cards available • {compareCards.length}/4 in comparison
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full hover:bg-surface-hover flex items-center justify-center transition-colors text-text-muted hover:text-text-main"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Selected Cards Preview */}
                            {compareCards.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Selected Cards</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {compareCards.map(card => (
                                            <div key={card.id} className="relative flex-shrink-0 group">
                                                {/* Mini card image */}
                                                <div className={`w-20 h-12 rounded-lg bg-gradient-to-br ${getCardGradient(card.network)} shadow-md relative overflow-hidden border border-white/20`}>
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                                                    <div className="absolute top-1 left-1 w-3 h-2 rounded bg-yellow-200/90" />
                                                    <div className="absolute bottom-1 left-1 text-white font-mono text-[6px] drop-shadow">
                                                        **** {card.id}234
                                                    </div>
                                                    <div className="absolute top-1 right-1 text-white font-bold text-[6px] italic">
                                                        {card.network === 'American Express' ? 'AMEX' : card.network.toUpperCase()}
                                                    </div>
                                                </div>
                                                {/* Remove button */}
                                                <button
                                                    onClick={() => removeFromCompare(card.id)}
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                >
                                                    <X className="w-3 h-3 text-white" />
                                                </button>
                                                <p className="text-xs text-text-main font-medium mt-1 text-center truncate w-20">{card.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search by card name, bank, or category..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main placeholder:text-text-muted"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Card Grid */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {filteredCards.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCards.map(card => (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <CompactCard
                                                card={card}
                                                selectable={true}
                                                selected={compareCards.find(c => c.id === card.id)}
                                                onSelect={handleAddCard}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-text-muted" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-2">No cards found</h3>
                                    <p className="text-text-muted">Try adjusting your search query</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CardSelectionModal;
