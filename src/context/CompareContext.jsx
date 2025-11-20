import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within CompareProvider');
    }
    return context;
};

export const CompareProvider = ({ children }) => {
    const [compareCards, setCompareCards] = useState(() => {
        // Initialize from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('kapicard-compare');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    return [];
                }
            }
        }
        return [];
    });

    // Sync to localStorage whenever compareCards changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('kapicard-compare', JSON.stringify(compareCards));
        }
    }, [compareCards]);

    const addToCompare = (card) => {
        if (compareCards.length >= 4) {
            alert('You can compare up to 4 cards at a time. Please remove a card first.');
            return false;
        }

        if (compareCards.find(c => c.id === card.id)) {
            alert('This card is already in your comparison list.');
            return false;
        }

        setCompareCards([...compareCards, card]);
        return true;
    };

    const removeFromCompare = (cardId) => {
        setCompareCards(compareCards.filter(c => c.id !== cardId));
    };

    const clearCompare = () => {
        setCompareCards([]);
    };

    const isInCompare = (cardId) => {
        return compareCards.some(c => c.id === cardId);
    };

    const value = {
        compareCards,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        compareCount: compareCards.length,
    };

    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    );
};

export default CompareContext;
