import GlassCard from './ui/GlassCard';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { Check, Star, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

const CreditCard = ({ card }) => {
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const inCompare = isInCompare(card.id);

    const handleCompareClick = (e) => {
        e.preventDefault(); // Prevent Link navigation
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

    return (
        <Link to={`/cards/${card.id}`} className="block">
            <GlassCard hoverEffect className="flex flex-col md:flex-row gap-6 group relative overflow-hidden cursor-pointer">
                {/* Gradient Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Card Image Section */}
                <div className="relative w-full md:w-64 flex-shrink-0 z-10">
                    <div className={`aspect-[1.586/1] rounded-xl bg-gradient-to-br ${getCardGradient()} shadow-lg relative overflow-hidden border border-white/20`}>
                        {/* Card Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />

                        {/* Card Chip */}
                        <div className="absolute top-10 left-4 w-10 h-8 rounded bg-yellow-200/90 border border-yellow-400/50" />

                        {/* Card Number */}
                        <div className="absolute bottom-10 left-4 text-white font-mono tracking-wider text-sm drop-shadow-lg">
                            **** {card.id}234
                        </div>

                        {/* Card Network Logo */}
                        <div className="absolute top-4 right-4">
                            <div className="text-white font-bold text-sm drop-shadow-lg italic">
                                {card.network === 'American Express' ? 'AMEX' : card.network.toUpperCase()}
                            </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="absolute bottom-4 left-4 text-white/80 text-xs uppercase tracking-wider drop-shadow-lg">
                            {card.bank}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-1">{card.name}</h3>
                            <p className="text-text-muted text-sm">{card.bank}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                            <span className="text-sm font-bold text-text-main">{card.rating}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {card.tags.map((tag, index) => (
                            <Badge key={index} variant="primary">{tag}</Badge>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Annual Fee</p>
                            <p className="text-text-main font-semibold">{card.annualFee}</p>
                        </div>
                        <div>
                            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Reward Rate</p>
                            <p className="text-accent font-semibold">{card.rewardRate}</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        {card.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-text-main">
                                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                            onClick={handleCompareClick}
                            variant={inCompare ? "success" : "outline"}
                            className="flex items-center gap-1.5 cursor-pointer"
                        >
                            {inCompare ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
                            <span>Compare</span>
                        </Button>
                        <Button className="flex-1">Apply Now</Button>
                    </div>
                </div>
            </GlassCard>
        </Link>
    );
};

export default CreditCard;
