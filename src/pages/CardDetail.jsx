import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, Shield, Zap, Globe, CreditCard as CardIcon, GitCompare } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';
import { cards } from '../data/cards';
import SEO from '../components/SEO';
import { useCompare } from '../context/CompareContext';

const CardDetail = () => {
    const { id } = useParams();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const card = cards.find(c => c.id === parseInt(id));

    const getCardGradient = () => {
        if (!card) return 'from-purple-500 via-primary to-secondary';
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

    if (!card) {
        return (
            <div className="text-center py-20">
                <SEO title="Card Not Found" />
                <h2 className="text-2xl font-bold mb-4">Card not found</h2>
                <Link to="/cards">
                    <Button variant="outline">Back to Cards</Button>
                </Link>
            </div>
        );
    }

    const inCompare = isInCompare(card.id);

    const handleCompareClick = () => {
        if (inCompare) {
            removeFromCompare(card.id);
        } else {
            addToCompare(card);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            <SEO
                title={card.name}
                description={`${card.name} from ${card.bank}. ${card.description}`}
                keywords={[card.name, card.bank, ...card.tags]}
            />

            {/* Hero Section */}
            <div className={`relative pt-32 pb-20 overflow-hidden`}>
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient()} opacity-10`} />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/cards" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Browse
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Card Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className={`w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl bg-gradient-to-br ${getCardGradient()} shadow-2xl relative overflow-hidden border border-white/20 group transform hover:scale-105 transition-transform duration-500`}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                                <div className="absolute top-8 left-8 w-14 h-10 rounded bg-yellow-200/90 border border-yellow-400/50 flex items-center justify-center">
                                    <div className="w-8 h-6 border border-yellow-500/30 rounded-sm" />
                                </div>
                                <div className="absolute bottom-8 left-8 text-white font-mono text-xl tracking-widest drop-shadow-lg">**** **** **** 1234</div>
                                <div className="absolute top-8 right-8 text-white font-bold italic text-lg drop-shadow-lg">
                                    {card.network === 'American Express' ? 'AMEX' : card.network.toUpperCase()}
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <GlassCard className="absolute -bottom-10 -right-4 md:-right-10 p-6 max-w-xs hidden md:block animate-float">
                                <div className="flex items-center gap-3 mb-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-lg text-text-main">{card.rating}/5.0</span>
                                </div>
                                <p className="text-sm text-text-muted">Rated highly by travelers for its exceptional rewards program.</p>
                            </GlassCard>
                        </motion.div>

                        {/* Right: Header Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="outline" className="bg-surface/50 backdrop-blur-sm">{card.bank}</Badge>
                                {card.tags.map((tag, index) => (
                                    <Badge key={index} variant="primary">{tag}</Badge>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 leading-tight">{card.name}</h1>
                            <p className="text-xl text-text-muted mb-8 leading-relaxed">{card.description}</p>

                            <div className="flex flex-wrap gap-4">
                                <Button className="px-8 py-3 text-lg shadow-lg shadow-primary/20">
                                    Apply Now
                                </Button>
                                <Button
                                    variant={inCompare ? "success" : "outline"}
                                    onClick={handleCompareClick}
                                    className="px-6 py-3 text-lg gap-2 cursor-pointer"
                                >
                                    {inCompare ? <Check className="w-5 h-5" /> : <GitCompare className="w-5 h-5" />}
                                    {inCompare ? 'In Compare' : 'Add to Compare'}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar: Quick Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <GlassCard className="p-6 space-y-6 sticky top-24">
                            <h3 className="font-bold text-lg text-text-main border-b border-border pb-4">Card Details</h3>

                            <div className="space-y-1">
                                <p className="text-sm text-text-muted uppercase tracking-wider">Annual Fee</p>
                                <p className="text-2xl font-bold text-text-main">{card.annualFee}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-text-muted uppercase tracking-wider">Interest Rate</p>
                                <p className="text-lg font-semibold text-text-main">{card.interestRate}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-text-muted uppercase tracking-wider">Credit Score</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-3/4" />
                                    </div>
                                    <span className="font-semibold text-text-main">Excellent</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Sign-up Bonus</p>
                                <p className="text-sm font-semibold text-accent bg-accent/5 p-3 rounded-lg border border-accent/10">
                                    {card.signUpBonus}
                                </p>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Content: Features & Benefits */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Benefits */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-text-main">
                                <Zap className="text-primary w-6 h-6" /> Key Benefits
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {card.features.map((feature, index) => (
                                    <GlassCard key={index} className="p-4 flex items-start gap-3 hover:border-primary/30 transition-colors group">
                                        <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                            <Check className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-text-main font-medium">{feature}</span>
                                    </GlassCard>
                                ))}
                            </div>
                        </section>

                        {/* Security Section */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-text-main">
                                <Shield className="text-primary w-6 h-6" /> Security & Protection
                            </h2>
                            <GlassCard className="p-8 space-y-8">
                                <div className="flex gap-4">
                                    <div className="bg-blue-500/10 p-3 rounded-xl h-fit">
                                        <Shield className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-text-main">Zero Liability Protection</h3>
                                        <p className="text-text-muted leading-relaxed">
                                            Rest easy knowing you won't be held responsible for unauthorized charges made with your card or account information. We've got you covered 24/7.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-border" />
                                <div className="flex gap-4">
                                    <div className="bg-purple-500/10 p-3 rounded-xl h-fit">
                                        <Globe className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-text-main">24/7 Fraud Monitoring</h3>
                                        <p className="text-text-muted leading-relaxed">
                                            Our advanced security systems monitor your account for suspicious activity around the clock. We'll alert you immediately if we detect anything unusual.
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
