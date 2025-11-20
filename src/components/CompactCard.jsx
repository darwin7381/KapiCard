import GlassCard from './ui/GlassCard';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { Star, GitCompare, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

const CompactCard = ({ card, selectable = false, selected = false, onSelect }) => {
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const inCompare = isInCompare(card.id);

    const handleCompareClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inCompare) {
            removeFromCompare(card.id);
        } else {
            addToCompare(card);
        }
    };

    // Determine card gradient based on network/bank
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

    // Selectable variant (for modal)
    if (selectable) {
        return (
            <div
                onClick={() => onSelect && onSelect(card)}
                className="cursor-pointer h-full"
            >
                <GlassCard
                    hoverEffect
                    className={`flex flex-col h-full group relative overflow-hidden transition-all ${selected
                            ? 'ring-2 ring-primary bg-primary/5 shadow-lg'
                            : 'hover:shadow-md'
                        }`}
                >
                    {/* Selection Checkmark */}
                    {selected && (
                        <div className="absolute top-3 right-3 z-20 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                        </div>
                    )}

                    {/* Gradient Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur transition duration-500 ${selected
                            ? 'from-primary/30 to-accent/30 opacity-100'
                            : 'from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100'
                        }`} />

                    {/* Card Image */}
                    <div className="relative z-10 mb-4">
                        <div className={`aspect-[1.586/1] rounded-xl bg-gradient-to-br ${getCardGradient()} shadow-lg relative overflow-hidden border border-white/20`}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                            <div className="absolute top-10 left-4 w-10 h-8 rounded bg-yellow-200/90 border border-yellow-400/50" />
                            <div className="absolute bottom-10 left-4 text-white font-mono tracking-wider text-sm drop-shadow-lg">
                                **** {card.id}234
                            </div>
                            <div className="absolute top-4 right-4 text-white font-bold text-sm drop-shadow-lg italic">
                                {card.network === 'American Express' ? 'AMEX' : card.network.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-text-main truncate mb-1">{card.name}</h3>
                                <p className="text-sm text-text-muted">{card.bank}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg ml-2">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-400" />
                                <span className="text-xs font-bold text-text-main">{card.rating}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                            {card.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="primary" className="text-xs px-2 py-0.5">{tag}</Badge>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Annual Fee</p>
                                <p className="text-text-main font-semibold text-sm">{card.annualFee}</p>
                            </div>
                            <div>
                                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Rewards</p>
                                <p className="text-accent font-semibold text-sm">{card.rewardRate}</p>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        );
    }

    // Original variant (with navigation and buttons)
    return (
        <Link to={`/cards/${card.id}`} className="block h-full">
            <GlassCard hoverEffect className="flex flex-col h-full group relative overflow-hidden cursor-pointer">
                {/* Gradient Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Card Image */}
                <div className="relative z-10 mb-4">
                    <div className={`aspect-[1.586/1] rounded-xl bg-gradient-to-br ${getCardGradient()} shadow-lg relative overflow-hidden border border-white/20`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                        <div className="absolute top-10 left-4 w-10 h-8 rounded bg-yellow-200/90 border border-yellow-400/50" />
                        <div className="absolute bottom-10 left-4 text-white font-mono tracking-wider text-sm drop-shadow-lg">
                            **** {card.id}234
                        </div>
                        <div className="absolute top-4 right-4 text-white font-bold text-sm drop-shadow-lg italic">
                            {card.network === 'American Express' ? 'AMEX' : card.network.toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-text-main truncate mb-1">{card.name}</h3>
                            <p className="text-sm text-text-muted">{card.bank}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg ml-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-400" />
                            <span className="text-xs font-bold text-text-main">{card.rating}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                        {card.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="primary" className="text-xs px-2 py-0.5">{tag}</Badge>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Annual Fee</p>
                            <p className="text-text-main font-semibold text-sm">{card.annualFee}</p>
                        </div>
                        <div>
                            <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Rewards</p>
                            <p className="text-accent font-semibold text-sm">{card.rewardRate}</p>
                        </div>
                    </div>

                    <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCompareClick}
                                variant={inCompare ? "success" : "outline"}
                                className="text-xs h-9 flex items-center gap-1 cursor-pointer"
                            >
                                {inCompare ? <Check className="w-3.5 h-3.5" /> : <GitCompare className="w-3.5 h-3.5" />}
                                <span>Compare</span>
                            </Button>
                            <Button className="flex-1 text-sm h-9">Apply</Button>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </Link>
    );
};

export default CompactCard;
