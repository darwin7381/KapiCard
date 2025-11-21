import GlassCard from './ui/GlassCard';
import Button from './ui/Button';
import Badge from './ui/Badge';
import CardVisual from './CardVisual';
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

    return (
        <Link to={`/cards/${card.id}`} className="block">
            <GlassCard hoverEffect className="flex flex-col md:flex-row gap-6 group relative overflow-hidden cursor-pointer">
                {/* Gradient Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Card Image Section */}
                <div className="relative w-full md:w-64 flex-shrink-0 z-10">
                    <CardVisual card={card} />
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
