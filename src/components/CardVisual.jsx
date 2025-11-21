import React from 'react';

const CardVisual = ({ card, className = "" }) => {
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
        <div className={`aspect-[1.586/1] rounded-xl bg-gradient-to-br ${getCardGradient()} shadow-lg relative overflow-hidden border border-white/20 ${className}`}>
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
    );
};

export default CardVisual;
