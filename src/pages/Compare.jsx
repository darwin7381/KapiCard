import { motion } from 'framer-motion';
import { X, Check, Info, Trash2, Star } from 'lucide-react';
import { cards } from '../data/cards';
import { useCompare } from '../context/CompareContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const Compare = () => {
    const { compareCards, removeFromCompare, clearCompare } = useCompare();

    return (
        <div className="container mx-auto px-4 py-12">
            <SEO
                title="Compare Credit Cards"
                description="Compare credit cards side-by-side to find the best rewards, fees, and benefits for your needs."
            />

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
                    Compare Credit Cards
                </h1>
                <p className="text-xl text-text-muted">
                    {compareCards.length === 0
                        ? 'Start adding cards to compare features, rewards, and benefits side-by-side'
                        : `Comparing ${compareCards.length} card${compareCards.length > 1 ? 's' : ''}`
                    }
                </p>
                {compareCards.length > 0 && (
                    <Button
                        variant="ghost"
                        onClick={clearCompare}
                        className="mt-4 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                )}
            </div>

            {/* Detailed Comparison Table */}
            {compareCards.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <GlassCard className="overflow-x-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-text-main">Detailed Comparison</h2>
                        </div>

                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-4 text-text-main font-bold sticky left-0 bg-surface z-10 w-48">Feature</th>
                                    {compareCards.map(card => {
                                        const getCardGradient = () => {
                                            switch (card.network) {
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

                                        return (
                                            <th key={card.id} className="text-center py-4 px-4 min-w-[220px] relative group">
                                                <button
                                                    onClick={() => removeFromCompare(card.id)}
                                                    className="absolute top-0 right-0 w-8 h-8 rounded-full text-text-muted hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 z-10"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                {/* Miniature Card Visual */}
                                                <div className={`w-full max-w-[180px] mx-auto aspect-[1.586/1] rounded-lg bg-gradient-to-br ${getCardGradient()} shadow-md relative overflow-hidden border border-white/20 mb-3`}>
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                                                    <div className="absolute top-2 left-2 w-6 h-4 rounded bg-yellow-200/90 border border-yellow-400/50" />
                                                    <div className="absolute bottom-2 left-2 text-white font-mono text-[8px] tracking-wider drop-shadow-lg">
                                                        **** {card.id}234
                                                    </div>
                                                    <div className="absolute top-2 right-2 text-white font-bold text-[8px] drop-shadow-lg italic">
                                                        {card.network === 'American Express' ? 'AMEX' : card.network.toUpperCase()}
                                                    </div>
                                                </div>

                                                <div className="font-bold text-text-main text-lg">{card.name}</div>
                                                <div className="text-sm text-text-muted font-normal">{card.bank}</div>
                                            </th>
                                        );
                                    })}
                                    {compareCards.length < 4 && (
                                        <th className="p-4 min-w-[220px]">
                                            <button
                                                onClick={() => window.location.href = '/cards'}
                                                className="w-full h-full min-h-[100px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-text-muted hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                </div>
                                                <span className="font-medium text-sm">Add Card</span>
                                            </button>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: 'Network', key: 'network' },
                                    { label: 'Annual Fee', key: 'annualFee', highlight: true },
                                    { label: 'Reward Rate', key: 'rewardRate', color: 'text-accent' },
                                    { label: 'Sign-up Bonus', key: 'signUpBonus' },
                                    { label: 'Interest Rate', key: 'interestRate' },
                                    { label: 'Rating', key: 'rating', isRating: true }
                                ].map((row, idx) => (
                                    <tr key={row.key} className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-text-muted sticky left-0 bg-surface z-10">{row.label}</td>
                                        {compareCards.map(card => (
                                            <td key={card.id} className={`py-4 px-4 text-center ${row.highlight ? 'font-bold text-text-main' : ''} ${row.color || 'text-text-main'}`}>
                                                {row.isRating ? (
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                                                        <span className="font-bold">{card[row.key]}</span>
                                                    </div>
                                                ) : (
                                                    card[row.key]
                                                )}
                                            </td>
                                        ))}
                                        {compareCards.length < 4 && <td className="py-4 px-4"></td>}
                                    </tr>
                                ))}
                                <tr className="border-b border-border/50">
                                    <td className="py-4 px-4 font-medium text-text-muted sticky left-0 bg-surface z-10">Key Features</td>
                                    {compareCards.map(card => (
                                        <td key={card.id} className="py-4 px-4 align-top">
                                            <ul className="space-y-2 text-left">
                                                {card.features.slice(0, 4).map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-text-main">
                                                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                        <span className="leading-tight">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    ))}
                                    {compareCards.length < 4 && <td className="py-4 px-4"></td>}
                                </tr>
                                <tr>
                                    <td className="py-6 px-4 sticky left-0 bg-surface z-10"></td>
                                    {compareCards.map(card => (
                                        <td key={card.id} className="py-6 px-4 text-center">
                                            <Button variant="primary" className="w-full">Apply Now</Button>
                                        </td>
                                    ))}
                                    {compareCards.length < 4 && <td className="py-6 px-4"></td>}
                                </tr>
                            </tbody>
                        </table>
                    </GlassCard>
                </motion.div>
            )}

            {/* Empty State */}
            {compareCards.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-md mx-auto"
                >
                    <button
                        onClick={() => window.location.href = '/cards'}
                        className="w-full min-h-[300px] border-2 border-dashed border-border rounded-3xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-text-muted hover:text-primary group p-8"
                    >
                        <div className="w-20 h-20 rounded-full bg-surface border-2 border-border group-hover:border-primary/30 flex items-center justify-center transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">Add Card to Compare</h3>
                            <p className="text-text-muted">Browse our collection to find cards</p>
                        </div>
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Compare;
