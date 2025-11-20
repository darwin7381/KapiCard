
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import CreditCard from '../components/CreditCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Filter, Search, X } from 'lucide-react';
import { cards } from '../data/cards';
import SEO from '../components/SEO';

const BrowseCards = () => {
    const [searchParams] = useSearchParams();

    // Initialize state directly from URL params
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedTypes, setSelectedTypes] = useState(searchParams.get('type') ? [searchParams.get('type')] : []);
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Update state when URL params change
    useEffect(() => {
        const typeParam = searchParams.get('type');
        if (typeParam) {
            setSelectedTypes([typeParam]);
        } else {
            setSelectedTypes([]);
        }

        const searchParam = searchParams.get('search');
        setSearchTerm(searchParam || '');
    }, [searchParams]);

    const cardTypes = ['Travel', 'Cash Back', 'No Fee', 'Premium', 'Dining', 'Groceries'];
    const banks = ['Chase', 'Amex', 'Citi', 'Capital One'];

    const toggleFilter = (list, setList, item) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const filteredCards = useMemo(() => {
        return cards.filter(card => {
            const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => card.tags.includes(type));
            const matchesBank = selectedBanks.length === 0 || selectedBanks.includes(card.bank);

            return matchesSearch && matchesType && matchesBank;
        });
    }, [searchTerm, selectedTypes, selectedBanks]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SEO
                title="Browse Cards"
                description="Explore our extensive collection of credit cards. Filter by bank, rewards, and fees to find your perfect match."
            />

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-main mb-2">
                    {selectedTypes.length > 0 ? `${selectedTypes.join(', ')} Credit Cards` : 'All Credit Cards'}
                </h1>
                <p className="text-text-muted">
                    {filteredCards.length} {filteredCards.length === 1 ? 'result' : 'results'} found
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 relative">
                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-4">
                    <Button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} variant="outline" className="w-full flex justify-between items-center">
                        <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</span>
                        {selectedTypes.length + selectedBanks.length > 0 && (
                            <Badge variant="primary" className="ml-2">{selectedTypes.length + selectedBanks.length}</Badge>
                        )}
                    </Button>
                </div>

                {/* Sidebar Filters */}
                <aside className={`
                    fixed inset-0 z-40 bg-background/95 backdrop-blur-xl p-6 transition-transform duration-300 
                    md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none md:p-0 md:w-64 md:flex-shrink-0 md:translate-x-0
                    ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex justify-between items-center md:hidden mb-6">
                        <h2 className="font-bold text-xl">Filters</h2>
                        <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-6 h-6" /></button>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24 space-y-8 shadow-sm">
                        <div className="hidden md:flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-primary" />
                                <h2 className="font-bold text-lg text-text-main">Filters</h2>
                            </div>
                            {(selectedTypes.length > 0 || selectedBanks.length > 0) && (
                                <button
                                    onClick={() => { setSelectedTypes([]); setSelectedBanks([]); }}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-text-muted mb-3 uppercase tracking-wider">Card Type</h3>
                            <div className="space-y-2">
                                {cardTypes.map(type => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-primary border-primary' : 'border-border bg-surface group-hover:border-primary'}`}>
                                            {selectedTypes.includes(type) && <X className="w-3 h-3 text-white rotate-45" style={{ transform: 'rotate(0deg)' }} />}
                                            {selectedTypes.includes(type) && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedTypes.includes(type)}
                                            onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                                        />
                                        <span className={`text-sm transition-colors ${selectedTypes.includes(type) ? 'text-text-main font-medium' : 'text-text-muted group-hover:text-text-main'}`}>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div>
                            <h3 className="text-sm font-semibold text-text-muted mb-3 uppercase tracking-wider">Bank</h3>
                            <div className="space-y-2">
                                {banks.map(bank => (
                                    <label key={bank} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBanks.includes(bank) ? 'bg-primary border-primary' : 'border-border bg-surface group-hover:border-primary'}`}>
                                            {selectedBanks.includes(bank) && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedBanks.includes(bank)}
                                            onChange={() => toggleFilter(selectedBanks, setSelectedBanks, bank)}
                                        />
                                        <span className={`text-sm transition-colors ${selectedBanks.includes(bank) ? 'text-text-main font-medium' : 'text-text-muted group-hover:text-text-main'}`}>{bank}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Search Bar */}
                    <div className="relative mb-6 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search cards by name, bank, or benefits..."
                            className="w-full bg-surface border border-border rounded-xl py-4 pl-12 pr-4 text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredCards.length > 0 ? (
                                filteredCards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CreditCard card={card} />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-surface border border-border rounded-2xl border-dashed"
                                >
                                    <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-text-muted" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-main mb-2">No cards found</h3>
                                    <p className="text-text-muted mb-6 max-w-sm mx-auto">
                                        We couldn't find any cards matching your current filters. Try adjusting your search or filters.
                                    </p>
                                    <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedTypes([]); setSelectedBanks([]); }}>
                                        Clear all filters
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseCards;
